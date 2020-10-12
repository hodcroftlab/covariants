# Run this script from within 'ncov'

#TLDR: make sure 'ncov' and 'cluster_scripts' repos are in same directory
# 'ncov_cluster' should also be there - or create empty folder to match paths below

######### WHAT INPUT FILES
# You need an up-to-date metadata.tsv file and ncov/results/sequence-diagnostics.tsv file
# You can get these by downloading the most recent run from AWS (see slack #ncov-gisaid-updates for the command)
# Or by running an ncov build locally/on cluster until sequence-diagnostics.tsv is generated
# Ensure these two files are in the ncov directory where you're running from.

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
fmt = "pdf"

import pandas as pd
import datetime
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from shutil import copyfile
from collections import defaultdict
from matplotlib.patches import Rectangle
from colors_and_countries import *
from travel_data import *

# n is the number of observations
# x is the number of times you see the mutation
# Distributions.Beta(a,b) is the Beta distribution
# cdf is the cumulative distribution function (of the Beta distribution in this case)
def bernoulli_estimator(x,n, dp=0.10):
    from scipy.stats import beta
    naivemean = x/n
    estmean = (x+0.5)/(n+1)
    a = x + 0.5
    b = n - x + 0.5
    #
    lowerbound = 0.
    while beta.cdf(lowerbound, a, b) < dp:
        lowerbound += 0.01
    #
    higherbound = 1.
    while beta.cdf(higherbound, a, b) > 1-dp:
        higherbound -= 0.01

    return naivemean, max(0,naivemean-lowerbound), max(0, higherbound-naivemean)


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
snps = [22226, 28931, 29644] #now excludes 6285

# Other clusters I wanted to compare against:
# snps = [9129, 28867] # another cluster - but mostly swiss, no pattern
# snps = [3098, 4959] # another cluster = the diverged C->T one, no pattern <- potentially most interesting tho
# snps = [15971, 28758] # mixed serbian latvian swiss cluster, no pattern
# snps = [22991] #4542] #26875] #S 477N - filer Europe only, below
# snps = [22991, 7539] #australia version

# get the sequences that we want - which are 'part of the cluster:
wanted_seqs = []

for index, row in diag.iterrows():
    strain = row['strain']
    snplist = row['all_snps']
    if not pd.isna(snplist):
        intsnp = [int(x) for x in snplist.split(',')]
        if all(x in intsnp for x in snps):
            #if meta.loc[meta['strain'] == strain].region.values[0] == "Europe":
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
observed_countries = [x for x in cluster_meta['country'].unique()]

# What countries do sequences in the cluster come from?
print(f"The cluster is found in: {observed_countries}")


# Let's get some summary stats on number of sequences, first, and last, for each country.
country_info = pd.DataFrame(index=all_countries, columns=['first_seq', 'num_seqs', 'last_seq'])
country_dates = {}

for coun in all_countries:
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

for coun in all_countries:
    X,Y = np.unique(country_dates[coun], return_counts=True)
    plt.plot(X,Y, color=country_styles[coun]['c'],
        linestyle=country_styles[coun]['ls'], label=coun)
plt.legend()
plt.show()


# We want to look at % of samples from a country that are in this cluster
# To avoid the up-and-down of dates, bin samples into weeks
countries_to_plot = country_list
acknowledgement_table = []
# Get counts per week for sequences in the cluster
clus_week_counts = {}
for coun in all_countries:
    counts_by_week = defaultdict(int)
    for dat in country_dates[coun]:
        #counts_by_week[dat.timetuple().tm_yday//7]+=1 # old method
        counts_by_week[dat.isocalendar()[1]]+=1  #returns ISO calendar week
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
            # wk = dt.timetuple().tm_yday//7  # old method
            wk = dt.isocalendar()[1] #returns ISO calendar week
            if wk >= 20:
                counts_by_week[wk]+=1
                acknowledgement_table.append([row.strain, row.gisaid_epi_isl, row.originating_lab, row.submitting_lab, row.authors])
    total_week_counts[coun] = counts_by_week

