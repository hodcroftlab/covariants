import os
import pandas as pd
import json
import datetime
import sys
from helpers import to2week_ordinal, to2week_ordinal_string

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


THIS_DIR = os.path.dirname(os.path.realpath(__file__))

OWID_CSV_FILENAME = "owid-covid-data.csv"
OWID_CSV_INPUT_PATH = os.path.join(THIS_DIR, "..", "data", "owid", OWID_CSV_FILENAME)

COUNTRY_CSV_FILENAME = "perCountryData.json"
COUNTRY_CSV_INPUT_PATH = os.path.join(THIS_DIR, "..", "web", "public", "data", COUNTRY_CSV_FILENAME)

OUTPUT_CSV_FILENAME = "perCountryDataCaseCounts.json"
OUTPUT_CSV_PATH = os.path.join(THIS_DIR, "..", "web", "public", "data", OUTPUT_CSV_FILENAME)

# the case_counts_analysis.py file can be used to explore different thresholds!
# But need to generate a very broad file first! As that script uses the output of `perCountryDataCaseCounts.json`
THRESHOLD = 0.02 #0.03 is 3%
PERIOD_PASS = 0.4 #0.5 is 50%

columns = ["continent", "location", "date", "new_cases", "new_cases_per_million"]
owid = pd.read_csv(OWID_CSV_INPUT_PATH, usecols=columns)

owid["date_formatted"] = owid["date"].apply(lambda x: datetime.datetime.strptime(x, "%Y-%m-%d"))
# get ordinal dates, but as a string, so can compare to dates in perCOuntryData.json
owid["date_2weeks"] = owid["date_formatted"].apply(to2week_ordinal_string)

owid_grouped = owid.groupby(["date_2weeks", "location"])[["new_cases_per_million", "new_cases"]].sum().reset_index()

with open(COUNTRY_CSV_INPUT_PATH) as f:
    perCountryData = json.load(f)

world_data = perCountryData["regions"][0]["distributions"]
per_country_intro_content = perCountryData["regions"][0]["per_country_intro_content"]
max_date = perCountryData["regions"][0]["max_date"]
min_date = perCountryData["regions"][0]["min_date"]
cluster_names = perCountryData["regions"][0]["cluster_names"]

world_data_counts = []

for i in range(len(world_data)):
    country = world_data[i]["country"]
    if country not in owid_grouped["location"].values and country not in alernative_country_names:
        print("Attention! Country not found in owid data: " + country)
        continue

    country_owid = country
    if country in alernative_country_names:
        country_owid = alernative_country_names[country]

    world_data_counts.append({"country": country, "distribution": []})
    for j in world_data[i]["distribution"]:
        cluster_counts = j["cluster_counts"]
        total_sequences = j["total_sequences"]
        week = j["week"]

        percent_counts = {c : float(n) / total_sequences for c, n in cluster_counts.items()}

        stand_total_cases = owid_grouped.loc[(owid_grouped.date_2weeks == week) & (owid_grouped.location == country_owid)]["new_cases_per_million"]
        total_cases = owid_grouped.loc[(owid_grouped.date_2weeks == week) & (owid_grouped.location == country_owid)]["new_cases"]

        if len(stand_total_cases) > 0:
            stand_total_cases = int(stand_total_cases.iloc[0])
        else:  # No count data
            continue  # Skip if no count data

        if len(total_cases) > 0:
            total_cases = int(total_cases.iloc[0])
        else:  # No count data
            continue  # Skip if no count data

        stand_estimated_cases = {c: round(float(n) * stand_total_cases) for c, n in percent_counts.items()}
        stand_estimated_cases["others"] = stand_total_cases - sum(stand_estimated_cases.values())
        percent_total_cases = total_sequences / total_cases if total_cases != 0 else None

        world_data_counts[-1]["distribution"].append({"week": week, "total_sequences": total_sequences, "stand_total_cases" : stand_total_cases, "stand_estimated_cases" : stand_estimated_cases, "percent_total_cases" : percent_total_cases})


### Check which countries pass the threshold
weeks = []
countries = []
# First collect all weeks and countries
for i in range(len(world_data_counts)):
    country = world_data_counts[i]["country"]
    countries.append(country)
    for j in world_data_counts[i]["distribution"]:
        week = j["week"]
        if week not in weeks and "2020" not in week:
            weeks.append(week)

df = pd.DataFrame(columns=sorted(weeks), index=sorted(countries))

for i in range(len(world_data_counts)):
    country = world_data_counts[i]["country"]
    for j in world_data_counts[i]["distribution"]:
        week = j["week"]
        if week in weeks:
            percent_total_cases = j["percent_total_cases"]
            df[week][country]= percent_total_cases

total_weeks = len(weeks)
df_threshold = (df>=THRESHOLD).sum(axis=1)
countries_pass = df_threshold[(df_threshold/float(total_weeks)) >= PERIOD_PASS].index

world_data_counts_cutoff = [x for x in world_data_counts if x["country"] in countries_pass]

print(f"{len(world_data_counts_cutoff)}/{len(world_data_counts)} countries have passed threshold {THRESHOLD} and period_pass {PERIOD_PASS}")

if len(world_data_counts_cutoff) == 0:
    with open(OUTPUT_CSV_PATH, "w") as out:
        out.write("")
    sys.exit("**FAILED TO FIND ANY COUNTRIES THAT PASS THRESHOLD - CHECK FOR ERRORS!**")
    

with open(OUTPUT_CSV_PATH, "w") as out:
    json.dump({"regions": [{"region": "World", "distributions" : world_data_counts_cutoff, "per_country_intro_content": per_country_intro_content, "max_date": max_date, "min_date": min_date, "cluster_names": cluster_names}]}, out, indent=2, sort_keys=True)
