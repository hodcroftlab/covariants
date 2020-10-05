# Run this script from within 'ncov'

#TLDR: make sure 'ncov' and 'cluster_scripts' repos are in same directory
# 'ncov_cluster' should also be there - or create empty folder to match paths below

######### WHAT INPUT FILES
# You need an up-to-date metadata.tsv file and ncov/results/sequence-diagnostics.tsv file
# You can get these by downloading the most recent run from AWS (see slack #ncov-gisaid-updates for the command)
# Or by running an ncov build locally/on cluster until sequence-diagnostics.tsv is generated
# Ensure these two files are in the ncov directory where you're running from.

#For the second part, plotting case data, files are assumed to be in 'sister' repo 'cluster_scripts',
# with this format:
case_data_path = "../cluster_scripts/country_case_data/"
case_files = {'Spain': 'Spain.tsv', 'Norway': 'Norway.tsv', 'Switzerland': 'Switzerland.tsv',
                'United Kingdom': 'United Kingdom of Great Britain and Northern Ireland.tsv'}

######### WHERE FILES WRITE OUT
# If you want to output files to run in `ncov_cluster` to make cluster-focused builds,
# clone this repo so it sits 'next' to ncov: https://github.com/emmahodcroft/ncov_cluster
# and use these paths:
clusterlist_output = '../ncov_cluster/cluster_profile/clusters/cluster_clusone.txt'
out_meta_file = '../ncov_cluster/cluster_profile/cluster_info/cluster_meta.tsv'

# Things that write out to cluster_scripts repo (images mostly), use this path:
figure_path = "../cluster_scripts/figures/"
# This assumes that `cluster_scripts`` also sites 'next to ' `ncov`

# Otherwise, modify the paths above to put the files wherever you like.
# (Alternatively just create a folder structure to mirror the above)

import pandas as pd
import datetime
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from shutil import copyfile
from collections import defaultdict
from matplotlib.patches import Rectangle

# Get diagnostics file - used to get list of SNPs of all sequences, to pick out seqs that have right SNPS
diag_file = "results/sequence-diagnostics.tsv"
diag = pd.read_csv(diag_file, sep='\t', index_col=False)
# Read metadata file
input_meta = "data/metadata.tsv"
meta = pd.read_csv(input_meta, sep='\t', index_col=False)

########

# Define SNPs that will determine what's in our cluster
# Originally I used all 6 SNPs to define - but better to use 4 and grab 'nearby' seqs

#need to subtract 1 for 0-based numbering in diagnositcs script
# real mutations are : 445, 6286, 22227, 26801, 28932, 29645
#snps = [444, 6285, 22226, 26800, 28931, 29644]
snps = [6285, 22226, 28931, 29644]

# Other clusters I wanted to compare against:
# snps = [9129, 28867] # another cluster - but mostly swiss, no pattern
# snps = [3098, 4959] # another cluster = the diverged C->T one, no pattern <- potentially most interesting tho
# snps = [15971, 28758] # mixed serbian latvian swiss cluster, no pattern

# get the sequences that we want - which are 'part of the cluster:
wanted_seqs = []

for index, row in diag.iterrows():
    snplist = row['all_snps']
    if not pd.isna(snplist):
        intsnp = [int(x) for x in snplist.split(',')]
        if all(x in intsnp for x in snps):
            wanted_seqs.append(row['strain'])

# There's one spanish seq with date of 7 March - we think this is wrong. 
# If seq there and date bad - exclude!
bad_seq = meta[meta['strain'].isin(['Spain/VC-IBV-98006466/2020'])]
if bad_seq.date.values[0] == "2020-03-07" and 'Spain/VC-IBV-98006466/2020' in wanted_seqs:
    wanted_seqs.remove('Spain/VC-IBV-98006466/2020')

print(len(wanted_seqs)) # how many are there?


# Write out a file of the names of those 'in the cluster' - this is used by ncov_cluster
# to make a ncov run where the 'focal' set is this cluster.
with open(clusterlist_output, 'w') as f:
    for item in wanted_seqs:
        f.write("%s\n" % item)

# Copy file with date, so we can compare to prev dates if we want...
copypath = clusterlist_output.replace("clusone", "clusone-{}".format(datetime.date.today().strftime("%Y-%m-%d")))
copyfile(clusterlist_output, copypath)

# Just so we have the data, write out the metadata for these sequences
cluster_meta = meta[meta['strain'].isin(wanted_seqs)]
cluster_meta.to_csv(out_meta_file,sep="\t",index=False)

# What countries do sequences in the cluster come from?
country_list = cluster_meta['country'].unique()
print("The cluster is found in: {}".format([x for x in country_list]))