with open('../cluster_scripts/acknowledgement_table.tsv', 'w') as fh:
    fh.write('#strain\tEPI_ISOLATE_ID\tOriginating lab\tsubmitting lab\tauthors\n')
    for d in acknowledgement_table:
        fh.write('\t'.join(d)+'\n')


# Convert into dataframe
cluster_data = pd.DataFrame(data=clus_week_counts)
total_data = pd.DataFrame(data=total_week_counts)

# sort
total_data=total_data.sort_index()
cluster_data=cluster_data.sort_index()

# Make a plot
#fig = plt.figure(figsize=(10,5))
#fig, axs=plt.subplots(1,1, figsize=(10,5))
fs = 14
fig, (ax1, ax2, ax3) = plt.subplots(nrows=3, sharex=True,figsize=(10,7),
                                    gridspec_kw={'height_ratios':[1,1,3]})

i=0
for coun in [x for x in countries_to_plot if x not in ['Italy', 'Netherlands', 'Belgium', 'Germany', 'Hong Kong', 'Ireland']]:
    if coun in q_free_to_spain:
        q_times = q_free_to_spain[coun]
        strt = datetime.datetime.strptime(q_times["start"], "%Y-%m-%d")
        end = datetime.datetime.strptime(q_times["end"], "%Y-%m-%d")
        y_start = i*0.022
        height = 0.02
        ax1.add_patch(Rectangle((strt,y_start), end-strt, height,
                      ec=country_styles[coun]['c'], fc=country_styles[coun]['c']))
        ax1.text(strt, y_start+0.002, q_times["msg"], fontsize=fs*0.8)
    i=i+1
ax1.set_ylim([0,y_start+height])
ax1.text(datetime.datetime.strptime("2020-05-10", "%Y-%m-%d"), y_start-height,
         "Travel to Spain", fontsize=fs)
ax1.get_yaxis().set_visible(False)

i=0
for coun in [x for x in countries_to_plot if x not in ['Italy', 'Netherlands', 'Belgium', 'Germany', 'Hong Kong', 'Ireland']]:
    if coun in q_free_to_other:
        print("plot {}".format(coun))
        q_times = q_free_to_other[coun]
        strt = datetime.datetime.strptime(q_times["start"], "%Y-%m-%d")
        end = datetime.datetime.strptime(q_times["end"], "%Y-%m-%d")
        y_start = i*0.022
        height = 0.02
        ax2.add_patch(Rectangle((strt,y_start), end-strt, height,
                      ec=country_styles[coun]['c'], fc=country_styles[coun]['c']))
        ax2.text(strt, y_start+0.002, q_times["msg"], fontsize=fs*0.8)
    i=i+1
ax2.text(datetime.datetime.strptime("2020-05-10", "%Y-%m-%d"), y_start-height,
         "Travel to/from the UK", fontsize=fs)
ax2.set_ylim([0,y_start+height])
ax2.get_yaxis().set_visible(False)
# ax2.set_axis_off()

def non_zero_counts(cluster_data, country):

    cluster_and_total = pd.concat([cluster_data[country], total_data[country]], axis=1).fillna(0)
    with_data = cluster_and_total.iloc[:,1]>0

    #this lets us plot X axis as dates rather than weeks (I struggle with weeks...)
    week_as_date = [ datetime.datetime.strptime("2020-W{}-1".format(x), '%G-W%V-%u')
                     for x in cluster_and_total.index[with_data] ]
    #plt.plot(weeks.index[with_data], weeks.loc[with_data].iloc[:,0]/(total[with_data]), 'o', color=palette[i], label=coun, linestyle=sty)
    cluster_count = cluster_and_total[with_data].iloc[:,0]
    total_count = cluster_and_total[with_data].iloc[:,1]

    return week_as_date, np.array(cluster_count), np.array(total_count)


def marker_size(n):
    if n>100:
        return 150
    elif n>30:
        return 100
    elif n>10:
        return 70
    elif n>3:
        return 50
    elif n>1:
        return 20
    else:
        return 5

