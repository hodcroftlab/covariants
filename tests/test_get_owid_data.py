from scripts.get_owid_data import check_owid_data

OWID_CSV_OUTPUT_PATH = 'tests/data/get_owid_data/owid-covid-data.csv'

def test_check_owid_data():
    check_owid_data(OWID_CSV_OUTPUT_PATH)