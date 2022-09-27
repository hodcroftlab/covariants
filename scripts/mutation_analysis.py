import os
import requests
import json
from dotenv import load_dotenv, find_dotenv
from clusters import clusters

load_dotenv(find_dotenv())
LAPIS_API_ACCESS_KEY = os.environ.get("LAPIS_API_ACCESS_KEY")

THIS_DIR = os.path.dirname(os.path.realpath(__file__))
CASECOUNTS_CSV_FILENAME = "perCountryDataCaseCounts.json"
CASECOUNTS_CSV_PATH = os.path.join(THIS_DIR, "..", "web", "data", CASECOUNTS_CSV_FILENAME)

base_url = 'https://cov-spectrum.ethz.ch/gisaid/api/v1/sample/aa-mutations'
filter_deletions_url = "aaMutations=Orf1a:1.,N:420."

#only include mutations that are above this threshhold
THRESHOLD = 0.1

COUNTRIES = ["Switzerland", "Germany"]
CLUSTERS = [clus for clus in clusters if clusters[clus]["type"] == "variant" and clusters[clus]["graphing"]]
#CLUSTERS = ["22D", "22C"]$

def build_url(base_url,cluster,threshold):
    #TODO: is this the proper url? include filterdeletions?
    url = f"{base_url}?{filter_deletions_url}&accessKey={LAPIS_API_ACCESS_KEY}&nucMutations={','.join(cluster)}"
    if threshold is not None:
        url += f"&minProportion={threshold:f}"
    return url

#TODO: Probably not needed
def get_all_defining_mutations():

    mutations = set()

    for clus in CLUSTERS:
        defining_mutations = clusters[clus]["mutations"]["nonsynonymous"]
        for mut in defining_mutations:
            s = f"{mut['gene']}:{mut['left']}{mut['pos']}{mut['right']}"
            mutations.add(s)

    return mutations

# For each country and covariants cluster, query mutations and proportions from covSPECTRUM using SNPs
def get_mutation_proportions():
    mutation_proportions = {country: {clus: {} for clus in CLUSTERS} for country in COUNTRIES}

    for clus in CLUSTERS:

        print(f"\nQuery mutations from covSPECTRUm for cluster {clus}")

        if "snps_with_base" not in clusters[clus]:
            print(f"snps_with_base missing from {clus}")
            continue

        cluster_muts = clusters[clus]["snps_with_base"]
        defining_mutations = clusters[clus]["mutations"]["nonsynonymous"]
        defining_mutations_list = [f"{mut['gene']}:{mut['left']}{mut['pos']}{mut['right']}" for mut in
                                   defining_mutations]

        for country in COUNTRIES:
            # Query mutation information from covSPECTRUM
            # TODO: Does it make sense to query with snps? Wouldn't it make much more sense to query using Pango or something else?
            request_url = build_url(base_url, cluster_muts, THRESHOLD)
            request = requests.get(request_url)
            mutation_data = json.loads(request.content)["data"]

            for entry in mutation_data:
                mutation = entry["mutation"]
                proportion = entry['proportion']
                if mutation not in defining_mutations_list:
                    print(f"{mutation} missing from synonymous mutations (proportion {proportion}, country {country})")

                mutation_proportions[country][clus][mutation] = proportion

    return mutation_proportions

def get_mutation_distribution():
    mutation_distribution = {country: {} for country in COUNTRIES}

    with open(CASECOUNTS_CSV_PATH) as f:
        caseCountData = json.load(f)["regions"][0]["distributions"]

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

                    mutation_distribution[country][week][mut] += prop * float(
                        stand_estimated_cases[clus_display_name]) / 1000000.0  # Cases data comes in per million

    return mutation_distribution

def accumulate_mutations(mutation_distribution):

    mutation_distribution_accum = {country: {week: {} for week in mutation_distribution[country]} for country in mutation_distribution}

    for country in mutation_distribution:
        weeks = sorted(list(mutation_distribution[country].keys()))
        mutation_distribution_accum[country][weeks[0]] = mutation_distribution[country][weeks[0]]
        for i in range(1,len(weeks)):
            for mut in mutation_distribution[country][weeks[i]]:
                if mut not in mutation_distribution_accum[country][weeks[i-1]]:
                    mutation_distribution_accum[country][weeks[i]][mut] = mutation_distribution[country][weeks[i]][mut]
                else:
                    mutation_distribution_accum[country][weeks[i]][mut] = mutation_distribution_accum[country][weeks[i-1]][mut] + mutation_distribution[country][weeks[i]][mut]

    return mutation_distribution_accum



if __name__ == "__main__":

    mutation_proportions = get_mutation_proportions()

    mutation_distribution = get_mutation_distribution()

    mutation_distribution_accum = accumulate_mutations(mutation_distribution)


