import os
import requests
import json
from dotenv import load_dotenv, find_dotenv
from clusters import clusters
import datetime
import matplotlib.pyplot as plt
import numpy as np

load_dotenv(find_dotenv())
LAPIS_API_ACCESS_KEY = os.environ.get("LAPIS_API_ACCESS_KEY")

THIS_DIR = os.path.dirname(os.path.realpath(__file__))
CASECOUNTS_CSV_FILENAME = "perCountryDataCaseCounts.json"
CASECOUNTS_CSV_PATH = os.path.join(THIS_DIR, "..", "web", "data", CASECOUNTS_CSV_FILENAME)
OUTPUT_PATH = os.path.join(THIS_DIR, "..", "web", "data")

base_url = 'https://lapis.cov-spectrum.org/gisaid/v1/sample/aa-mutations'
filter_deletions_url = "aaMutations=Orf1a:1.,N:420."

#only include mutations that are above this threshhold
THRESHOLD = 0.1

#COUNTRIES = ["Portugal", "Denmark", "Sweden", "Germany", "United Kingdom", "USA", "South Africa"]
COUNTRIES = ["Denmark", "United Kingdom", "Portugal"]
CLUSTERS = [clus for clus in clusters if clusters[clus]["type"] == "variant" and clusters[clus]["graphing"]]
#CLUSTERS = ["22D", "22C"]$

def build_url(base_url,cladeToUse,varQueryName,country,threshold):
    #TODO: is this the proper url? include filterdeletions?
    url = f"{base_url}?{filter_deletions_url}&accessKey={LAPIS_API_ACCESS_KEY}&{cladeToUse}={varQueryName}&country={country}"
    if threshold is not None:
        url += f"&minProportion={threshold:f}"
    return url

def build_url_date(base_url,cladeToUse,varQueryName,country,threshold,dateFrom,dateTo):
    #TODO: is this the proper url? include filterdeletions?
    url = f"{base_url}?{filter_deletions_url}&accessKey={LAPIS_API_ACCESS_KEY}&{cladeToUse}={varQueryName}&country={country}&dateFrom={dateFrom}&dateTo={dateTo}"
    if threshold is not None:
        url += f"&minProportion={threshold:f}"
    return url

def get_all_weeks(caseCountData):
    weeks = {}
    for i in range(len(caseCountData)):
        country = caseCountData[i]["country"]
        if country not in COUNTRIES:
            continue
        weeks[country] = {}
        for j in caseCountData[i]["distribution"]:
            week = j["week"]
            for var in j["stand_estimated_cases"]:
                if j["stand_estimated_cases"][var] != 0:
                    if var not in weeks[country]:
                        weeks[country][var] = []
                    weeks[country][var].append(week)
    return weeks

# Returns a mutation as a dict with the individual parts labelled
def decodeMutation(mutation):
    gene_loc = mutation.split(":")
    ref = gene_loc[1][0]
    mut = gene_loc[1][-1]
    loc = gene_loc[1][1:-1]
    return {'gene': gene_loc[0], 'loc': loc, 'ref': ref, 'mut': mut}

# For each country and covariants cluster, query mutations and proportions from covSPECTRUM using SNPs
def get_mutation_proportions():
    mutation_proportions = {country: {clus: {} for clus in CLUSTERS} for country in COUNTRIES}

    for clus in CLUSTERS:

        cladeToUse = "nextstrainClade" if "nextstrain_clade" in clusters[clus] else "nextcladePangoLineage"

        if "pango_lineages" not in clusters[clus]:
            print(f"\nNeither nextstrainClade nor pango_lineages available in clusters.py for {clus}. Skipping this cluster...\n")
            continue

        if cladeToUse == "nextstrainClade":
            varQueryName = clusters[clus]["nextstrain_clade"]
        elif "pango_lineages" in clusters[clus]:
            varQueryName = clusters[clus]["pango_lineages"][0]["name"]
        else:
            varQueryName = "NA" #this should spark an invalid request result

        print(f"\nQuery mutations from covSPECTRUm for cluster {clus} ([{cladeToUse}] {varQueryName})")

        defining_mutations = clusters[clus]["mutations"]["nonsynonymous"]
        defining_mutations_list = [f"{mut['gene']}:{mut['left']}{mut['pos']}{mut['right']}" for mut in
                                   defining_mutations]

        for country in COUNTRIES:
            # Query mutation information from covSPECTRUM
            request_url = build_url(base_url, cladeToUse, varQueryName, country, THRESHOLD)
            request = requests.get(request_url)
            mutation_data = json.loads(request.content)["data"]

            if not mutation_data:
                print(f"Request not valid (country {country}, {cladeToUse} {varQueryName})")

            for entry in mutation_data:
                mutation = entry["mutation"]
                proportion = entry['proportion']
                dec_mut = decodeMutation(mutation)
                loc = int(dec_mut["loc"])

                if dec_mut["gene"] == "S":
                    #TODO perhaps add to put in two categories of storage, for RDB and NTD? (not critical, but useful later?)
                    if (loc >= 333 and loc <= 526) or (loc >=15 and loc <= 305): # RDB or NTD
                        mutation_proportions[country][clus][mutation] = proportion

    return mutation_proportions


