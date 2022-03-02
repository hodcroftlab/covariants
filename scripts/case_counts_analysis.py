import os
import pandas as pd
import json
import datetime

THIS_DIR = os.path.dirname(os.path.realpath(__file__))

CASECOUNTS_CSV_FILENAME = "perCountryDataCaseCounts.json"
CASECOUNTS_CSV_PATH = os.path.join(THIS_DIR, "..", "web", "data", CASECOUNTS_CSV_FILENAME)

threshold = float(input("Threshold in %: "))/100
period_pass = float(input("Period-pass in %: "))/100


with open(CASECOUNTS_CSV_PATH) as f:
    caseCountData = json.load(f)["regions"][0]["distributions"]

weeks = []
countries = []

# First collect all weeks and countries
for i in range(len(caseCountData)):
    country = caseCountData[i]["country"]
    countries.append(country)
    for j in caseCountData[i]["distribution"]:
        week = j["week"]
        if "2020" in week: continue # Ignore 2020
        if week not in weeks:
            weeks.append(week)

df = pd.DataFrame(columns=sorted(weeks), index=sorted(countries))

for i in range(len(caseCountData)):
    country = caseCountData[i]["country"]
    for j in caseCountData[i]["distribution"]:
        week = j["week"]
        if "2020" in week: continue  # Ignore 2020
        percent_total_cases = j["percent_total_cases"]
        df[week][country]= percent_total_cases

total_weeks = len(weeks)

print("\nAt threshold " + str(threshold*100) + "% (sorted):")
df_threshold = (df>=threshold).sum(axis=1)
p = False
for country, row in df_threshold.sort_values(ascending=False).iteritems():
    perc = row/float(total_weeks)
    if perc < period_pass and not p:
        print("-----------------------------------------------")
        p = True
    t = ""
    if len(country) < 7:
        t = "\t"
    print(country + ":\t" + t + "Pass for " + str(row) + "/" + str(total_weeks) + " 2-week-periods (" + str(round(perc*100, 2)) + "%)" )

print("\nAt " + str(threshold*100) + "% and " + str(period_pass*100) + "% period-pass threshold, the following countries would plot:")
df_period_pass = df_threshold[(df_threshold/float(total_weeks)) >= period_pass]
for i in df_period_pass.index:
    print(i)

