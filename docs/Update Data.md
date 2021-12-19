# Update Data

Web application uses data from JSON files in `web/data/`.

These files are automatically generated using [`scripts/convert_to_web_app_json.py`](/scripts/convert_to_web_app_json.py) conversion script. This script aggregates and converts various intermediate data files in `cluster_tables/`, and, based on that, produces files in `web/data/` (overwriting them).

In turn, files in `cluster_tables/` are generated (incrementally) using the remaining scripts in the [`scripts/`](/scripts) directory. See data curator guide for more details.

In order to modify the data in the web application, one should modify and run the necessary scripts and then the conversion script. The produced files will then be available to the web application.

See also:

 - the data I/O and transformation functions of the web application are aggregated in `web/src/io`
