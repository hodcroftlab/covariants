from datetime import datetime
from collections import defaultdict
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import geopandas


def read_roaming_data(roamer_type="departing"):
    province_codes = get_province_population()
    provinces = pd.read_csv("travel_data/roaming_data/province_codes.csv", index_col="province_num")
    data = pd.read_csv("travel_data/roaming_data/roamers_weekly_spain_2020-04-06_2020-12-21.csv")
    data["CW"] = data.week.apply(lambda x: datetime.strptime(x, "%Y-%m-%d").isocalendar()[1])
    data["province"] = data.province_num.apply(lambda x: province_codes[provinces.loc[x].province_name]["code"])

    if roamer_type=="departing":
        data = data[data.is_departing]
    elif roamer_type=="arriving":
        data = data[data.is_arriving]

    return data.loc[:,["CW", "province", "country_iso", "num_roamers"]].groupby(by=["CW", "province", "country_iso"]).sum()

def read_country_codes():
    countries = pd.read_csv("travel_data/roaming_data/iso_codes.csv")
    lookup = {row.country_iso:row.country_name for ri, row in countries.iterrows()}
    return lookup, {v:k for k,v in lookup.items()}

def get_province_population():
    d = pd.read_excel('country_case_data/province_population_code.xlsx', na_values='?', keep_default_na=False)
    res = {}
    for ri, row in d.iterrows():
        name = " ".join(row.Province.split()[1:])
        res[row.Code] = {'code':row.Code, 'name':name, 'population':row.Population}
        res[name] = {'code':row.Code, 'name':name, 'population':row.Population}

    res['Alicante'] = res['Alicante/Alacant']
    res['Valencia'] = res['Valencia/València']
    res['Valencia/Valéncia'] = res['Valencia/València']
    res['Gipuzcoa'] = res['Gipuzkoa']
    return res

def get_roamers_by_province(roaming, CW, country):
    res = {}
    for ii in roaming.index:
        if ii[0]==CW and ii[2]==country:
            res[ii[1]] = roaming.loc[ii].num_roamers
    return res

def get_roamers_time_series_total(roaming, country):
    res = defaultdict(int)
    for ii in roaming.index:
        if ii[2]==country:
            res[ii[0]] += roaming.loc[ii].num_roamers
    return res

def get_roamers_time_series_total_province(roaming, province):
    res = defaultdict(int)
    for ii in roaming.index:
        if ii[1]==province:
            res[ii[0]] += roaming.loc[ii].num_roamers
    return res

def get_roamerDis_by_province(roaming, CW, country):
    res = get_roamers_by_province(roaming,CW,country)
    total = np.sum(list(res.values()))
    return {k:v/total for k,v in res.items()}

def get_roamerDis_by_province_CWrange(roaming, CWrange, country):
    res = defaultdict(int)
    for CW in CWrange:
        res.update(get_roamers_by_province(roaming,CW,country))

    total = np.sum(list(res.values()))
    return {k:v/total for k,v in res.items()}

def get_roamer_province_average(data, roaming, CW, country):
    res = get_roamerDis_by_province(roaming,CW,country)
    return np.sum([v*res.get(k,0) for k,v in data.items()])


def read_province_data():
    case_data = pd.read_csv('country_case_data/2021-01-08_Spanish_provinces_cases.csv', na_values='?', keep_default_na=False)
    province_size = get_province_population()
    case_data["date"] = pd.to_datetime(case_data.fecha)
    case_data["CW"] = case_data.date.apply(lambda x: x.isocalendar()[1])
    provinces = case_data.provincia_iso.unique()

    cases_by_cw = {}
    for cw in range(10,52):
        cases_by_cw[cw] = {}
        for province in provinces:
            try:
                province_data = case_data[case_data.provincia_iso==province].sort_values(by='date')
                cases_by_cw[cw][province_size[province]["code"]] = np.sum(province_data[province_data.CW==cw].num_casos)
            except:
                print("province", province)

    return cases_by_cw, provinces


if __name__=="__main__":

    roamers = read_roaming_data()

    plt.figure()
    roaming_totals = roamers.groupby(level=[0]).sum()
    plt.plot(roaming_totals.index,roaming_totals.num_roamers)

    spain = geopandas.read_file('../geo/SECC_CPV_E_20111101_01_R_INE.shp')
    provinces_geo = spain.NPRO.unique()

    shapes = []
    codes = []
    for pr in provinces_geo:
        codes.append(province_size[pr]["code"])
        if province_size[pr]["code"] in ['TF', 'GC']:
            tmp_shape = spain[spain.NPRO==pr].translate(xoff=19e5,yoff=8e5).unary_union
        else:
            tmp_shape = spain[spain.NPRO==pr].unary_union
        shapes.append(tmp_shape)


    spain_provinces = geopandas.GeoDataFrame({"geometry": shapes, "name":provinces_geo,
                                              "cases":[cases_by_cw[cw].get(c,0) for c in codes],
                                              "cases_per_capita":[cases_by_cw[cw].get(c,0)/province_size[c]["population"] for c in codes]
                                             }, index=codes)


    fig = plt.figure()
    ax = plt.subplot(111)
    spain_provinces.plot(column='cases_per_capita', ax=ax)
    ax.set_axis_off()

    weeks = [29,32,35]
    fig, axs = plt.subplots(4,3, figsize=(18,18))
    for wi, cw in  enumerate(weeks):
        spain_provinces = geopandas.GeoDataFrame({"geometry": shapes, "name":provinces_geo,
                                              "cases":[cases_by_cw[cw].get(c,0) for c in codes],
                                              "cases_per_capita":[cases_by_cw[cw].get(c,0)/province_size[c]["population"] for c in codes]
                                             }, index=codes)
        spain_provinces.plot(column='cases_per_capita', ax=axs[0,wi], vmax=0.004)
        axs[0,wi].set_axis_off()
        axs[0,wi].set_title(f"cases in CW {cw}")

    for ci, country in enumerate(['de', 'gb', 'dk']):
        for wi, cw in  enumerate(weeks):
            r = get_roamerDis_by_province(roamers, cw, country)
            spain_provinces = geopandas.GeoDataFrame({"geometry": shapes, "name":provinces_geo,
                                                      "roamers":[r.get(c,0) for c in codes],
                                             }, index=codes)
            spain_provinces.plot(column='roamers', ax=axs[ci+1,wi])
            axs[ci+1,wi].set_title(f'country:{country}, week:{cw}')
            axs[ci+1,wi].set_axis_off()


    plt.figure()
    for country in ['de', 'gb', 'dk', 'fr', 'ch']:
        r = get_roamers_time_series_total(roamers, country)
        plt.plot(list(r.keys()), list(r.values()), label=country)


    plt.figure()
    weeks = range(20,44)
    for country in ['de', 'gb', 'dk', 'fr', 'ch']:
        plt.plot(weeks, [get_roamer_province_average({k:v/province_size[k]["population"] for k,v in cases_by_cw[cw].items()},
                                                     roamers, cw, country)
                        for cw in weeks], label=country)