def get_mutation_proportions_biweekly(weeks, interval = 1):
    mutation_proportions = {country: {clus: {week: {} for week in weeks[country][clusters[clus]["display_name"]]} for clus in CLUSTERS if clusters[clus]["display_name"] in weeks[country]} for country in COUNTRIES}

    for clus in CLUSTERS:

        cladeToUse = "nextstrainClade" if "nextstrain_clade" in clusters[clus] else "nextcladePangoLineage"

        if "pango_lineages" not in clusters[clus]:
            print(f"\nNeither nextstrainClade nor pango_lineages available in clusters.py for {clus}. Skipping this cluster...\n")
            continue

        if cladeToUse == "nextstrainClade":
            varQueryName = clusters[clus]["nextstrain_clade"]
        elif "pango_lineages" in clusters[clus]:
            varQueryName = clusters[clus]["pango_lineages"][0]["name"]
        else:
            varyQueryName = "NA" #this should spark an invalid request result

        print(f"\nQuery mutations from covSPECTRUm for cluster {clus} ([{cladeToUse}] {varQueryName})")

        for country in COUNTRIES:
            print("\n" + country)

            if clusters[clus]["display_name"] not in weeks[country]:
                continue

            weeks_to_do = weeks[country][clusters[clus]["display_name"]]

            for i in range(0, len(weeks_to_do), interval):
                week = weeks_to_do[i]
                if i+interval < len(weeks_to_do):
                    week_end = (datetime.datetime.strptime(weeks_to_do[i+interval], '%Y-%m-%d') - datetime.timedelta(days=1)).strftime('%Y-%m-%d')
                    subweeks = weeks_to_do[i:i+interval]
                else:
                    week_end = (datetime.datetime.strptime(weeks_to_do[-1], '%Y-%m-%d') + datetime.timedelta(days=13)).strftime('%Y-%m-%d')
                    subweeks = weeks_to_do[i:]
                print(f"{week}  -  {week_end}")
                request_url = build_url_date(base_url, cladeToUse, varQueryName, country, THRESHOLD, week, week_end)

                request = requests.get(request_url)
                mutation_data = json.loads(request.content)["data"]

                if not mutation_data:
                    print(f"Request not valid (country {country}, {cladeToUse} {varQueryName})")

                for entry in mutation_data:
                    mutation = entry["mutation"]
                    proportion = entry['proportion']
                    dec_mut = decodeMutation(mutation)
                    loc = int(dec_mut["loc"])

                    if dec_mut["gene"] == "S":
                        # TODO perhaps add to put in two categories of storage, for RDB and NTD? (not critical, but useful later?)
                        if (loc >= 333 and loc <= 526) or (loc >= 15 and loc <= 305):  # RDB or NTD
                            for subweek in subweeks:
                                mutation_proportions[country][clus][subweek][mutation] = proportion

            # TODO: Plot this! I want to know how this develops over time
            #print(mutation_proportions)

    return mutation_proportions


# Multiply case count data with mutation proportions to get estimated mutation coverage per country
def get_mutation_distribution(mutation_proportions, caseCountData):
    mutation_distribution = {country: {} for country in COUNTRIES}

    for i in range(len(caseCountData)):
        country = caseCountData[i]["country"]
        if country not in COUNTRIES:
            continue

        for j in caseCountData[i]["distribution"]:
            stand_estimated_cases = j["stand_estimated_cases"]
            week = j["week"]

            mutation_distribution[country][week] = {}

            for clus in mutation_proportions[country]:
                clus_display_name = clusters[clus]["display_name"]
                if clus_display_name not in stand_estimated_cases:
                    #print(f"{clus_display_name} missing from perCountryData.")
                    continue
                for mut, prop in mutation_proportions[country][clus].items():
                    if mut not in mutation_distribution[country][week]:
                        mutation_distribution[country][week][mut] = 0

                    mutation_distribution[country][week][mut] += prop * float(stand_estimated_cases[clus_display_name]) / 1000000.0  # Cases data comes in per million

    return mutation_distribution


