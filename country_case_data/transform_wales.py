import pandas as pd
from collections import defaultdict
from datetime import datetime
import numpy as np

d = pd.read_csv('Wales.csv', skiprows=1)

data = defaultdict(int)

for ri, row in d.iterrows():
    data[datetime.strptime(row.loc["Specimen date"], "%m/%d/%Y").strftime("%Y-%m-%d")] += row.loc["Cases (new)"]

sorted_data = sorted(data.items())
cum_dates = [x[0] for x in sorted_data]
cum_cases = np.cumsum([x[1] for x in sorted_data])

with open('Wales_transformed.csv', 'w') as fh:
    fh.write('#produced by transform_wales\n')
    fh.write('time,cases\n')
    for t, c in zip(cum_dates, cum_cases):
        fh.write(f"{t},{c}\n")