#separate out Scotland, England, NI, Wales...
uk_countries = ['Scotland', 'England', 'Wales', 'Northern Ireland']
country_uk_list = country_list.tolist()
country_uk_list.extend(uk_countries)

# Let's get some summary stats on number of sequences, first, and last, for each country.
country_info = pd.DataFrame(index=country_uk_list, columns=['first_seq', 'num_seqs', 'last_seq'])
country_dates = {}

for coun in country_uk_list:
    if coun in uk_countries:
        temp_meta = cluster_meta[cluster_meta['division'].isin([coun])]
    else:
        temp_meta = cluster_meta[cluster_meta['country'].isin([coun])]
    country_info.loc[coun].first_seq = temp_meta['date'].min()
    country_info.loc[coun].last_seq = temp_meta['date'].max()
    country_info.loc[coun].num_seqs = len(temp_meta)

    country_dates[coun] = [datetime.datetime.strptime(dat, '%Y-%m-%d') for dat in temp_meta['date']]

print(country_info)


# Plot simple lines over time per country - very basic.
# (For some other clusters, easier to set color manually)
    #palette = sns.color_palette("tab10", 5)

# For the main cluster, ran out of colors... try this hack.
palette = sns.color_palette("tab10", round(len(country_list)/2))
palette.extend(palette)

i = 0
for coun in country_list:
    sty="solid"
    if i > round(len(country_list)/2):
        sty="dashed"
    X,Y = np.unique(country_dates[coun], return_counts=True)
    plt.plot(X,Y, color=palette[i], label=coun, linestyle=sty)
    i=i+1
plt.legend()
plt.show()


# We want to look at % of samples from a country that are in this cluster
# To avoid the up-and-down of dates, bin samples into weeks

country_list = country_uk_list

# Get counts per week for sequences in the cluster
clus_week_counts = {}
for coun in country_list:
    counts_by_week = defaultdict(int)
    for dat in country_dates[coun]:
        #counts_by_week[dat.timetuple().tm_yday//7]+=1 # old method
        counts_by_week[dat.isocalendar()[1]]+=1  #returns ISO calendar week
    clus_week_counts[coun] = counts_by_week

# Get counts per week for sequences not in the cluster - from week 20 only.
other_week_counts = {}
for coun in country_list:
    counts_by_week = defaultdict(int)
    if coun in uk_countries:
        temp_meta = meta[meta['division'].isin([coun])]
    else:
        temp_meta = meta[meta['country'].isin([coun])]
    #week 20
    for dat in temp_meta['date']:
        if len(dat) is 10 and "-XX" not in dat: # only take those that have real dates
            dt = datetime.datetime.strptime(dat, '%Y-%m-%d')
            # wk = dt.timetuple().tm_yday//7  # old method
            wk = dt.isocalendar()[1] #returns ISO calendar week
            if wk >= 20:
                counts_by_week[wk]+=1
    other_week_counts[coun] = counts_by_week

# Convert into dataframe
cluster_data = pd.DataFrame(data=clus_week_counts)
other_data = pd.DataFrame(data=other_week_counts)

# sort
other_data=other_data.sort_index()
cluster_data=cluster_data.sort_index()

# Make a plot
#fig = plt.figure(figsize=(10,5))
#fig, axs=plt.subplots(1,1, figsize=(10,5))
fig, (ax1, ax2, ax3) = plt.subplots(nrows=3, sharex=True,figsize=(10,7), gridspec_kw={'height_ratios':[1,1,3]})

#quarantine free travel to spain:
q_free_to_spain = { 
    "United Kingdom": {"start": "2020-07-10", "end": "2020-07-26"},
    "Norway": {"start": "2020-07-15", "end": "2020-07-25"},
    "Switzerland": {"start": "2020-06-15", "end": "2020-08-10"},
    "Latvia": {"start": "2020-07-01", "end": "2020-07-17"},
    "France": {"start": "2020-06-15", "end": "2020-10-05"}
}

q_free_to_UK = {
    "Latvia": {"start": "2020-07-01", "end": "2020-08-14"},
    "France": {"start": "2020-06-15", "end": "2020-10-05"},
    "Norway": {"start": "2020-07-15", "end": "2020-08-21"},
    "Switzerland": {"start": "2020-06-15", "end": "2020-09-28"},
}

#note scotland was earlier
q_free_to_swiss = {
    "United Kingdom": {"start": "2020-07-10", "end": "2020-08-29"}
}

