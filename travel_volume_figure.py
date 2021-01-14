from collections import defaultdict
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from travel_data import *
from colors_and_countries import *
from helpers import *
from spanish_regions import *

figure_path = '../cluster_scripts/figures/'

def get_total_cluster(country, cases, frequency, weeks=None):
    if weeks is None:
        weeks = list(range(15,52))

    dates = []
    ncases = []
    ncases_other = []
    summer_average = np.mean([x for d,x in frequency.items() if d.month>7])
    for week in weeks:
        d = datetime.datetime.strptime(f"2020-W{week}-1", '%G-W%V-%u')
        ncases.append(cases[country][d]*frequency.get(d, 0 if d.month<7 else summer_average))
        ncases_other.append(cases[country][d]*(1-frequency.get(d, 0 if d.month<7 else summer_average)))
        dates.append(d)

    return {"cases":ncases, "cases_other":ncases_other, "dates":dates}


def get_import_frequency(country, cases, frequency, weeks=None, avg_cases_per_intro=1):
    if weeks is None:
        weeks = list(range(15,44))

    summer_average = np.mean([x for d,x in frequency.items() if d.month>7])
    imported_incidence = []
    import_totals = [0]
    totals = [0]
    introductions = []
    dates = []
    Re_traj = [1]
    for week in weeks:
        d = datetime.datetime.strptime(f"2020-W{week}-1", '%G-W%V-%u')
        prev_week = datetime.datetime.strptime(f"2020-W{week-1}-1", '%G-W%V-%u')
        mid_month = datetime.datetime.strptime(f"2020-{d.month:02d}-15", "%Y-%m-%d")
        dates.append(d)

        # numbers are per month. Hence divide by 30 and multiply by 7 to obtain rates per week\.
        travel_rate = travel_volume[country][mid_month]/popsizes[country]/30*7

        imported_incidence.append(avg_cases_per_intro*cases["Spain"][d]/popsizes["Spain"]*travel_rate*frequency.get(d, 0 if d.month<7 else summer_average))

        # rate of change not due to imports
        Re = (cases[country][d]/popsizes[country] - imported_incidence[-1])/(cases[country][prev_week]/popsizes[country])

        Re_traj.append(Re)

        introductions.append(imported_incidence[-1]*popsizes[country]/avg_cases_per_intro)
        import_totals.append(import_totals[-1]*Re + imported_incidence[-1])
        totals.append(cases[country][d]/popsizes[country])

    import_totals = np.array(import_totals)[1:]
    totals = np.array(totals)[1:]

    return {"frequency":import_totals/totals, "dates":dates, "Re": Re_traj, "introductions":introductions}

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
    return np.sum(total*roam)/np.sum(roam**2)

if __name__ == '__main__':
    cluster_data = pd.read_csv('../ncov_cluster/2021-01-14_cluster_data.tsv', index_col=0)
    total_data =   pd.read_csv('../ncov_cluster/2021-01-14_total_data.tsv', index_col=0)

    # Need to run `clusterDynamics.py` on 'S222' before doing this
    # (can now run without printing files)
    width = 1
    smoothing = np.exp(-np.arange(-10,11)**2/2/width**2)
    smoothing /= smoothing.sum()
    spain_frequency = {k: c/tot for k, c, tot in zip(*non_zero_counts(cluster_data, total_data, "Spain", smoothing=smoothing))}

    cases_by_cw, provinces = read_province_data()
    roamers = read_roaming_data()

    iso_to_country, country_to_iso = read_country_codes()

    #fs=14
    fs=12
    fmt = 'pdf'
    countries = ["Switzerland", "Spain", "United Kingdom", "Netherlands", "France",
                 "Ireland", "Denmark", "Belgium", "Germany",
                 "Sweden",
                 "Italy",
                 ]

    fig, axs = plt.subplots(2,1, figsize=(6,7), sharex=True)
    for country in countries:
        if country=='Spain':
            continue

        roam_time_series = get_roamers_time_series_total(roamers, country_to_iso[country])
        roaming_date_points = [datetime.strptime(f"2020-W{week}-1", '%G-W%V-%u') for week in roam_time_series.keys()]
        roam_scale_factor = get_roaming_scale_factor(roamers, travel_volume[country], country_to_iso[country])
        axs[0].plot(travel_volume[country].index, travel_volume[country]/popsizes[country]*100000, label=country,
                c=country_styles[country]['c'], lw=2, ls=country_styles[country].get('ls', '-'))
        axs[0].plot(roaming_date_points, np.array(list(roam_time_series.values()))*roam_scale_factor/popsizes[country]*100000, label=country,
                c=country_styles[country]['c'], lw=2, ls=country_styles[country].get('ls', '-'))

    axs[0].set_yscale('log')
    axs[0].set_ylabel('dept. from Spain/100k residents', fontsize=fs)
    axs[1].tick_params(labelsize=fs*0.8)
    fig.autofmt_xdate(rotation=30)

    # plt.savefig(figure_path+f'travel_volume.{fmt}')

    case_data = load_case_data(countries)
    # fig = plt.figure()

    for country in case_data:
        if country=='Spain':
            continue
        res = get_import_frequency(country, case_data, spain_frequency)
        print(f"{country} -- total imports: {np.sum(res['introductions'])}")
        axs[1].plot(res['dates'], res['frequency'], label=country, c=country_styles[country]['c'], ls=country_styles[country].get('ls', '-'))

    axs[1].legend(fontsize=fs*0.9)
    axs[1].tick_params(labelsize=fs*0.8)
    axs[1].set_ylabel('naive frequency of imports', fontsize=fs)
    fig.autofmt_xdate(rotation=30)
    plt.tight_layout()
    axs[0].text(axs[0].get_xlim()[0]-30, axs[0].get_ylim()[1]+2000, "A", size=22, weight="bold")
    axs[1].text(axs[1].get_xlim()[0]-30, axs[1].get_ylim()[1]+0.001, "B", size=22, weight="bold")
    plt.savefig(figure_path+f'import_model.{fmt}')