# Multiply case count data with mutation proportions to get estimated mutation coverage per country
def get_mutation_distribution_biweekly(mutation_proportions, caseCountData):
    mutation_distribution = {country: {} for country in COUNTRIES}

    for i in range(len(caseCountData)):
        country = caseCountData[i]["country"]
        if country not in COUNTRIES:
            continue

        for j in caseCountData[i]["distribution"]:
            stand_estimated_cases = j["stand_estimated_cases"]
            week = j["week"]

            mutation_distribution[country][week] = {}

            for clus in mutation_proportions[country]:
                clus_display_name = clusters[clus]["display_name"]
                if clus_display_name not in stand_estimated_cases:
                    #print(f"{clus_display_name} missing from perCountryData.")
                    continue

                if week not in mutation_proportions[country][clus]:
                    continue

                for mut, prop in mutation_proportions[country][clus][week].items():
                    if mut not in mutation_distribution[country][week]:
                        mutation_distribution[country][week][mut] = 0

                    mutation_distribution[country][week][mut] += prop * float(
                        stand_estimated_cases[clus_display_name]) / 1000000.0  # Cases data comes in per million

    return mutation_distribution


# Accumulate bi-weekly mutation percentages
def accumulate_mutations(mutation_distribution):

    mutation_distribution_accum = {country: {week: {} for week in mutation_distribution[country]} for country in mutation_distribution}

    for country in mutation_distribution:
        if not mutation_distribution[country]:
            continue

        weeks = sorted(list(mutation_distribution[country].keys()))

        mutations = set([m for week in weeks for m in list(mutation_distribution[country][week].keys())])

        for mut in mutations:
            if mut in mutation_distribution[country][weeks[0]]:
                mutation_distribution_accum[country][weeks[0]][mut] = mutation_distribution[country][weeks[0]][mut]
            else:
                mutation_distribution_accum[country][weeks[0]][mut] = 0.0

        for i in range(0, len(weeks)-1):
            for mut in mutations:
                if mut not in mutation_distribution[country][weeks[i + 1]]:
                    mutation_distribution_accum[country][weeks[i + 1]][mut] = mutation_distribution_accum[country][weeks[i]][mut]
                else:
                    mutation_distribution_accum[country][weeks[i + 1]][mut] = mutation_distribution_accum[country][weeks[i]][mut] + mutation_distribution[country][weeks[i + 1]][mut]

    return mutation_distribution_accum

#TODO: Is it necessary to do this by brute force? Could we not get this from further above? Also, cutoff and order?
# Get a list of all mutations
def get_mutation_list(data):
    mutation_names = set()
    for country in data:
        for week in data[country]:
            for mut in data[country][week]:
                mutation_names.add(mut)
    return list(mutation_names)

# Put data into json-friendly format
def to_json(data, mutation_names, caseCountData, invert = False):
    per_country_intro_content = caseCountData["regions"][0]["per_country_intro_content"]
    max_date = caseCountData["regions"][0]["max_date"]
    min_date = caseCountData["regions"][0]["min_date"]

    distributions = []
    i = 0
    for country in data:
        if not invert:
            distributions.append({"country": country, "distribution": []})
        else:
            distributions.append({"mutation": country, "distribution": []})
        for week in data[country]:
            distributions[i]["distribution"].append({"week": week, "mutation_percentages": data[country][week]})
        i += 1

    output_data = {"regions": [{"region": "World", "distributions": distributions,
                  "per_country_intro_content": per_country_intro_content, "max_date": max_date, "min_date": min_date,
                  "mutation_names":  mutation_names}]}

    return output_data

# Inverted: Sort per mutation instead of per country
def to_json_invert(data, mutation_names, caseCountData):

    data_invert = {}
    for country in data:
        for week in data[country]:
            for mut in data[country][week]:
                if mut not in data_invert:
                    data_invert[mut] = {}
                if week not in data_invert[mut]:
                    data_invert[mut][week] = {}
                data_invert[mut][week][country] = data[country][week][mut]

    output_data = to_json(data_invert, mutation_names, caseCountData, invert = True)

    return output_data

