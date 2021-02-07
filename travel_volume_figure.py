from collections import defaultdict
from datetime import datetime
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.interpolate import interp1d
from travel_data import *
from colors_and_countries import *
from helpers import *
from spanish_regions import *

figure_path = '../cluster_scripts/figures/'

def CW_to_date(cw):
    return datetime.strptime(f"2020-W{cw}-1", '%G-W%V-%u')

def date_to_CW(d):
    return d.isocalendar()[1]

def country_correlation(roamers, countries, country_to_iso, weeks, province_codes):
    res = defaultdict(list)
    for c in countries:
        if c=='Spain':
            continue
        tmp = get_roamerDis_by_province_CWrange(roamers, weeks, country_to_iso[c])
        for p in province_codes:
            res[c].append(tmp.get(p,0))

    return pd.DataFrame(res)

def get_total_cluster(cases, frequency, weeks=None):
    if weeks is None:
        weeks = list(range(15,52))

    dates = []
    ncases = []
    ncases_other = []
    summer_average = np.mean([x for d,x in frequency.items() if d.month>7])
    for week in weeks:
        d = CW_to_date(week)
        ncases.append(cases[d]*frequency.get(d, np.nan))
        ncases_other.append(cases[d]*(1-frequency.get(d, np.nan)))
        dates.append(d)

    return {"cases":ncases, "cases_other":ncases_other, "dates":dates}


def get_import_frequency(country, cases, frequency, weeks=None, avg_cases_per_intro=1):
    if weeks is None:
        weeks = list(range(15,44))

    summer_average = np.mean([x for d,x in frequency.items() if d.month>7])
    imported_incidence = []
    imported_incidence_total = []
    import_totals = [0]
    totals = [0]
    introductions = []
    introductions_total = []
    dates = []
    Re_traj = [1]
    for week in weeks:
        d = CW_to_date(week)
        prev_week = CW_to_date(week-1)
        mid_month = datetime.strptime(f"2020-{d.month:02d}-15", "%Y-%m-%d")
        dates.append(d)

        # numbers are per month. Hence divide by 30 and multiply by 7 to obtain rates per week\.
        travel_rate = travel_volume[country][mid_month]/popsizes[country]/30*7

        imported_incidence.append(avg_cases_per_intro*cases["Spain"][d]/popsizes["Spain"]*travel_rate*frequency.get(d, 0 if d.month<7 else summer_average))
        imported_incidence_total.append(avg_cases_per_intro*cases["Spain"][d]/popsizes["Spain"]*travel_rate)

        # rate of change not due to imports
        Re = (cases[country][d]/popsizes[country] - imported_incidence[-1])/(cases[country][prev_week]/popsizes[country])

        Re_traj.append(Re)

        introductions.append(imported_incidence[-1]*popsizes[country]/avg_cases_per_intro)
        introductions.append(imported_incidence_total[-1]*popsizes[country]/avg_cases_per_intro)
        import_totals.append(import_totals[-1]*Re + imported_incidence[-1])
        totals.append(cases[country][d]/popsizes[country])

    import_totals = np.array(import_totals)[1:]
    totals = np.array(totals)[1:]

    return {"frequency":import_totals/totals, "dates":dates, "Re": Re_traj, "introductions":introductions, "introductions_total":introductions_total}

def get_import_frequency_province(cases, travel_volume, traveler_incidence, popsize, frequency, weeks=None, avg_cases_per_intro=1):
    if weeks is None:
        weeks = list(range(15,44))

    imported_incidence = []
    imported_incidence_total = []
    import_totals = [0]
    totals = [0]
    introductions = []
    introductions_total = []
    dates = []
    Re_traj = [1]
    summer_average = np.mean([x for d,x in frequency.items() if d.month>7])
    for week in weeks:
        d = CW_to_date(week)
        prev_week = CW_to_date(week-1)
        dates.append(d)
        EU1_freq = frequency.get(d, 0 if d.month<7 else summer_average)

        # here, travel volume is per week
        travel_rate = travel_volume[week]/popsize

        imported_incidence.append(avg_cases_per_intro*travel_rate*traveler_incidence[week]*EU1_freq)
        imported_incidence_total.append(avg_cases_per_intro*travel_rate*traveler_incidence[week])

        # rate of change not due to imports
        Re = (cases[d]/popsize - imported_incidence[-1])/(cases[prev_week]/popsize)

        Re_traj.append(Re)

        introductions.append(imported_incidence[-1]*popsize/avg_cases_per_intro)
        introductions_total.append(imported_incidence_total[-1]*popsize/avg_cases_per_intro)
        import_totals.append(import_totals[-1]*Re + imported_incidence[-1])
        totals.append(cases[d]/popsize)

    import_totals = np.array(import_totals)[1:]
    totals = np.array(totals)[1:]

    return {"frequency":import_totals/totals, "dates":dates, "Re": Re_traj, "introductions":introductions, "introductions_total":introductions_total}