i=0
for coun in [x for x in country_list if x not in ['Italy', 'Netherlands', 'Belgium', 'Germany', 'Hong Kong', 'Ireland']]:
    if coun in q_free_to_spain:
        print("plot {}".format(coun))
        q_times = q_free_to_spain[coun]
        strt = datetime.datetime.strptime(q_times["start"], "%Y-%m-%d")
        end = datetime.datetime.strptime(q_times["end"], "%Y-%m-%d")
        y_start = i*0.02
        height = 0.02
        ax1.add_patch(Rectangle((strt,y_start), end-strt, height, ec=palette[i], fc=palette[i]))
    i=i+1
ax1.set_ylim([0,y_start+height])
ax1.text(datetime.datetime.strptime("2020-06-21", "%Y-%m-%d"), 0.08, "Quarantine-free Travel to Spain")

i=0
for coun in [x for x in country_list if x not in ['Italy', 'Netherlands', 'Belgium', 'Germany', 'Hong Kong', 'Ireland']]:
    if coun in q_free_to_UK:
        print("plot {}".format(coun))
        q_times = q_free_to_UK[coun]
        strt = datetime.datetime.strptime(q_times["start"], "%Y-%m-%d")
        end = datetime.datetime.strptime(q_times["end"], "%Y-%m-%d")
        y_start = i*0.02
        height = 0.02
        ax2.add_patch(Rectangle((strt,y_start), end-strt, height, ec=palette[i], fc=palette[i]))
    i=i+1
ax2.set_ylim([0,y_start+height])
ax2.text(datetime.datetime.strptime("2020-06-21", "%Y-%m-%d"), 0.08, "Quarantine-free Travel to UK")


i = 0
#for a simpler plot of most interesting countries use this:
for coun in [x for x in country_list if x not in ['Italy', 'Netherlands', 'Belgium', 'Germany', 'Hong Kong', 'Ireland']]:
#for coun in country_list:
    sty="solid"
    #if i > len(country_list)/2:
    if i > 5:
        sty="dashed"
    if coun in uk_countries:
        sty=":"
    weeks = pd.concat([cluster_data[coun], other_data[coun]], axis=1).fillna(0)
    total = weeks.sum(axis=1)
    with_data = total>0
    
    #this lets us plot X axis as dates rather than weeks (I struggle with weeks...)
    week_as_date = [ datetime.datetime.strptime("2020-W{}-1".format(x), '%G-W%V-%u') for x in weeks.index[with_data] ]
    #plt.plot(weeks.index[with_data], weeks.loc[with_data].iloc[:,0]/(total[with_data]), 'o', color=palette[i], label=coun, linestyle=sty)
    ax3.plot(week_as_date, weeks.loc[with_data].iloc[:,0]/(total[with_data]), 'o', color=palette[i], label=coun, linestyle=sty)

    i=i+1
plt.legend()
fig.autofmt_xdate(rotation=30)
plt.show()

#spain opens borders
ax3.text(datetime.datetime.strptime("2020-06-21", "%Y-%m-%d"), 0.05, "Spain opens borders", rotation='vertical')


### Early plotting trials.

# light blue = lightskyblue
# light brown = peru
# light purple = plum
# light green = lightgreen
# light red = lightpink
# light ornage = moccasin

#Uk (england/wales/NI) Q-free-travel to spain
eng_quarFree_start = datetime.datetime.strptime("2020-07-10", "%Y-%m-%d")
eng_quarFree_end = datetime.datetime.strptime("2020-07-26", "%Y-%m-%d")
eng_y_start = 0.02
eng_y_end = 0.05
ax1.add_patch(Rectangle((eng_quarFree_start,eng_y_start), eng_quarFree_end-eng_quarFree_start, eng_y_end, ec='lightskyblue', fc='lightskyblue'))

#swiss q-free-travel to spain
ch_quarFree_start = datetime.datetime.strptime("2020-06-15", "%Y-%m-%d")
ch_quarFree_end = datetime.datetime.strptime("2020-08-10", "%Y-%m-%d") 
ch_y_start = 0.07
ch_y_end = 0.05
ax1.add_patch(Rectangle((ch_quarFree_start,ch_y_start), ch_quarFree_end-ch_quarFree_start, ch_y_end, ec='peru', fc='peru'))

#norway q-free-travel to spain
no_quarFree_start = datetime.datetime.strptime("2020-07-15", "%Y-%m-%d")
no_quarFree_end = datetime.datetime.strptime("2020-07-25", "%Y-%m-%d")
no_y_start = 0.12
no_y_end = 0.05
ax1.add_patch(Rectangle((no_quarFree_start,no_y_start), no_quarFree_end-no_quarFree_start, no_y_end, ec='lightpink', fc='lightpink'))

