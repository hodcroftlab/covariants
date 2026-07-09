import os
import pandas as pd
import json

THIS_DIR = os.path.dirname(os.path.realpath(__file__))

CASE_COUNTS_CSV_FILENAME = "perCountryDataCaseCounts.json"
CASE_COUNTS_CSV_PATH = os.path.join(THIS_DIR, "..", "web", "public", "data", CASE_COUNTS_CSV_FILENAME)


def main(threshold, period_pass, case_counts_csv_path):
    with open(case_counts_csv_path) as f:
        case_count_data = json.load(f)["regions"][0]["distributions"]
    weeks = []
    countries = []
    # First collect all weeks and countries
    for i in range(len(case_count_data)):
        country = case_count_data[i]["country"]
        countries.append(country)
        for j in case_count_data[i]["distribution"]:
            week = j["week"]
            if "2020" in week: continue  # Ignore 2020
            if week not in weeks:
                weeks.append(week)
    df = pd.DataFrame(columns=sorted(weeks), index=sorted(countries))
    for i in range(len(case_count_data)):
        country = case_count_data[i]["country"]
        for j in case_count_data[i]["distribution"]:
            week = j["week"]
            if "2020" in week: continue  # Ignore 2020
            percent_total_cases = j["percent_total_cases"]
            df[week][country] = percent_total_cases
    total_weeks = len(weeks)
    print("\nAt threshold " + str(threshold * 100) + "% (sorted):")
    df_threshold = (df >= threshold).sum(axis=1)
    p = False
    for country, row in df_threshold.sort_values(ascending=False).iteritems():
        perc = row / float(total_weeks)
        if perc < period_pass and not p:
            print("-----------------------------------------------")
            p = True
        t = ""
        if len(country) < 7:
            t = "\t"
        print(country + ":\t" + t + "Pass for " + str(row) + "/" + str(total_weeks) + " 2-week-periods (" + str(
            round(perc * 100, 2)) + "%)")
    print("\nAt " + str(threshold * 100) + "% and " + str(
        period_pass * 100) + "% period-pass threshold, the following countries would plot:")
    df_period_pass = df_threshold[(df_threshold / float(total_weeks)) >= period_pass]
    for i in df_period_pass.index:
        print(i)


if __name__ == '__main__':
    threshold_from_user = float(input("Threshold in %: ")) / 100
    period_pass_from_user = float(input("Period-pass in %: ")) / 100

    main(threshold_from_user, period_pass_from_user, CASE_COUNTS_CSV_PATH)