def plot(mutation_distribution_accum):
    if not os.path.exists("plots"):
        os.makedirs("plots")

    dates = []
    data = {}
    for country in mutation_distribution_accum:
        for week in mutation_distribution_accum[country]:
            if week not in dates:
                dates.append(week)
            for mut in mutation_distribution_accum[country][week]:
                if mut not in data:
                    data[mut] = {}
                if country not in data[mut]:
                    data[mut][country] = []
    dates=sorted(dates)
    for mut in data:
        for week in dates:
            for country in data[mut]:
                if week not in mutation_distribution_accum[country] or mut not in mutation_distribution_accum[country][week]:
                    data[mut][country].append(0.0)
                else:
                    data[mut][country].append(mutation_distribution_accum[country][week][mut])

    for mut in data:
        fig, ax = plt.subplots()
        for country in data[mut]:
            ax.plot(dates, data[mut][country])

        ax.set(xlabel='weeks', ylabel="percentage of population", title=mut)
        ax.legend(list(data[mut]))
        ax.set_ylim(0.0, 1.0)
        ax.set_xticks(np.arange(0, len(dates) + 1, 10))
        plt.xticks(rotation=45, ha="right")

        fig.savefig(f"plots/{mut}.png")
        #ax.close()

def plot_mutation_proportions(mutation_proportions):
    if not os.path.exists("plots/mutation_proportions"):
        os.makedirs("plots/mutation_proportions")


    dates = []
    clus_muts = []
    for country in mutation_proportions:
        for clus in mutation_proportions[country]:
            for week in mutation_proportions[country][clus]:
                if week not in dates:
                    dates.append(week)
                for mut, prop in mutation_proportions[country][clus][week].items():
                    clus_mut = (clus,mut)
                    if clus_mut not in clus_muts:
                        clus_muts.append(clus_mut)

    dates = sorted(dates)

    data = {}
    for (clus, mut) in clus_muts:
        clus_mut = f"{mut} ({clus})"
        if clus_mut not in data:
            data[clus_mut] = {}
        for country in mutation_proportions:
            if country not in data[clus_mut]:
                data[clus_mut][country] = []
            if clus not in mutation_proportions[country]:
                continue
            for week in dates:
                if week not in mutation_proportions[country][clus] or mut not in mutation_proportions[country][clus][week]:
                    data[clus_mut][country].append(0.0)
                else:
                    data[clus_mut][country].append(mutation_proportions[country][clus][week][mut])

    for mut in data:
        fig, ax = plt.subplots()
        for country in data[mut]:
            if data[mut][country]:
                ax.plot(dates, data[mut][country])

        ax.set(xlabel='weeks', ylabel="percentage", title=mut)
        ax.legend(list(data[mut]))
        ax.set_ylim(0.0, 1.0)
        ax.set_xticks(np.arange(0, len(dates) + 1, 10))
        plt.xticks(rotation=45, ha="right")

        fig.savefig(f"plots/mutation_proportions/{mut}.png")



if __name__ == "__main__":

    with open(CASECOUNTS_CSV_PATH) as f:
        caseCountData = json.load(f)

    weeks = get_all_weeks(caseCountData["regions"][0]["distributions"])

    biweekly = True

    if biweekly:
        mutation_proportions = get_mutation_proportions_biweekly(weeks, 5)
        #plot_mutation_proportions(mutation_proportions)
        mutation_distribution = get_mutation_distribution_biweekly(mutation_proportions,
                                                                   caseCountData["regions"][0]["distributions"])
    else:
        mutation_proportions = get_mutation_proportions()
        mutation_distribution = get_mutation_distribution(mutation_proportions, caseCountData["regions"][0]["distributions"])


    mutation_names = get_mutation_list(mutation_distribution)

    #TODO: How to include reinfections and undercounting
    #TODO: Which mutations to use in which order?

    mutation_distribution_accum = accumulate_mutations(mutation_distribution)

    json_format = to_json(mutation_distribution_accum, mutation_names, caseCountData)
    json_format_invert = to_json_invert(mutation_distribution_accum, mutation_names, caseCountData)

    with open(os.path.join(OUTPUT_PATH, "perCountryMutationAnalysis.json"), "w") as out:
        json.dump(json_format, out, indent=2, sort_keys=True)

    with open(os.path.join(OUTPUT_PATH, "perMutationAnalysis.json"), "w") as out:
        json.dump(json_format_invert, out, indent=2, sort_keys=True)

    plot(mutation_distribution_accum)

