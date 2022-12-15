#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Converts Covariants v1 data to Covariants v2 data
"""
import json
from collections import defaultdict
from os import makedirs
from os.path import abspath, dirname, join
from typing import Dict, List

THIS_DIR = abspath(dirname(__file__))
PROJECT_ROOT = abspath(dirname(THIS_DIR))
IN_DIR = join(PROJECT_ROOT, "web/data")
OUT_DIR = join(PROJECT_ROOT, "web/data/v2")


def mkdir(dirpath):
    makedirs(dirpath, exist_ok=True)


def json_read(filepath: str):
    with open(filepath, "r") as f:
        return json.load(f)


def json_write(obj: dict, filepath: str):
    mkdir(dirname(filepath))
    with open(filepath, "w") as f:
        return json.dump(obj, f, indent=2)


def json_stringify(obj: dict):
    return json.dumps(obj, indent=2, default=lambda o: o.__dict__)


def json_print(obj: dict):
    print(json_stringify(obj))


def find_continent(world_continent_map: Dict[str, List], country: str):
    """ Find continent name given a country """
    for continent, countries in world_continent_map.items():
        if country in countries:
            return continent
    raise ValueError(f"Continent not found for country '{country}' in 'region_country.json'")


def get_geography_json():
    per_country = json_read(join(IN_DIR, "perCountryData.json"))
    world_continent_map = json_read(join(IN_DIR, "region_country.json"))

    regions = defaultdict()
    for region in per_country["regions"]:
        region_name = region["region"]
        countries = [distribution["country"] for distribution in region["distributions"]]

        continents = defaultdict(list)
        if region_name == "World":
            # Partition world countries into continents
            for country in countries:
                continent = find_continent(world_continent_map, country)
                continents[continent].append(country)
        else:
            # Let's imagine regions "US" and "Switzerland" have 1 pseudo-continent, of the same name as region
            continents = {region_name: countries}

        regions.update({region_name: continents})

    geography = {
        "regions": regions
    }

    json_print(geography)
    json_write(geography, join(OUT_DIR, "geography.json"))


if __name__ == '__main__':
    get_geography_json()
