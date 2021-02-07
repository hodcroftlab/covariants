import pandas as pd
from clusters import *

# Run first part of compare_S222_S477.py
# when this script is complete, can copy this part into the bottom of that script

date = "2021-02-07"
cluster_path = '../covariants/through_Nov_data/'

total_data = pd.read_csv(cluster_path+f"total_data-{date}.tsv",sep="\t", index_col=0)

for clus in clusters:
    try:
        clusters[clus]["cluster_data"] = pd.read_csv(cluster_path+f"{clusters[clus]['build_name']}-{date}.tsv",sep="\t", index_col=0)
    except:
        print(f"No file for cluster {clus}")

percents = {}
#trim_tot_data = total_data[3:12].fillna(0)

trim_tota_data = total_data.fillna(0)

for clus in clusters.keys():

    cluster_data = clusters[clus]["cluster_data"]

    trim_cluster_data = cluster_data.fillna(0)

    #percents[clus] = {}
    prc = {}

    # this standaraizes so each value is the percent of sequences from that country
    # that are part of that cluster, that week.
    # This tries to adjust for major sample number differences bween countries
    for coun in countries_to_plot:
        prc[coun] = trim_cluster_data[coun]/trim_tot_data[coun]

    percents[clus] = pd.DataFrame(data=prc)


fs = 14
fig, axs = plt.subplots(nrows=len(clusters), sharex=True,figsize=(12,10))

i = 0
for clus, ax in zip(clusters.keys(), axs):

    # standardize so each value is a percent of that row (week). So percent of that week that's in each country
    percents_t = percents[clus].div(percents[clus].sum(axis=1), axis=0)
    percents_t = percents_t.transpose()
    percents_t = percents_t.fillna(0)
    week_as_date = [ datetime.datetime.strptime("2020-W{}-1".format(x), '%G-W%V-%u')
                     for x in percents[clus].index ]

    colors = [country_styles[co]['c'] for co in percents_t.index]

    ax.stackplot(week_as_date, percents_t.values.tolist(), labels=percents_t.index, colors=colors)
    ax.text(datetime.datetime(2020,5,25), sum(list(ax.get_ylim()))/2, clusters[clus]['display_name'])
    if i == 0:
        handles, labels = ax.get_legend_handles_labels()
        ax.legend(handles = handles, ncol=2, loc=2)

    i+=1

fig.autofmt_xdate(rotation=30)
plt.show()
plt.tight_layout()

plt.savefig(figure_path+f"clusters_compare_country.{fmt}")

#    for coun in countries_to_plot:
#
#    with_data = percents[clus][coun]>=0
#    week_as_date = [ datetime.datetime.strptime("2020-W{}-1".format(x), '%G-W%V-%u')
#                     for x in percents[clus].index[with_data] ]
#    clus_cnt = percents[clus][coun][with_data] * 100

    #percents[clus].index
    #percents[clus]