# fig = plt.figure()

# #for a simpler plot of most interesting countries use this:
# for country in countries:
#     week_as_date, cluster_count, total_count = non_zero_counts(cluster_data, total_data, country,smoothing=smoothing)
#     week_as_date, cluster_count, total_count = trim_last_data_point(week_as_date, cluster_count, total_count, frac=0.1, keep_count=10)
#     days = np.array([x.toordinal() for x in week_as_date])
#     cluster_freq = cluster_count/total_count

#     plt.plot(week_as_date, cluster_freq,
#             marker='o',
#             color=country_styles[country]['c'],
#             linestyle=country_styles[country]['ls'])
#     if country=="Spain":
#         continue

#     res = get_import_frequency(country, case_data,spain_frequency)
#     scale_factor = np.mean([cluster_freq[i] for i,d in enumerate(week_as_date) if d in res['dates']])/np.mean(res["frequency"])
#     plt.plot(res["dates"], res["frequency"]*scale_factor,
#             c=country_styles[country]['c'], ls=country_styles[country]['ls'],
#             label = f"{country}, scale: {scale_factor:1.2f}")

# plt.legend()
# fig.autofmt_xdate(rotation=30)
# plt.ylabel('frequency')
# plt.tight_layout()
# plt.savefig(figure_path+f'travel_scaled.{fmt}')

# countries = ["Switzerland", "United Kingdom", "Netherlands", "France",
#              "Ireland", "Denmark", "Belgium", "Germany", "Norway",
#              "Italy",
#              "Spain",
#              ]
# case_data = load_case_data(countries)

# fig=plt.figure()
# total_not_spain = defaultdict(int)
# total_not_spain_other = defaultdict(int)
# for country in countries:
#     cluster_freq = {k: c/tot for k, c, tot in zip(*non_zero_counts(cluster_data, total_data, country, smoothing=smoothing))}
#     res = get_total_cluster(country, case_data, cluster_freq)
#     if country!="Spain":
#         for k,v in zip(res["dates"], res["cases"]):
#             total_not_spain[k] += v
#         for k,v in zip(res["dates"], res["cases_other"]):
#             total_not_spain_other[k] += v
#     else:
#         plt.plot(res['dates'], res['cases'], label=country + " (EU1)", c=country_styles[country]['c'], ls=country_styles[country].get('ls', '-'), lw=3)
#         plt.plot(res['dates'], np.array(res['cases_other'])+np.array(res['cases']), label=country + " (total)", c=country_styles[country]['c'], ls='--', lw=3)

# plt.plot([k for k in total_not_spain.keys()], [k for k in total_not_spain.values()],
#          label="outside Spain (EU1)", c='k', ls='-', lw=3)

# plt.plot([k for k in total_not_spain_other.keys()], [total_not_spain[k] + v for k,v in total_not_spain_other.items()],
#          label="outside Spain (total)", c='k', ls='--', lw=3)

# plt.legend(fontsize=fs)
# plt.ylabel('estimated cases', fontsize=fs)
# plt.tick_params(labelsize=fs)
# plt.text(-0.15, 0.97, 'B', fontsize=1.6*fs, transform=plt.gca().transAxes)
# fig.autofmt_xdate(rotation=30)
# plt.tight_layout()
# plt.xlim(datetime.datetime(2020,5,15), datetime.datetime(2020,11,30))
# plt.yscale('log')
# plt.ylim(1,1e7)
# plt.savefig(f'{figure_path}total_EU1_cases.{fmt}')
