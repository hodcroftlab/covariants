import numpy as np
import glob, os


countries = ['Spain', 'France', 'Belgium', 'United Kingdom', 'Switzerland', 'Netherlands', 'Norway',
              'Ireland', 'Bosnia', 'Serbia', 'Macedonia', 'Germany', 'Portugal', 'Denmark']

case_file_list = glob.glob('../../covid19_scenarios/data/case-counts/ecdc/*tsv')

for c in countries:
    for fname in case_file_list:
        if c in fname:
            os.system(f"cp '{fname}' country_case_data")

