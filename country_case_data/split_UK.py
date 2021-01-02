import pandas as pd
from collections import defaultdict
from datetime import datetime
import numpy as np

d = pd.read_csv('UK_case_data.csv', skiprows=1)
nations = ["England", "Scotland", "Wales", "Northern Ireland"]
data = {k: defaultdict(int) for k in nations}

for ri, row in d.iterrows():
    if row.areaType=='nation':
        data[row.areaName][datetime.strptime(row.loc["date"], "%Y-%m-%d").strftime("%Y-%m-%d")] += row.loc["newCasesBySpecimenDate"]

for nation in nations:
    sorted_data = sorted(data[nation].items())
    cum_dates = [x[0] for x in sorted_data]
    cum_cases = np.cumsum([x[1] for x in sorted_data])

    with open(f'{nation}.tsv', 'w') as fh:
        fh.write('#produced by split_UK.py\n')
        fh.write('#\n')
        fh.write('#\n')
        fh.write('time\tcases\n')
        for t, c in zip(cum_dates, cum_cases):
            fh.write(f"{t}\t{c}\n")