#latvia q-free-travel to spain
la_quarFree_start = datetime.datetime.strptime("2020-07-01", "%Y-%m-%d")
la_quarFree_end = datetime.datetime.strptime("2020-07-17", "%Y-%m-%d")
la_y_start = 0.17
la_y_end = 0.05
ax1.add_patch(Rectangle((la_quarFree_start,la_y_start), la_quarFree_end-la_quarFree_start, la_y_end, ec='lightgreen', fc='lightgreen'))

#france Q-free travel to spain
fr_quarFree_start = datetime.datetime.strptime("2020-06-15", "%Y-%m-%d")
fr_quarFree_end = datetime.datetime.strptime("2020-10-05", "%Y-%m-%d")
fr_y_start = 0.22
fr_y_end = 0.05
ax1.add_patch(Rectangle((fr_quarFree_start,fr_y_start), fr_quarFree_end-fr_quarFree_start, fr_y_end, ec='moccasin', fc='moccasin'))


plt.savefig(figure_path+"overall_trends.png")


#############################################
#############################################
#############################################
#############################################
### Now let's plot overall case trends against number of sequences, & number of sequences in the cluster.
# Let's do this just for Spain, Switzerland, Norway, UK - as they have most sequences in cluster.

seqs_week = {}
cases_week = {}

for coun in ['Switzerland', 'United Kingdom', 'Norway', 'Spain']:
    #read in case data
    cases = pd.read_csv(case_data_path+case_files[coun], sep='\t', index_col=False, skiprows=3)

    #instead of total case numbers, get new cases per day, with diff
    new_cases = np.diff(cases.cases)
    # convert dates to datetime objects
    case_dates = [datetime.datetime.strptime(dat, '%Y-%m-%d') for dat in cases.time]
    # remove first date object as the 'np.diff' above shortens the list by 1! now lengths match.
    case_dates = case_dates[1:]

    #to avoid things like no reporting on weekends, get total # new cases per week.
    cases_by_week = defaultdict(int)
    for dat, num_cas in zip(case_dates, new_cases):
        wk = dat.isocalendar()[1] #returns ISO calendar week
        cases_by_week[wk]+=num_cas
    cases_week[coun] = cases_by_week

    case_data = pd.DataFrame(data=cases_week)
    case_data = case_data.sort_index()

    # Now get total number of sequence, per week - by using metadata.tsv from ncov
    counts_by_week = defaultdict(int)
    temp_meta = meta[meta['country'].isin([coun])]
    for dat in temp_meta['date']:
        if len(dat) is 10 and "-XX" not in dat: # only take those that have real dates
            dt = datetime.datetime.strptime(dat, '%Y-%m-%d')
            wk = dt.isocalendar()[1] #returns ISO calendar week
            counts_by_week[wk]+=1
    seqs_week[coun] = counts_by_week

    seqs_data = pd.DataFrame(data=seqs_week)
    seqs_data=seqs_data.sort_index()

    # Only plot sequence data for weeks were data is available (avoid plotting random 0s bc no seqs)
    weeks = pd.concat([cluster_data[coun], seqs_data[coun]], axis=1).fillna(0)
    total = weeks.sum(axis=1)
    with_data = total>0

    # convert week numbers back to first day of that week - so that X axis is real time rather than weeks
    case_week_as_date = [ datetime.datetime.strptime("2020-W{}-1".format(x), '%G-W%V-%u') for x in case_data.index ]
    week_as_date = [ datetime.datetime.strptime("2020-W{}-1".format(x), '%G-W%V-%u') for x in weeks.index[with_data] ]

    #PLOT
    fig, ax1 = plt.subplots()
    plt.title(coun)
    color='tab:blue'
    ax1.set_xlabel('Time')
    ax1.set_ylabel('New Cases', color=color)
    ax1.plot(case_week_as_date , case_data[coun], color=color)
    ax1.tick_params(axis='y', labelcolor=color)
    ax1.set_yscale("log")

    ax2 = ax1.twinx()  # instantiate a second axes that shares the same x-axis
    color = 'tab:red'
    ax2.set_ylabel('Sequences', color=color)
    #ax2.plot(week_as_date, weeks.loc[with_data].iloc[:,0]/(total[with_data]), 'o', color=color, label=coun, linestyle=sty)
    ax2.plot(week_as_date, total[with_data], 'o', color=color, label=coun, linestyle=sty)
    ax2.plot(week_as_date, weeks.loc[with_data].iloc[:,0], 'o', color="purple", label=coun, linestyle=sty)
    ax2.tick_params(axis='y', labelcolor=color)
    ax2.set_yscale("log")

    fig.autofmt_xdate(rotation=30)
    fig.tight_layout()
    plt.show()
    plt.savefig(figure_path+"{}-newcases-seqs.png".format(coun))
