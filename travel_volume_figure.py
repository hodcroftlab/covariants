import numpy as np
import matplotlib.pyplot as plt
from travel_data import *
from colors_and_countries import *
from helpers import *


def get_import_frequency(country, cases, weeks=None, avg_cases_per_intro=1):
    if weeks is None:
        weeks = list(range(15,44))

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

        imported_incidence.append(avg_cases_per_intro*cases["Spain"][d]/popsizes["Spain"]*travel_rate)

        # rate of change not due to imports
        Re = (cases[country][d]/popsizes[country] - imported_incidence[-1])/(cases[country][prev_week]/popsizes[country])

        Re_traj.append(Re)

        introductions.append(imported_incidence[-1]*popsizes[country]/avg_cases_per_intro)
        import_totals.append(import_totals[-1]*Re + imported_incidence[-1])
        totals.append(cases[country][d]/popsizes[country])

    import_totals = np.array(import_totals)[1:]
    totals = np.array(totals)[1:]

    return {"frequency":import_totals/totals, "dates":dates, "Re": Re_traj, "introductions":introductions}


fs=14
fmt = 'pdf'

fig = plt.figure()
for coun in travel_volume:
   plt.plot(travel_volume[coun].index, travel_volume[coun]/popsizes[coun]*100000, label=coun,
            c=country_styles[coun]['c'], lw=2)

plt.yscale('log')
plt.ylabel('passengers/100000', fontsize=fs)
fig.autofmt_xdate(rotation=30)
plt.legend()
plt.savefig(f'figures/travel_volume.{fmt}')


countries = ["Switzerland", "Spain", "United Kingdom", "Netherlands", "France", "Ireland", "Denmark"]
case_data = load_case_data(countries)
fig = plt.figure()

for country in case_data:
    if country=='Spain':
        continue

    res = get_import_frequency(country, case_data)
    plt.plot(res['dates'], res['frequency'], label=country, c=country_styles[country]['c'])

plt.legend(fontsize=fs*0.8)
plt.tick_params(labelsize=fs*0.8)
plt.ylabel('Cumulative frequency of imports', fontsize=fs)
fig.autofmt_xdate(rotation=30)
plt.tight_layout()
plt.savefig(f'figures/import_model.{fmt}')




fig = plt.figure()

#for a simpler plot of most interesting countries use this:
for country in countries:
    week_as_date, cluster_count, total_count = non_zero_counts(cluster_data, total_data, country)
    week_as_date, cluster_count, total_count = trim_last_data_point(week_as_date, cluster_count, total_count, frac=0.1, keep_count=10)
    days = np.array([x.toordinal() for x in week_as_date])
    cluster_freq = cluster_count/total_count

    plt.plot(week_as_date, cluster_freq,
            marker='o',
            color=country_styles[country]['c'],
            linestyle=country_styles[country]['ls'])
    if country=="Spain":
        continue

    res = get_import_frequency(country, case_data)
    scale_factor = np.mean([cluster_freq[i] for i,d in enumerate(week_as_date) if d in res['dates']])/np.mean(res["frequency"])
    plt.plot(res["dates"], res["frequency"]*scale_factor,
            c=country_styles[country]['c'], ls=country_styles[country]['ls'],
            label = f"{country}, scale: {scale_factor:1.2f}")

plt.legend()
fig.autofmt_xdate(rotation=30)
plt.ylabel('frequency')
plt.tight_layout()
plt.savefig(figure_path+f'travel_scaled.{fmt}')