#for a simpler plot of most interesting countries use this:
for coun in [x for x in countries_to_plot if x not in ['Italy', 'Netherlands', 'Belgium', 'Germany', 'Hong Kong', 'Ireland']]:
    week_as_date, cluster_count, total_count = non_zero_counts(cluster_data, coun)

    ax3.plot(week_as_date, cluster_count/total_count,
             color=country_styles[coun]['c'],
             linestyle=country_styles[coun]['ls'], label=coun)
    ax3.scatter(week_as_date, cluster_count/total_count, s=[marker_size(n) for n in total_count],
             color=country_styles[coun]['c'],
             linestyle=country_styles[coun]['ls'])

for ni,n in enumerate([0,1,3,10,30,100]):
    ax3.scatter([week_as_date[0]], [0.08+ni*0.07], s=marker_size(n+0.1), edgecolor='k', facecolor='w')
    ax3.text(week_as_date[1], 0.06+ni*0.07, f"n>{n}" if n else "n=1")
    #          color=country_styles[coun]['c'], linestyle=country_styles[coun]['ls'], label=coun)


plt.legend(ncol=1, fontsize=fs*0.8, loc=2)
fig.autofmt_xdate(rotation=30)
ax3.tick_params(labelsize=fs*0.8)
ax3.set_ylabel('frequency')
plt.show()
plt.tight_layout()

#spain opens borders
ax3.text(datetime.datetime.strptime("2020-06-21", "%Y-%m-%d"), 0.05,
         "Spain opens borders", rotation='vertical', fontsize=fs*0.8)


plt.savefig(figure_path+f"overall_trends.{fmt}")
trends_path = figure_path+f"overall_trends.{fmt}"
copypath = trends_path.replace("trends", "trends-{}".format(datetime.date.today().strftime("%Y-%m-%d")))
copyfile(trends_path, copypath)

#############################################
#############################################
# Figure for growth rate estimates
#

def logistic(x, a, t50):
    return np.exp((x-t50)*a)/(1+np.exp((x-t50)*a))

def fit_logistic(days, cluster, total):
    from scipy.optimize import minimize

    def cost(P, t, k, n):
        a, t50 = P
        prob = np.minimum(0.98,np.maximum(1e-2,logistic(t, a, t50)))
        return -np.sum(k*np.log(prob) + (n-k)*np.log(1-prob))

    sol = minimize(cost, [0.08, np.max(days)], args=(days, cluster, total))
    return sol

fig = plt.figure()
from scipy.stats import scoreatpercentile
rates = {}
n_bootstraps=100
#for a simpler plot of most interesting countries use this:
for coun in ['Switzerland', 'England', 'Scotland', 'Wales', 'Spain', 'United Kingdom']:
    week_as_date, cluster_count, total_count = non_zero_counts(cluster_data, coun)
    days = np.array([x.toordinal() for x in week_as_date])
    mean_upper_lower = []
    for x, n in zip(cluster_count, total_count):
        mean_upper_lower.append(bernoulli_estimator(x,n))
    mean_upper_lower = np.array(mean_upper_lower)

    # plt.plot(week_as_date, mean_upper_lower[:,0],
    #              marker='o', color=palette[i], label=coun, linestyle=sty)
    # plt.errorbar(week_as_date, mean_upper_lower[:,0], yerr=mean_upper_lower[:,1:].T,
    plt.plot(week_as_date, mean_upper_lower[:,0],
                 marker='o',
                 color=country_styles[coun]['c'],
                 linestyle=country_styles[coun]['ls'])

    center_fit = fit_logistic(days, cluster_count, total_count)
    rates[coun] = {'center':center_fit['x'][0]}
    bootstraps = []
    for n in range(n_bootstraps):
        # NOTE: bootstrap weeks to estimate confidence
        ind = np.random.randint(len(cluster_count), size=len(cluster_count))
        fit = fit_logistic(days[ind], cluster_count[ind], total_count[ind])
        bootstraps.append(fit['x'][0])
    rates[coun]['bootstraps'] = bootstraps
    rates[coun]['lower'] = scoreatpercentile(bootstraps, 25)
    rates[coun]['upper'] = scoreatpercentile(bootstraps, 75)
    rates[coun]['t50'] = center_fit['x'][1]

    if coun is not 'United Kingdom':
        plt.plot(week_as_date, logistic(days, center_fit['x'][0], center_fit['x'][1]),
                 c=country_styles[coun]['c'], ls=country_styles[coun]['ls'],
                 label = f"{coun}, growth rate: {rates[coun]['center']*700:1.1f}({rates[coun]['lower']*700:1.1f}-{rates[coun]['upper']*700:1.1f})%/week")
    print(f"{coun} growth rate: {rates[coun]['center']*700:1.2f}% per week")

