import json

import polars as pl
from polars.testing import assert_frame_equal

from scripts.gen_region_country_mapping import reformat_region_country_mapping, extract_region_country_mapping


def test_extract_region_country():
    region_country = extract_region_country_mapping('tests/data/metadata.csv')
    expected_region_country = pl.DataFrame({"region": ['Asia', 'Oceania'], "country": [['Afghanistan', 'Cambodia', 'Japan'], ['Australia']]})

    assert_frame_equal(region_country, expected_region_country)


def test_reformat_region_country():
    df = pl.read_json('tests/data/raw_region_country.json')
    region_country = reformat_region_country_mapping(df)
    with open('tests/data/region_country.json') as file:
        expected_region_country = json.load(file)

    assert expected_region_country == region_country