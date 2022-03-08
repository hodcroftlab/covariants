import os
import pandas as pd
import json
import datetime

# key: country names in covariants
# value: country name in owid
alernative_country_names = {
    "USA" : "United States",
    "Czech Republic"  : "Czechia",
    "Côte d'Ivoire": "Cote d'Ivoire",
    "Democratic Republic of the Congo": "Democratic Republic of Congo",
    "Sint Maarten": "Sint Maarten (Dutch part)",

    # Are these correct?
    "Bonaire" : "Bonaire Sint Eustatius and Saba",
    "Republic of the Congo" : "Congo"
}

def to2week(x):
    iso_y, iso_w, iso_d = x.isocalendar()[:3]
    if iso_w==1:
        prev_week = x - datetime.timedelta(days=7)
        iso_y, iso_w, iso_d = prev_week.isocalendar()[:3]

    return datetime.datetime.strptime("{}-W{}-1".format(*(iso_y, iso_w // 2 * 2)), "%G-W%V-%u")

THIS_DIR = os.path.dirname(os.path.realpath(__file__))

OWID_CSV_FILENAME = "owid-covid-data.csv"
OWID_CSV_INPUT_PATH = os.path.join(THIS_DIR, "..", "data", "owid", OWID_CSV_FILENAME)

COUNTRY_CSV_FILENAME = "perCountryData.json"
COUNTRY_CSV_INPUT_PATH = os.path.join(THIS_DIR, "..", "web", "data", COUNTRY_CSV_FILENAME)

OUTPUT_CSV_FILENAME = "perCountryDataCaseCounts.json"
OUTPUT_CSV_PATH = os.path.join(THIS_DIR, "..", "web", "data", OUTPUT_CSV_FILENAME)

columns = ["continent", "location", "date", "total_cases", "new_cases"]
owid = pd.read_csv(OWID_CSV_INPUT_PATH, usecols=columns)

owid["date_formatted"] = owid["date"].apply(lambda x: datetime.datetime.strptime(x, "%Y-%m-%d"))
owid["date_2weeks"] = owid["date_formatted"].apply(to2week)

owid_grouped = owid.groupby(["date_2weeks", "location"])["new_cases"].sum().reset_index()

with open(COUNTRY_CSV_INPUT_PATH) as f:
    perCountryData = json.load(f)

world_data = perCountryData["regions"][0]["distributions"]

world_data_counts = []

for i in range(len(world_data)):
    country = world_data[i]["country"]
    if country not in owid_grouped["location"].values and country not in alernative_country_names:
        print("Attention! Country not found in owid data: " + country)

    world_data_counts.append({"country": country, "distribution": []})
    for j in world_data[i]["distribution"]:
        cluster_counts = j["cluster_counts"]
        total_sequences = j["total_sequences"]
        week = j["week"]

        percent_counts = {c : float(n) / total_sequences for c, n in cluster_counts.items()}

        country_i = country
        if country in alernative_country_names:
            country_i = alernative_country_names[country]

        total_cases = owid_grouped.loc[(owid_grouped.date_2weeks == week) & (owid_grouped.location == country_i)]["new_cases"]

        if len(total_cases) > 0:
            total_cases = int(total_cases.iloc[0])
        else:
            total_cases = 0
        estimated_cases = {c: round(float(n) * total_cases) for c, n in percent_counts.items()}
        percent_total_cases = total_sequences / total_cases if total_cases != 0 else None

        world_data_counts[i]["distribution"].append({"week": week, "percent_counts": percent_counts, "total_sequences": total_sequences, "total_cases" : total_cases, "estimated_cases" : estimated_cases, "percent_total_cases" : percent_total_cases})


with open(OUTPUT_CSV_PATH, "w") as out:
    json.dump({"regions": [{"region": "World", "distributions" : world_data_counts}]}, out, indent=2, sort_keys=True)
    # Which of the following to add?
    # cluster_names
    # distributions
    # max_date
    # min_date
    # per_country_intro_content
    # region
