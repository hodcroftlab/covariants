import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from travel_volume_figure import *
from collections import defaultdict


a = pd.read_csv('travel_data/2021-02-03_SwissImportsFromSpain_JunSep.csv')
a["Date"] = pd.to_datetime(a.Date)

imports_by_CW = {cw:0 for cw in range(15,50)}

for ri, row in a.iterrows():
    cw = date_to_CW(row.Date)
    imports_by_CW[cw] += row.Cases_Imports_Spain

b = pd.DataFrame(imports_by_CW.values(), index=imports_by_CW.keys())

b.to_csv('travel_data/switzerland_imports_from_spain.tsv', sep='\t')