plt.legend()
fig.autofmt_xdate(rotation=30)
plt.ylabel('frequency')
plt.tight_layout()
plt.savefig(figure_path+f'logistic_fits.{fmt}')

#############################################
#############################################
#############################################
#############################################
### Now let's plot overall case trends against number of sequences, & number of sequences in the cluster.
# Let's do this just for Spain, Switzerland, Norway, UK - as they have most sequences in cluster.

#For the this part, plotting case data, files are assumed to be in 'sister' repo 'cluster_scripts',
# with this format:
case_data_path = "../cluster_scripts/country_case_data/"
case_files = {'Spain': 'Spain.tsv', 'Norway': 'Norway.tsv', 'Switzerland': 'Switzerland.tsv',
                'United Kingdom': 'United Kingdom of Great Britain and Northern Ireland.tsv'}

seqs_week = {}
cases_week = {}

for coun in ['Switzerland', 'Spain', 'United Kingdom', 'Norway']:
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
    week_as_date, cluster_count, total_count = non_zero_counts(cluster_data, coun)
    # convert week numbers back to first day of that week - so that X axis is real time rather than weeks
    case_week_as_date = [ datetime.datetime.strptime("2020-W{}-1".format(x), '%G-W%V-%u') for x in case_data.index ]
    days = np.array([x.toordinal() for x in case_week_as_date])

    #PLOT
    lines = []
    fig, ax1 = plt.subplots()
    plt.title(coun)
    color='tab:blue'
    ax1.set_ylabel('New Cases', color=color)
    lines.append(ax1.plot(case_week_as_date , case_data[coun], color=color, label='cases per week')[0])
    if coun is not 'Norway':
        lines.append(ax1.plot(case_week_as_date , case_data[coun]*(1 - logistic(days, rates[coun]['center'], rates[coun]['t50']) ), color=color, ls='--', label='cases per week w/o cluster')[0])
    ax1.tick_params(axis='y', labelcolor=color)
    ax1.set_yscale("log")

    ax2 = ax1.twinx()  # instantiate a second axes that shares the same x-axis
    color = 'tab:red'
    ax2.set_ylabel('Sequences', color=color)
    #ax2.plot(week_as_date, weeks.loc[with_data].iloc[:,0]/(total[with_data]), 'o', color=color, label=coun, linestyle=sty)
    lines.append(ax2.plot(week_as_date, total_count, 'o', label='total sequences',
            color=color, linestyle='-')[0])
    lines.append(ax2.plot(week_as_date, cluster_count, 'o', color="purple", label="sequences in cluster", linestyle='-')[0])
    ax2.tick_params(axis='y', labelcolor=color)
    ax2.set_yscale("log")

    fig.autofmt_xdate(rotation=30)
    if coun is 'Norway':
        plt.legend(lines, ['cases per week', 'total sequences', 'sequences in cluster'], loc=3)
    else:
        plt.legend(lines, ['cases per week', 'cases per week w/o cluster', 'total sequences', 'sequences in cluster'], loc=3)
    fig.tight_layout()
    plt.show()
    plt.savefig(figure_path+f"{coun}-newcases-seqs.{fmt}")




##############################
##############################
##############################

### Early plotting trials for fig 2 (proportion over time)

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
