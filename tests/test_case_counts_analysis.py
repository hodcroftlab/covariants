from scripts.case_counts_analysis import main

CASE_COUNTS_CSV_PATH = 'tests/data/case_counts_analysis/perCountryDataCaseCounts.json'

def test_case_counts():
    threshold = 0
    period_pass = 0

    main(threshold, period_pass, CASE_COUNTS_CSV_PATH)