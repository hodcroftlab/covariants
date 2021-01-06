import pandas as pd
import glob, datetime
from colors_and_countries import *


travel_volume = {}
for fname in glob.glob('../cluster_scripts/travel_data/*xls'):
    print(f"Loading {fname}")
    country = fname.split('/')[-1][:-4]
    if country=='UK':
        country = 'United Kingdom'
    else:
        country = country[0].upper() + country[1:]

    if country in ['Italy', 'Sweden', 'Poland']: # format changed in 2021
        d = pd.read_excel(fname, skiprows=3).astype(str)
        travel_volume[country] = d.iloc[:10,1].apply(lambda x:int(x.replace('.','')))[::-1]
        travel_volume[country].index = [datetime.datetime(2020,i,15) for i in range(1,11)]
    else:
        d = pd.read_excel(fname, skiprows=2).astype(str)
        travel_volume[country] = d.iloc[0,3:].apply(lambda x:int(x.replace('.','')))
        travel_volume[country].index = [datetime.datetime(2020,i,15) for i in range(1,11)]

d = pd.read_excel('../cluster_scripts/travel_data/UK.xls', skiprows=2).astype(str)
travel_volume["Wales"] = d.iloc[0,3:].apply(lambda x:int(int(x.replace('.','')) * popsizes['Wales']/popsizes['United Kingdom']))
travel_volume["Wales"].index = [datetime.datetime(2020,i,15) for i in range(1,11)]
# fake end date to make it easy to update to 'today'
fake_end_date = "2020-11-01"


#quarantine free travel to spain:
q_free_to_spain = {
    "United Kingdom": {"start": "2020-07-10", "end": "2020-07-26", "msg": "UK to Spain"},
    "Spain": {"start": "2020-06-21", "end": fake_end_date, "msg": "Spain to Europe"},
    "Norway": {"start": "2020-07-15", "end": "2020-07-25", "msg": "Norway to Spain"},
    "Switzerland": {"start": "2020-06-15", "end": "2020-08-10", "msg": "Switzerland to Spain"},
    #"Latvia": {"start": "2020-07-01", "end": "2020-07-17", "msg": "Latvia to Spain"},
    "France": {"start": "2020-06-15", "end": fake_end_date, "msg": "France to Spain"},
    "Netherlands": {"start": "2020-06-15", "end": "2020-08-24", "msg": "Netherlands to Spain"},
    "Denmark": {"start":"2020-06-27", "end":"2020-08-06", "msg": "Denmark to Spain"},
    "Denmark2": {"start": "2020-08-07", "end": fake_end_date, "msg": "Advised to quarantine, not required"}
}

travel_order = ["Norway", "United Kingdom", "Denmark", "Switzerland", "Netherlands", "Spain", "France"]

q_free_to_other = {
    "Latvia": {"start": "2020-07-01", "end": "2020-08-14", "msg": "Latvia to UK"},
    "France": {"start": "2020-06-15", "end": "2020-10-05", "msg": "France to UK"},
    "Norway": {"start": "2020-07-15", "end": "2020-08-21", "msg": "Norway to UK"},
    "Switzerland": {"start": "2020-06-15", "end": "2020-09-28", "msg": "Switzerland to UK"},
    "United Kingdom": {"start": "2020-07-10", "end": "2020-08-29", "msg": "UK to Switzerland"}
}

#note scotland was earlier
q_free_to_swiss = {
    "United Kingdom": {"start": "2020-07-10", "end": "2020-08-29"}
}


