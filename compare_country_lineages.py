import matplotlib.patches as mpatches
import pandas as pd
import datetime
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from shutil import copyfile
from collections import defaultdict
from matplotlib.patches import Rectangle
import matplotlib.patches as mpatches
import copy
from colors_and_countries import *
from travel_data import *
from clusters import *
from helpers import *

figure_path = "../cluster_new_scripts/figures/"
overall_trends_figs_path = "../cluster_new_scripts/overall_trends_figures/"

grey_color = "#cccccc"
fmt = "pdf"


# Get diagnostics file - used to get list of SNPs of all sequences, to pick out seqs that have right SNPS
diag_file = "results/sequence-diagnostics.tsv"
diag = pd.read_csv(diag_file, sep='\t', index_col=False)
# Read metadata file
input_meta = "data/metadata.tsv"
meta = pd.read_csv(input_meta, sep='\t', index_col=False)

for clus in clusters.keys():

    print(f"Running cluster {clus}")
    snps = clusters[clus]['snps']
    if 'snps2' in clusters[clus]:
        snps2 = clusters[clus]['snps2']
    else:
        snps2 = []
    if 'gaps' in clusters[clus]:
        gaps = clusters[clus]['gaps']
    else:
        gaps = []

    # get the sequences that we want - which are 'part of the cluster:
    wanted_seqs = []

    for index, row in diag.iterrows():
        strain = row['strain']
        snplist = row['all_snps']
        gaplist = row['gap_list']
        if snps and not pd.isna(snplist):
            intsnp = [int(x) for x in snplist.split(',')]
            if all(x in intsnp for x in snps) or (all (x in intsnp for x in snps2) and len(snps2)!=0):
                #if meta.loc[meta['strain'] == strain].region.values[0] == "Europe":
                wanted_seqs.append(row['strain'])
        #look for all locations in gap list
        elif gaps and not pd.isna(gaplist):
            intgap = [int(x) for x in gaplist.split(',')]
            if all(x in intgap for x in gaps):
                wanted_seqs.append(row['strain'])

    # If seq there and date bad - exclude!
    bad_seqs = {
        'Spain/VC-IBV-98006466/2020' : "2020-03-07", # There's one spanish seq with date of 7 March - we think this is wrong.
        # There are five sequences from UK with suspected bad dates: exclude
        'England/LIVE-1DD7AC/2020' : "2020-03-10",
        'England/PORT-2D2111/2020' : "2020-03-21",
        'England/CAMB-1BA110/2020' : "2020-06-11", # suspected that these ones have reversed dd-mm (are actually 5 and 6 Nov)
        'England/CAMB-1BA0F5/2020' : "2020-05-11", # suspected that these ones have reversed dd-mm (are actually 5 and 6 Nov)
        'England/CAMB-1BA0B9/2020' : "2020-05-11", # suspected that these ones have reversed dd-mm (are actually 5 and 6 Nov)
        'Denmark/DCGC-12020/2020'  : "2020-03-30", # this sequence is identical to other Danish seqs with sample date of Oct/Nov..
        'Netherlands/NB-EMC-279/2020'   : "2020-05-08", # seems to be date reversal of day/month
        'Italy/APU-IZSPB_321PT/2020'    : "2020-04-11", # seems to be date reversal of day/month
        'Tunisia/4107/2020' : "2020-03-18", # date seems to be wrong based on divergence
        'Tunisia/3942/2020' : "2020-03-16", # date seems to be wrong based on divergence
        'Australia/QLD1278/2020'    : "2020-03-21", #seems to be wrong date - far too diverged
        'Australia/QLD1276/2020'    : "2020-03-21", # seems to be wrong date - far too diverged
        'Sweden/20-08979/2020'  : "2020-04-06", # too divergent compared to date (seems to be day/month reversed)

        'Spain/IB-IBV-99010753/2020'    : "2020-04-21", # temporarily excluded as early date doesn't match divergence - EU1
        'Spain/IB-IBV-99010754/2020'    : "2020-04-22", # temporarily excluded as early date doesn't match divergence - EU1
        'Spain/IB-IBV-99010756/2020'    : "2020-05-11", # temporarily excluded as early date doesn't match divergence - EU1
        'Spain/IB-IBV-99010769/2020'    : "2020-06-18", # temporarily excluded as early date doesn't match divergence - EU2
        'Spain/IB-IBV-99010761/2020'    : "2020-05-29", # temporarily excluded as early date doesn't match divergence - EU2

        'Italy/LAZ-INMI-92/2020' : "2010-10-26", # year given as 2010
        'Italy/LAZ-INMI-93/2020' : "2010-10-26", # year given as 2010
        'Italy/LAZ-INMI-94/2020' : "2010-10-27", # year given as 2010
        'Italy/LAZ-INMI-95/2020' : "2010-10-27" # year given as 2010

        #'bat/Yunnan/RaTG13/2013'    : "2013-07-24" #this is RatG13 - legit, but looks weird in table
        #'bat/Yunnan/RmYN02/2019'    : "2019-06-25" # bat sequence - legit but looks weird
    }

    for key, value in bad_seqs.items():
        bad_seq = meta[meta['strain'].isin([key])]
        if bad_seq.date.values[0] == value and key in wanted_seqs:
            wanted_seqs.remove(key)
    



    cluster_meta = meta[meta['strain'].isin(wanted_seqs)]
    # remove those with bad dates
    cluster_meta = cluster_meta[cluster_meta['date'].apply(lambda x: len(x) == 10)]
    cluster_meta = cluster_meta[cluster_meta['date'].apply(lambda x: 'XX' not in x)]

    #re-set wanted_seqs
    wanted_seqs = list(cluster_meta['strain']) 
    observed_countries = [x for x in cluster_meta['country'].unique()]

    print(len(wanted_seqs)) # how many are there?

    # What countries do sequences in the cluster come from?
    print(f"The cluster is found in: {observed_countries}")


    # Let's get some summary stats on number of sequences, first, and last, for each country.
    country_info = pd.DataFrame(index=all_countries, columns=['first_seq', 'num_seqs', 'last_seq', "sept_aug_freq"])
    country_dates = {}
    cutoffDate = datetime.datetime.strptime("2020-08-01", '%Y-%m-%d')

    for coun in all_countries:
        if coun in uk_countries:
            temp_meta = cluster_meta[cluster_meta['division'].isin([coun])]
        else:
            temp_meta = cluster_meta[cluster_meta['country'].isin([coun])]
        country_info.loc[coun].first_seq = temp_meta['date'].min()
        country_info.loc[coun].last_seq = temp_meta['date'].max()
        country_info.loc[coun].num_seqs = len(temp_meta)

        country_dates[coun] = [datetime.datetime.strptime(dat, '%Y-%m-%d') for dat in temp_meta['date']]

        herbst_dates = [x for x in country_dates[coun] if x >= cutoffDate]
        if coun in uk_countries:
            temp_meta = meta[meta['division'].isin([coun])]
        else:
            temp_meta = meta[meta['country'].isin([coun])]
        all_dates = [datetime.datetime.strptime(x, '%Y-%m-%d') for x in temp_meta["date"] if len(x) is 10 and "-XX" not in x and datetime.datetime.strptime(x, '%Y-%m-%d') >= cutoffDate]
        #country_info.loc[coun].sept_aug_freq = round(len(herbst_dates)/len(all_dates),2)

    print(f"\nCluster {clus}")
    print(country_info)
    print("\n\n")
    clusters[clus]['country_info'] = copy.deepcopy(country_info)

    # Get counts per week for sequences in the cluster
    clus_week_counts = {}
    for coun in all_countries:
        counts_by_week = defaultdict(int)
        for dat in country_dates[coun]:
            #counts_by_week[dat.timetuple().tm_yday//7]+=1 # old method
            counts_by_week[(dat.isocalendar()[1]//2*2)]+=1  #returns ISO calendar week
        clus_week_counts[coun] = counts_by_week

    # Get counts per week for sequences regardless of whether in the cluster or not - from week 20 only.
    total_week_counts = {}
    for coun in all_countries:
        counts_by_week = defaultdict(int)
        if coun in uk_countries:
            temp_meta = meta[meta['division'].isin([coun])]
        else:
            temp_meta = meta[meta['country'].isin([coun])]
        #week 20
        for ri, row in temp_meta.iterrows():
            dat = row.date
            if len(dat) is 10 and "-XX" not in dat: # only take those that have real dates
                dt = datetime.datetime.strptime(dat, '%Y-%m-%d')
                #exclude sequences with identical dates & underdiverged
                if coun == "Ireland" and dat == "2020-09-22":
                    continue
                # wk = dt.timetuple().tm_yday//7  # old method
                wk = dt.isocalendar()[1]//2*2 #returns ISO calendar week
                if wk >= 20:
                    counts_by_week[wk]+=1
        total_week_counts[coun] = counts_by_week

    # Convert into dataframe
    cluster_data = pd.DataFrame(data=clus_week_counts)
    total_data = pd.DataFrame(data=total_week_counts)

    # sort
    total_data=total_data.sort_index()
    cluster_data=cluster_data.sort_index()

    clusters[clus]['cluster_data'] = copy.deepcopy(cluster_data)

print("\n\nYou can check on the country_info with: clusters['S477']['country_info'] ")

clusters_tww = []
for clus in clusters.keys():
    c_i = clusters[clus]['country_info']
    c_i[c_i['num_seqs'] > 10]
    print(f"Countries with >10 seqs in cluster {clus}:")
    print("\t", ", ".join(c_i[c_i['num_seqs'] > 10].index))
    if len(c_i[c_i['num_seqs'] > 10]) > 0 and clus != "DanishCluster":
        clusters_tww.append(clus)
    print("")

#fix cluster order in a list so it's reliable
clus_keys = [x for x in clusters.keys() if x in clusters_tww]

my_df = [clusters[x]["country_info"] for x in clus_keys]
all_num_seqs = pd.concat([x.loc[:,"num_seqs"] for x in my_df],axis=1)
all_num_seqs.columns = clus_keys

has10 = []
has10_countries = []
for index, row in all_num_seqs.iterrows():
    if any(row > 20) and index not in uk_countries:
        has10.append("*")
        has10_countries.append(index)
    else:
        has10.append("")

all_num_seqs["has_20"] = has10

print("Countries who have more than 20 in any cluster:", has10_countries, "\n")
print(all_num_seqs)




orig_clus_keys = copy.deepcopy(clus_keys)

# DO NOT PLOT 69 AS IT OVERLAPS WITH 439 AND 501!!!!
clus_keys = [x for x in clus_keys if x is not "S69"]

############## Plot

countries_to_plot = all_num_seqs[all_num_seqs.has_20 == "*"].index
#countries_to_plot = ["France", "United Kingdom", "Netherlands",
#    "Switzerland", "Belgium", "Spain", "Norway", "Ireland", "Denmark", "Czech Republic"]
#Remember to adjust the number of axes if needed below....


country_week = {clus: {} for clus in clusters}

#fig, ax1 = plt.subplots(nrows=1,figsize=(10,7))
fs = 14
rws = int(np.ceil((len(countries_to_plot)+1)/2))
fig, axs = plt.subplots(nrows=rws, #len(countries_to_plot)+1, 
    ncols=2, sharex=True,figsize=(9,11))

week_as_dates = {}


#for coun in [x for x in countries_to_plot]:
for coun, ax in zip(countries_to_plot, fig.axes[1:]): #axs[1:]):
    i=0
    first_clus_count = []
    ptchs = []

    for clus in clus_keys:#clusters.keys():
        cluster_data = clusters[clus]['cluster_data']
        if coun not in cluster_data:
            i+=1
            continue
        week_as_date, cluster_count, total_count = non_zero_counts(cluster_data, total_data, coun)

        week_as_dates[coun] = week_as_date


        country_week[clus][coun] = cluster_count/total_count

        linesty = '-'
        lab = clusters[clus]["display_name"] #f"{clus}"
        if i == 0:
            first_clus_count = [0] * len(cluster_count)
        #if i == 1:
        #    linesty = ':'
        cluster_count = first_clus_count + cluster_count #unindented

        ax.fill_between(week_as_date, first_clus_count/total_count, cluster_count/total_count, facecolor=clusters[clus]['col'])
        patch = mpatches.Patch(color=clusters[clus]['col'], label=lab)

        ptchs.append(patch)
        if i == len(clus_keys)-1: # len(clusters)-1 :
            ax.fill_between(week_as_date, cluster_count/total_count, 1, facecolor=grey_color)
            patch = mpatches.Patch(color=grey_color, label=f"other")
            ptchs.append(patch)
        #if i == 0:
        first_clus_count = cluster_count # unindented
        i+=1
    ax.text(datetime.datetime(2020,6,1), 0.7, coun, fontsize=fs)
    ax.tick_params(labelsize=fs*0.8)
    #ax.set_ylabel('frequency')
    #ax.legend(ncol=1, fontsize=fs*0.8, loc=2)

fig.axes[0].legend(handles=ptchs, loc=3, fontsize=fs*0.7, ncol=3)
fig.axes[0].axis('off')
fig.autofmt_xdate(rotation=30)
plt.show()
plt.tight_layout()

plt.savefig(overall_trends_figs_path+f"EUClusters_compare.png")

plt.savefig(figure_path+f"EUClusters_compare.{fmt}")
trends_path = figure_path+f"EUClusters_compare.{fmt}"
copypath = trends_path.replace("compare", "compare-{}".format(datetime.date.today().strftime("%Y-%m-%d")))
copyfile(trends_path, copypath)


#for clus in clusters.keys():
#    for coun in countries_to_plot:
#        print(clus, coun, len(country_week[clus][coun]))