def get_country_imports(roamers, case_data, travel_volume, country_code, spain_frequency, cases_by_cw_per_captia, weeks, popsize):
    roam_time_series = get_roamers_time_series_total(roamers, country_code)
    roaming_date_points = [datetime.strptime(f"2020-W{week}-1", '%G-W%V-%u') for week in roam_time_series.keys()]
    roam_scale_factor = 1.0 #get_roaming_scale_factor(roamers, travel_volume, country_code)
    travel = {k:v*roam_scale_factor for k,v in roam_time_series.items()}
    traveler_incidence = {cw: get_roamer_province_average(cases_by_cw_per_captia[cw], roamers, cw, country_code)
                          for cw in weeks}

    return get_import_frequency_province(case_data, travel, traveler_incidence, popsize, spain_frequency, weeks=weeks)


def get_roaming_scale_factor(roamers, travel_volume, country):
    roam_time_series = get_roamers_time_series_total(roamers, country)
    total = []
    roam = []
    for date, row in travel_volume.items():
        cw =date.isocalendar()[1]
        if cw in roam_time_series:
            total.append(row)
            roam.append(roam_time_series[cw])

    total = np.array(total)
    roam = np.array(roam)
    return np.sum(total*roam)/np.sum(roam**2)/30*7  # convert to per week


def import_figure(countries, roamers, country_to_iso, spain_frequency, cases_by_cw_per_capita):
    fig, axs = plt.subplots(2,1, figsize=(6,7), sharex=True)
    summer = range(28,38)
    for country in countries:
        if country=='Spain':
            continue

        roam_time_series = get_roamers_time_series_total(roamers, country_to_iso[country])
        roaming_date_points = [datetime.strptime(f"2020-W{week}-1", '%G-W%V-%u') for week in roam_time_series.keys()]
        roam_scale_factor = get_roaming_scale_factor(roamers, travel_volume[country], country_to_iso[country])
        print(f"roaming scale factor {country}: {roam_scale_factor}")
        # axs[0].plot(travel_volume[country].index, travel_volume[country]/popsizes[country]*100000, label=country,
        #         c=country_styles[country]['c'], lw=2, ls=country_styles[country].get('ls', '-'))
        axs[0].plot(roaming_date_points, np.array(list(roam_time_series.values()))*roam_scale_factor/popsizes[country]*100000, label=country,
                c=country_styles[country]['c'], lw=2, ls=country_styles[country].get('ls', '-'))

    axs[0].set_yscale('log')
    axs[0].set_ylabel('dept. from Spain/100k residents', fontsize=fs)
    axs[1].tick_params(labelsize=fs*0.8)
    fig.autofmt_xdate(rotation=30)

    # plt.savefig(figure_path+f'travel_volume.{fmt}')

    case_data = load_case_data(countries)
    # fig = plt.figure()
    weeks = range(15,50)
    for country in case_data:
        if country=='Spain':
            continue
        res = get_country_imports(roamers, case_data[country], travel_volume[country], country_to_iso[country], spain_frequency,
                                  cases_by_cw_per_capita, weeks, popsizes[country])

        # res = get_import_frequency(country, case_data, spain_frequency)
        print(f"{country} -- total imports: {np.sum(res['introductions'])}")
        print(f"{country} -- summer imports: {np.sum([i for i,d in zip(res['introductions'], res['dates']) if date_to_CW(d) in summer])}")
        axs[1].plot(res['dates'], res['frequency'], label=country, c=country_styles[country]['c'], ls=country_styles[country].get('ls', '-'), lw=2)

    axs[1].legend(fontsize=fs*0.9)
    axs[1].tick_params(labelsize=fs*0.8)
    axs[1].set_ylabel('predicted frequency of EU1', fontsize=fs)
    fig.autofmt_xdate(rotation=30)
    plt.tight_layout()
    axs[0].text(axs[0].get_xlim()[0]-30, axs[0].get_ylim()[1], "A", size=22, weight="bold")
    axs[1].text(axs[1].get_xlim()[0]-30, axs[1].get_ylim()[1]+0.001, "B", size=22, weight="bold")
    axs[1].set_xlim(datetime(2020,4,1),datetime(2020,11,30))
    plt.savefig(figure_path+f'import_model.{fmt}')


