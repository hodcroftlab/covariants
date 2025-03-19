import json
import polars as pl

METADATA_FILE_PATH = 'data/metadata.tsv.gz'
OUTPUT_FILE_PATH = '../web/public/data/region_country.json'

def extract_region_country_mapping(filepath):
    q = (
        pl.scan_csv(filepath, separator='\t')
        .select(pl.col('region'), pl.col('country'))
        .sort('region')
        .group_by('region')
        .agg(pl.col('country').unique().sort())
    )

    return q.collect()

def reformat_region_country_mapping(df: pl.DataFrame) -> dict:
    df_as_dicts = df.to_dicts()
    processed = {}
    for region_dict in df_as_dicts:
        processed.update({ region_dict['region']: region_dict['country'] })
    return processed


if __name__ == "__main__":
    raw_region_country = extract_region_country_mapping(METADATA_FILE_PATH)
    region_country = reformat_region_country_mapping(raw_region_country)

    with open(OUTPUT_FILE_PATH, 'w') as file:
        json.dump(region_country, file)
