

from matplotlib.patches import Rectangle
import matplotlib.patches as mpatches
import matplotlib.pyplot as plt
import pandas as pd
from shutil import copyfile
from clusters import *
from colors_and_countries import *
from helpers import *

countries_to_plot = ['France',
'Norway',
'United Kingdom',
'Netherlands',
'Spain',
'Belgium',
'Switzerland',
'Ireland',
'Italy',
'Denmark'
]

grey_color = "#cccccc"
fmt = "pdf"

date = "2021-02-07"
cluster_path = '../covariants/through_Nov_data/'
figure_path = cluster_path

total_data = pd.read_csv(cluster_path+f"total_data-{date}.tsv",sep="\t", index_col=0).fillna(0)

for clus in clusters:
    try:
        clusters[clus]["cluster_data"] = pd.read_csv(cluster_path+f"{clusters[clus]['build_name']}-{date}.tsv",sep="\t", index_col=0).fillna(0)
    except:
        print(f"No file for cluster {clus}")


country_week = {clus: {} for clus in clusters}

#fig, ax1 = plt.subplots(nrows=1,figsize=(10,7))
fs = 14
#fig, (ax1, ax2, ax3, ax4, ax5, ax6, ax7) = plt.subplots(nrows=7, sharex=True,figsize=(9,9),
#                                    gridspec_kw={'height_ratios':[1,1,1,1,1,1,1]})
fig, axs = plt.subplots(nrows=len(countries_to_plot)+1, sharex=True,figsize=(9,11))

week_as_dates = {}

#for coun in [x for x in countries_to_plot]:
for coun, ax in zip(countries_to_plot, axs[1:]):
    i=0
    first_clus_count = []
    ptchs = []
    #for cluster_data in [cluster_data_S477, cluster_data_S222]:
    for clus in clusters.keys():
        cluster_data = clusters[clus]['cluster_data']
        week_as_date, cluster_count, total_count = non_zero_counts(cluster_data, total_data, coun)

        week_as_dates[coun] = week_as_date
        #clusters[clus]['week_as_date'] = week_as_date
        #clusters[clus]['cluster_count'] = cluster_count
        #clusters[clus]['total_count'] = total_count

        country_week[clus][coun] = cluster_count/(total_count+0.001)

        linesty = '-'
        lab = clusters[clus]["display_name"] #f"{clus}"
        if i == 0:
            first_clus_count = [0] * len(cluster_count)
        #if i == 1:
        #    linesty = ':'
        cluster_count = first_clus_count + cluster_count #unindented

  #      ax.plot(week_as_date, cluster_count/total_count,
  #              color=clusters[clus]['col'],#country_styles[coun]['c'],
  #              linestyle=linesty)#, label=lab)
        
        #ax.scatter(week_as_date, cluster_count/total_count, s=[marker_size(n) for n in total_count],
        #        color=country_styles[coun]['c'],
        #        linestyle=linesty)
        #if i==0:
        #    ax.fill_between(week_as_date, 0, cluster_count/total_count, facecolor=clusters[clus]['col'])
        #    patch = mpatches.Patch(color=clusters[clus]['col'], label=lab)
        #    ptchs.append(patch)
        #else:
        ax.fill_between(week_as_date, first_clus_count/(total_count+0.001), cluster_count/(total_count+0.001), facecolor=clusters[clus]['col'])
        patch = mpatches.Patch(color=clusters[clus]['col'], label=lab)

        #exclude 501 for now (not present)
        if clus is not "S501":
            ptchs.append(patch)
        if i == len(clusters)-1 :
            ax.fill_between(week_as_date, cluster_count/(total_count+0.001), 1, facecolor=grey_color)
            patch = mpatches.Patch(color=grey_color, label=f"other")
            ptchs.append(patch)
        #if i == 0:
        first_clus_count = cluster_count # unindented
        i+=1
    ax.text(datetime.datetime(2020,6,1), 0.7, coun, fontsize=fs)
    ax.tick_params(labelsize=fs*0.8)
    #ax.set_ylabel('frequency')
    #ax.legend(ncol=1, fontsize=fs*0.8, loc=2)

axs[0].legend(handles=ptchs, loc=3, fontsize=fs*0.7, ncol=4)
axs[0].axis('off')
fig.autofmt_xdate(rotation=30)
plt.show()
plt.tight_layout()

plt.savefig(figure_path+f"EUClusters_compare.{fmt}")
trends_path = figure_path+f"EUClusters_compare.{fmt}"
copypath = trends_path.replace("compare", "compare-{}".format(datetime.date.today().strftime("%Y-%m-%d")))
copyfile(trends_path, copypath)