def import_scaled(countries, roamers, country_to_iso, spain_frequency, cases_by_cw_per_capita, cluster_data, total_data):
    imports_file = open("imports.txt", 'w')
    imports_file.write(f"country\tintroductions\tscale_factor\n")
    case_data = load_case_data(countries + uk_countries)

    countries_no_spain = [x for x in countries if x!='Spain']
    ncols=3
    nrows = len(countries_no_spain)//ncols + (1 if len(countries_no_spain)%ncols else 0)

    fig, axs = plt.subplots(ncols, nrows, figsize=(10,10), sharex=True, sharey=True)
    #for a simpler plot of most interesting countries use this:
    for ci,c in enumerate(countries_no_spain):
        ax = axs[ci//3, ci%3]
        for country in [c]:
            week_as_date, cluster_count, total_count = non_zero_counts(cluster_data, total_data, country,smoothing=smoothing)
            week_as_date, cluster_count, total_count = trim_last_data_point(week_as_date, cluster_count, total_count, frac=0.1, keep_count=10)
            days = np.array([x.toordinal() for x in week_as_date])
            cluster_freq = cluster_count/total_count

            weeks = range(15,50)
            ax.plot(week_as_date, cluster_freq,
                    marker='o',
                    color=country_styles[country]['c'],
                    linestyle=country_styles[country]['ls'], label=f"EU1 frequency in {country}")

            res = get_country_imports(roamers, case_data[country], travel_volume[country], country_to_iso[country], spain_frequency,
                                      cases_by_cw_per_capita, weeks, popsizes[country])
            # res = get_import_frequency(country, case_data,spain_frequency)
            obs = []
            pred = []
            for week in weeks:
                d = CW_to_date(week)
                if d in week_as_date and d in res['dates']:
                    obs.append(cluster_freq[week_as_date.index(d)])
                    pred.append(res["frequency"][res["dates"].index(d)])
            obs = np.array(obs)
            pred = np.array(pred)
            scale_factor = np.sum(obs*pred)/np.sum(pred**2)
            ax.plot(res["dates"], res["frequency"]*scale_factor,
                    c=country_styles[country]['c'], ls=country_styles[country]['ls'],
                    label = f"Model for {country}, {scale_factor:1.1f}x")
            imports_file.write(f"{country}\t{np.sum(res['introductions']):1.2f}\t{scale_factor:1.2f}\n")

        ax.legend(fontsize=0.8*fs)
        ax.set_ylim([0,1])
        ax.set_xlim([datetime(2020,6,1), datetime(2020,11,30)])
        ax.tick_params(labelsize=fs*0.8)
        if ci%3==0:
            ax.set_ylabel('frequency', fontsize=fs)
    fig.autofmt_xdate(rotation=30)
    plt.tight_layout()
    plt.savefig(figure_path+f'travel_scaled.{fmt}')
    imports_file.close()


def case_and_travel_figure(countries, roamers, cases_by_cw, province_size, country_to_iso, province_codes, fname=None):
    weeks1 = range(28,32)
    weeks2 = range(32,36)

    geo = get_Spain_shapes(province_size)
    fig, axs = plt.subplots(2,2, figsize=(10,10))
    spain_provinces = geopandas.GeoDataFrame({"geometry": geo["shapes"], "name": geo["names"],
                                          "cases":[cases_by_cw[cw].get(c,0) for c in geo["codes"]],
                                          "cases_per_capita":[np.sum([cases_by_cw[cw].get(c,0) for cw in weeks1])/province_size[c]["population"]
                                                              for c in geo["codes"]]
                                         }, index=geo["codes"])
    spain_provinces.plot(column='cases_per_capita', ax=axs[0,0])
    axs[0,0].set_axis_off()
    axs[0,0].set_title(f"cases in CW {weeks1[0]} — {weeks1[-1]}", fontsize=1.7*fs)


    spain_provinces = geopandas.GeoDataFrame({"geometry": geo["shapes"], "name": geo["names"],
                                          "cases":[cases_by_cw[cw].get(c,0) for c in geo["codes"]],
                                          "cases_per_capita":[np.sum([cases_by_cw[cw].get(c,0) for cw in weeks2])/province_size[c]["population"]
                                                              for c in geo["codes"]]
                                         }, index=geo["codes"])
    spain_provinces.plot(column='cases_per_capita', ax=axs[0,1])
    axs[0,1].set_axis_off()
    axs[0,1].set_title(f"cases in CW {weeks2[0]} — {weeks2[-1]}", fontsize=1.7*fs)

    cname = {'ch':"Switzerland", "gb":"UK", 'fr':"France"}
    for ci, country in enumerate(['fr', 'gb']):
        r = get_roamerDis_by_province_CWrange(roamers, range(weeks1[0], weeks2[-1]), country)
        spain_provinces = geopandas.GeoDataFrame({"geometry": geo["shapes"], "name": geo["names"],
                                                   "roamers":[r.get(c,0) for c in geo["codes"]],
                                         }, index=geo["codes"])
        spain_provinces.plot(column='roamers', ax=axs[1,ci])
        axs[1,ci].set_title(f'Visitors from {cname[country]}', fontsize=1.7*fs)
        axs[1,ci].set_axis_off()

    plt.savefig(figure_path+f'cases_and_travelers.png')

    return fig, axs


def confirmed_vs_estimated_imports(country, roamers, country_to_iso, spain_frequency, cases_by_cw_per_capita, scale_factor, scale_factor_reported=None):

    weeks = range(15,50)
    summer = range(28,38)
    case_data = load_case_data(countries)

    fig = plt.figure()
    case_data = load_case_data(countries)
    reported_imports = pd.read_csv(f'../cluster_scripts/travel_data/{country.lower()}_imports_from_spain.tsv', sep='\t')
    res = get_country_imports(roamers, case_data[country], travel_volume[country], country_to_iso[country], spain_frequency,
                              cases_by_cw_per_capita, weeks, popsizes[country])

    plt.plot(res['dates'], res['introductions'], 'o-', label="travel estimate", lw=2)

    # plt.plot(res['dates'], np.array(res['introductions'])*scale_factor, 'o-', label=f"rescaled estimate ({scale_factor}x)", lw=2)

    plt.plot([CW_to_date(x) for x in reported_imports.CW], reported_imports.cases, 'o-', label="reported cases", lw=2)
    if scale_factor_reported:
        plt.plot([CW_to_date(x) for x in reported_imports.CW], reported_imports.cases*scale_factor_reported, 'o-', label="adjusted rep. cases", lw=2)

    print("Summer imports:", np.sum([x.cases for i,x in reported_imports.iterrows() if x.CW in summer]))
    print("Summer estimate EU1:", np.sum([i for d,i in zip(res['dates'], res['introductions']) if date_to_CW(d) in summer]))
    print("Summer estimate total:", np.sum([i for d,i in zip(res['dates'], res['introductions_total']) if date_to_CW(d) in summer]))

    plt.legend(loc=2)
    plt.ylabel('introductions')
    fig.autofmt_xdate()


def total_EU1_cases(roamers, country_to_iso, spain_frequency, cases_by_cw_per_capita):
    countries = ["Switzerland", "United Kingdom", "Netherlands", "France",
                 "Ireland", "Denmark", "Belgium", "Germany", "Norway",
                 "Italy",
                 "Spain",
                 ]
    case_data = load_case_data(countries)
    weeks = range(15,50)

    fig=plt.figure()
    total_not_spain = defaultdict(int)
    total_not_spain_other = defaultdict(int)
    total_estimated_exports = defaultdict(float)
    total_pop = 0
    Re = defaultdict(float)
    for country in countries:
        cluster_freq = {k: c/tot for k, c, tot in zip(*non_zero_counts(cluster_data, total_data, country, smoothing=smoothing))}
        res = get_total_cluster(case_data[country], cluster_freq)
        if country!="Spain":
            imports = get_country_imports(roamers, case_data[country], travel_volume[country], country_to_iso[country],
                                          spain_frequency, cases_by_cw_per_capita, weeks, popsizes[country])
            for k,v in zip(res["dates"], res["cases"]):
                total_not_spain[k] += v
            for k,v in zip(res["dates"], res["cases_other"]):
                total_not_spain_other[k] += v
            for k,v in zip(imports["dates"], imports["introductions"]):
                total_estimated_exports[k] += v
            for k,v in zip(imports["dates"], imports["Re"]):
                Re[k] += v*popsizes[country]
            total_pop+=popsizes[country]
        else:
            plt.plot(res['dates'], res['cases'], label=country + " (EU1)", c=country_styles[country]['c'], ls=country_styles[country].get('ls', '-'), lw=3)
            plt.plot(res['dates'], np.array(res['cases_other'])+np.array(res['cases']), label=country + " (total)", c=country_styles[country]['c'], ls='--', lw=3)

    plt.plot([k for k in total_not_spain.keys()], [k for k in total_not_spain.values()],
             label="outside Spain (EU1)", c='k', ls='-', lw=3)

    plt.plot([k for k in total_not_spain_other.keys()], [total_not_spain[k] + v for k,v in total_not_spain_other.items()],
             label="outside Spain (total)", c='k', ls='--', lw=3)

    for k in Re:
        Re[k] /= total_pop


    plt.legend(fontsize=fs)
    plt.ylabel('estimated cases', fontsize=fs)
    plt.tick_params(labelsize=fs)
    plt.text(-0.15, 0.97, 'B', fontsize=1.6*fs, transform=plt.gca().transAxes)
    fig.autofmt_xdate(rotation=30)
    plt.tight_layout()
    plt.xlim(datetime(2020,5,15), datetime(2020,11,30))
    plt.yscale('log')
    plt.ylim(1,1e7)
    plt.savefig(f'{figure_path}total_EU1_cases.{fmt}')

    # make secondary figure with Re estimate.
    fig, axs = plt.subplots(1,3, sharey=True, figsize=(12,5))
    pc = 5
    t0 = 12
    for ax, mult in zip(axs, [1,2,4]):
        dates = list(total_estimated_exports.keys())
        exports_from_spain = interp1d([d.toordinal() for d in dates], list(total_estimated_exports.values()))
        Re_eu1 = np.array([(pc+total_not_spain[dates[i]]) for i in range(t0,len(dates))]), np.array([(pc+total_not_spain[dates[i-1]]) for i in range(t0,len(dates))])
        Re_non_eu1 = np.array([(pc+total_not_spain_other[dates[i]]) for i in range(1,len(dates))]), np.array([(pc+total_not_spain_other[dates[i-1]]) for i in range(1,len(dates))])

        Re_eu1_subtracted = {}
        for delay in [7,10,14]:
            Re_eu1_subtracted[delay] = np.array([(pc + total_not_spain[dates[i]] - mult*exports_from_spain(dates[i].toordinal()-delay)) for i in range(t0,len(dates))]), \
                                       np.array([(pc+total_not_spain[dates[i-1]]) for i in range(t0,len(dates))])

        plot_ratio(dates[t0:], Re_eu1[0], Re_eu1[1], pc**0.5*Re_eu1[0]**0.5, pc**0.5*Re_eu1[1]**0.5, ax, label='Growth EU1 (uncorrected)')
        plot_ratio(dates[1:], Re_non_eu1[0], Re_non_eu1[1], pc**0.5*Re_non_eu1[0]**0.5, pc**0.5*Re_non_eu1[1]**0.5, ax, label='Growth non EU1')
        for delay in Re_eu1_subtracted:
            plot_ratio(dates[t0:], Re_eu1_subtracted[delay][0], Re_eu1_subtracted[delay][1], pc**0.5*Re_eu1_subtracted[delay][0]**0.5, pc**0.5*Re_eu1_subtracted[delay][1]**0.5, ax, label=f'Growth EU1 -- travel {delay}d')

        ax.plot(dates, np.ones_like(dates), 'k')
        ax.set_ylim([0,4])
        ax.set_title(f"exports multiplied by {mult}")
    fig.autofmt_xdate(rotation=30)
    plt.legend()

def plot_ratio(x, num, denom, dnum, ddenom, ax, nstd = 2, label=''):
    center = num/denom
    dlog_center = (dnum**2/num**2 + ddenom**2/denom**2)**0.5
    ax.plot(x, center, label=label)
    ax.fill_between(x, center*np.exp(nstd*dlog_center), center*np.exp(-nstd*dlog_center), alpha=0.3)



if __name__ == '__main__':
    date = "2021-02-07"
    cluster_path = './through_Nov_data/'
    total_data = pd.read_csv(cluster_path+f"total_data-{date}.tsv", sep="\t", index_col=0)
    cluster_data = pd.read_csv(cluster_path+f"20A.EU1-{date}.tsv", sep="\t", index_col=0)
    # cluster_data = pd.read_csv('../ncov_cluster/2021-01-14_cluster_data.tsv', index_col=0)
    # total_data =   pd.read_csv('../ncov_cluster/2021-01-14_total_data.tsv', index_col=0)

    width = 1
    smoothing = np.exp(-np.arange(-10,11)**2/2/width**2)
    smoothing /= smoothing.sum()
    spain_frequency = {k: c/tot for k, c, tot in zip(*non_zero_counts(cluster_data, total_data, "Spain", smoothing=smoothing))}
    spain_frequency_by_week = {k.isocalendar()[1]: v for k, v in spain_frequency.items()}

    cases_by_cw, province_codes = read_province_data()
    provinces = get_province_population()
    cases_by_cw_per_capita = {}
    for cw in cases_by_cw:
        cases_by_cw_per_capita[cw] = {}
        for p in cases_by_cw[cw]:
            cases_by_cw_per_capita[cw][p] = cases_by_cw[cw][p]/provinces[p]["population"]

    fs=12
    fmt = 'pdf'

    roamers = read_roaming_data()

    iso_to_country, country_to_iso = read_country_codes()

    countries = ["Spain", "Switzerland", "France", "Germany", "Belgium", "Netherlands",
                 "Ireland", "United Kingdom", "Denmark", "Sweden"
                 ]

    import_figure(countries, roamers, country_to_iso, spain_frequency, cases_by_cw_per_capita)

    import_scaled(countries, roamers, country_to_iso, spain_frequency, cases_by_cw_per_capita, cluster_data, total_data)

    confirmed_vs_estimated_imports("Germany", roamers, country_to_iso, spain_frequency, cases_by_cw_per_capita, 3.7)
    plt.fill_between([datetime(2020,6,22),datetime(2020,9,12)], [300,300], alpha=0.3)
    plt.text(datetime(2020,9,2), -10, "Quarantine requirement")
    plt.text(datetime(2020,6,22), 20, "main holiday period", rotation=90)
    plt.fill_between([datetime(2020,9,2),datetime(2020,12,31)], [60,60], alpha=0.3)
    plt.savefig(figure_path+f'confirmed_vs_estimated_DE.{fmt}')

    confirmed_vs_estimated_imports("Switzerland", roamers, country_to_iso, spain_frequency, cases_by_cw_per_capita, 3.8, scale_factor_reported=1/0.62)
    plt.fill_between([datetime(2020,6,20),datetime(2020,8,26)], [70,70], alpha=0.3)
    plt.fill_between([datetime(2020,8,10),datetime(2020,12,31)], [20,20], alpha=0.3)
    plt.text(datetime(2020,9,2), 15, "Quarantine requirement")
    plt.text(datetime(2020,6,22), 20, "main holiday period", rotation=90)
    plt.savefig(figure_path+f'confirmed_vs_estimated_CH.{fmt}')

    case_and_travel_figure(countries, roamers, cases_by_cw, provinces, country_to_iso, province_codes)

    weeks = range(28,36)
    country_distribution = country_correlation(roamers, countries, country_to_iso, weeks, province_codes)
    fig = sns.clustermap(country_distribution.corr(), cmap='viridis')
    fig.ax_heatmap.tick_params(labelsize=1.7*fs)
    plt.tick_params(labelsize=1.7*fs)
    plt.tight_layout()
    plt.savefig(figure_path + f"country_clustering.{fmt}")

    total_EU1_cases(roamers, country_to_iso, spain_frequency, cases_by_cw_per_capita)
