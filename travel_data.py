import pandas as pd
import glob, datetime


travel_volume = {}
for fname in glob.glob('../cluster_scripts/travel_data/*xls'):
    print(f"Loading {fname}")
    country = fname.split('/')[-1][:-4]
    if country=='UK':
        country = 'United Kingdom'
    else:
        country = country[0].upper() + country[1:]

    d = pd.read_excel(fname, skiprows=2).astype(str)
    travel_volume[country] = d.iloc[0,3:].apply(lambda x:int(x.replace('.','')))
    travel_volume[country].index = [datetime.datetime(2020,i,15) for i in range(1,11)]


#quarantine free travel to spain:
q_free_to_spain = {
    "United Kingdom": {"start": "2020-07-10", "end": "2020-07-26", "msg": "UK to Spain"},
    "Spain": {"start": "2020-06-21", "end": "2020-10-05", "msg": "Spain to Europe"},
    "Norway": {"start": "2020-07-15", "end": "2020-07-25", "msg": "Norway to Spain"},
    "Switzerland": {"start": "2020-06-15", "end": "2020-08-10", "msg": "Switzerland to Spain"},
    #"Latvia": {"start": "2020-07-01", "end": "2020-07-17", "msg": "Latvia to Spain"},
    "France": {"start": "2020-06-15", "end": "2020-10-05", "msg": "France to Spain"},
    "Netherlands": {"start": "2020-06-15", "end": "2020-08-24", "msg": "Netherlands to Spain"}
}

travel_order = ["Norway", "United Kingdom", "Switzerland", "Netherlands", "Spain", "France"]

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


