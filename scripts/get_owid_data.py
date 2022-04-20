import os
from datetime import datetime, timedelta
from urllib.request import urlretrieve

import pandas as pd

# Directory where this script resides
THIS_DIR = os.path.dirname(os.path.realpath(__file__))

OWID_CSV_FILENAME = "owid-covid-data.csv"
OWID_CSV_INPUT_URL = f"https://covid.ourworldindata.org/data/{OWID_CSV_FILENAME}"
OWID_CSV_OUTPUT_PATH = os.path.join(THIS_DIR, "..", "data", "owid", OWID_CSV_FILENAME)


def download_owid_data():
    os.makedirs(os.path.dirname(OWID_CSV_OUTPUT_PATH), exist_ok=True)
    urlretrieve(OWID_CSV_INPUT_URL, OWID_CSV_OUTPUT_PATH)
    return OWID_CSV_OUTPUT_PATH


def get_owid_dataframe():
    return pd.read_csv(OWID_CSV_OUTPUT_PATH)


def get_yesterday():
    yesterday = datetime.now() - timedelta(days=1)
    return yesterday.strftime('%Y-%m-%d')

def get_most_recent(all_data):
    most_recent = max(pd.to_datetime(all_data["date"]))
    return most_recent.strftime('%Y-%m-%d')

if __name__ == '__main__':
    download_owid_data()
    df = pd.read_csv(OWID_CSV_OUTPUT_PATH)

    # Description of columns:
    # https://github.com/owid/covid-19-data/blob/master/public/data/README.md
    all_data = df[["iso_code", "date", "location", "total_cases_per_million"]]

    # Drop rows starting with "OWID_". They are not for countries.
    where_iso_code_is_not_a_country = df['iso_code'].str.startswith("OWID_")
    all_data = all_data[~where_iso_code_is_not_a_country]

    # Get data for yesterday, for example
    where_date_is_yesterday = all_data["date"] == get_yesterday()
    yesterday_data = all_data.loc[where_date_is_yesterday]

    #if not possible, get most recent date, and report it
    if yesterday_data.empty:
        where_date_most_recent = all_data["date"] == get_most_recent(all_data)
        yesterday_data = all_data.loc[where_date_most_recent]
        print(f"Data is from the date {yesterday_data}")

    if yesterday_data.empty:
        print('***ERROR*** Case data was NOT retrieved from OWID! Or another error occurred (what time is it CET?)')

    with pd.option_context('display.max_rows', None):
        print(yesterday_data)
