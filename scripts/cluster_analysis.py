# Run this script from within an 'ncov' directory () which is a sister directory to 'covariants'
# See the 'WHERE FILES WRITE OUT' below to see options on modifying file paths
# Importantly, ensure you create a real or fake 'ncov_cluster' output directory - or change it!

# TLDR: make sure 'ncov' and 'covariants' repos are in same directory
# 'ncov_cluster' should also be there - or create empty folder to match paths below

######### INPUT FILES
# This requires one file that cannot be distributed publicly:
# ncov/data/meatdata.tsv (can be downloaded from GISAID as 'nextmeta')

# For Nextstrain members only:
#       You can get these by downloading the most recent run from AWS
#       (see slack #ncov-gisaid-updates for the command)
#       Or by running an `ncov`` build locally/on cluster until sequence-diagnostics.tsv is generated

######### WHERE FILES WRITE OUT
# If you want to output files to run in `ncov_cluster` to make cluster-focused builds,
# clone this repo so it sits 'next' to ncov: https://github.com/emmahodcroft/ncov_cluster
# and use these paths:
cluster_path = "../ncov_cluster/cluster_profile/"

# Things that write out to cluster_scripts repo (images mostly), use this path:
tables_path = "../covariants/cluster_tables/"
overall_tables_file = "../covariants/cluster_tables/all_tables.tsv"
acknowledgement_folder = "../covariants/acknowledgements/"
acknowledgement_folder_new = "../covariants/web/public/acknowledgements/"
web_data_folder = "../covariants/web/data/"
# This assumes that `covariants` sites next to `ncov`
# Otherwise, modify the paths above to put the files wherever you like.
# (Alternatively just create a folder structure to mirror the above)

fmt = "png"  # "pdf"
grey_color = "#cccccc"  # for "other clusters" of country plots


# TODO: What is this needed for?
#dated_limit = "2021-03-31" #only works for Q677 currently
#dated_limit = "2021-07-31"
#dated_cluster = "21A (Delta)"
#dated_cluster = "21I (Delta)"
#dated_cluster = "21J (Delta)"
#dated_cluster = "20I (Alpha, V1)"
dated_cluster = "Q677"
dated_limit = ""

import pandas as pd
import datetime
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from shutil import copyfile
from collections import defaultdict
from matplotlib.patches import Rectangle
import json
import matplotlib.patches as mpatches
from colors_and_countries import *
from helpers import *
from clusters import *
from bad_sequences import *
from approx_first_dates import *
from swiss_regions import *
import os
import re
import time
import sys


# TODO: Figure out whether we still use this, and in which shape
def print_date_alerts_quick(clus):
    print(clus)
    print(f"Expected date: {cluster_first_dates[clus]['first_date']}")
    print(alert_first_date_quick[clus][['strain','date','gisaid_epi_isl']])

def print_all_date_alerts_quick():
    for clus in alert_first_date_quick.keys():
        alert_first_date_quick(clus)
        print("\n")

# Print out bad sequences in a format that can be directly copied over to bad_sequences.py
def print_bad_sequences():
    print()
    for clus in alert_first_date_quick.keys():
        for row in alert_first_date_quick[clus].iterrows():
            print(f"\"{row[1]['strain']}\": \"{row[1]['date']}\", #{clus}, {clus_dates[clus].strftime('%Y-%m-%d')}")
    print("\n")

# Transform (year, month, day) datetime to (year, week) tuple in a two-week interval, starting at this reference Monday
ref_monday = datetime.datetime.strptime("2020-04-27", '%Y-%m-%d').toordinal()
def to2week_ordinal(x):
    n = x.toordinal()
    monday = datetime.date.fromordinal(n - ((n - ref_monday) % 14))
    return (monday.isocalendar()[0], monday.isocalendar()[1]) #TODO: Currently returned as tuple of year & week -> Can we switch to returning datetime? Needs adjustment at several places in the script


# Store early date alarms (only those sequences with Nextstrain clade). This should be enough to capture wrong dates
# from new variants (those will be most likely to have year reversals etc). There is an additional check later
# where also sequences with variants assigned in this script are tested for early dates.
alert_first_date = {}

# store acknoweledgements
acknowledgement_by_variant = {}
acknowledgement_by_variant["acknowledgements"] = {}

acknowledgement_keys = {}
acknowledgement_keys["acknowledgements"] = {}

# set min data week to consider
min_data_week = (2020, 18)  # 20)

##################################
##################################
#### Find out what users want

# TODO: Which of these are still required?
# ask user if they want to write-out files or not:
print_files = False
print_answer = input("\nWrite out files?(y/n) (Enter is no): ")
if print_answer in ["y", "Y", "yes", "YES", "Yes"]:
    print_files = True
print_files2 = True
print(f"Writing out files? {print_files}")

print_acks = False
print_ack_answer = input("\nWrite out acknowledgements?(y/n) (Enter is no): ")
if print_ack_answer in ["y", "Y", "yes", "YES", "Yes"]:
    print_acks = True
print(f"Writing out acknowledgements? {print_acks}")

division = False
division_answer = input("\nDo division for USA & Switzerland?(y/n) (Enter is no): ")
if division_answer in ["y", "Y", "yes", "YES", "Yes"]:
    division = True
    selected_country = ["USA", "Switzerland"]

# default is 222, but ask user what they want - or run all.
clus_to_run = ["EU1"]
reask = True

while reask:
    clus_answer = input(
        "\nWhat cluster to run? (Enter for S222) Type 'all' for all, type 'all mink' for all+mink: "
    )
    if len(clus_answer) != 0:
        if clus_answer in clusters.keys():
            print(f"Using {clus_answer}\n")
            clus_to_run = [clus_answer]
            reask = False
        elif "all" in clus_answer:
            clus_to_run = list(clusters.keys())
            if "mink" in clus_answer or "Mink" in clus_answer:
                clus_to_run.append("mink")
            reask = False
        elif clus_answer == "mink" or clus_answer == "Mink":
            clus_to_run = ["mink"]
        elif "," in clus_answer:
            answer_array = clus_answer.split(",")
            if all([x in clusters.keys() for x in answer_array]):
                print(f"Using {clus_answer}\n")
                clus_to_run = answer_array
                reask = False
            else:
                print(f"Not found. Options are: {clusters.keys()}")
        else:
            print(f"Not found. Options are: {clusters.keys()}")
    else:
        print("Using default of S222\n")
        reask = False
print("These clusters will be run: ", clus_to_run)

# ask user if they want to continue to do the full plotting - mostly we do these days
do_country = False
if "all" in clus_answer:
    print_answer = input("\nContinue to country plotting? (y/n) (Enter is no): ")
    if print_answer in ["y", "Y", "yes", "YES", "Yes"]:
        do_country = True
else:
    print("Can't do country plot as aren't doing 'all' clusters")

if do_country == False:
    print(
        "You can alway run this step by calling `plot_country_data(clusters, proposed_coun_to_plot, print_files)`"
    )

do_divisions_country = False
if "all" in clus_answer:
    print_answer = input(
        "\nContinue to USA- & Swiss-specific country plotting? (y/n) (Enter is no): "
    )
    if print_answer in ["y", "Y", "yes", "YES", "Yes"]:
        do_divisions_country = True

start_time = time.time()

##################################
##################################
#### Prepare output files

json_output = {}

# if running all clusters, clear file so can write again.
if print_files and "all" in clus_answer:
    #empty file to write clean
    with open(overall_tables_file, "w") as fh:
        fh.write("\n")

    curPath = cluster_path + "clusters/current/"
    for f in os.listdir(curPath):
        if os.path.isfile(curPath + f):
            os.remove(curPath + f)

##################################
##################################
#### Prepare various useful dictionaries and do first date check

t0 = time.time()

# Link Nextstrain clade and name to our cluster names used in clusters.py
nextstrain_clade_to_clus = {clusters[clus]["display_name"]: clus for clus in clus_to_run if "display_name" in clusters[clus]}
nextstrain_name_to_clus = {clusters[clus]["nextstrain_name"]: clus for clus in clus_to_run if "nextstrain_name" in clusters[clus]}
# TODO: Might need to add extra entries for "21K.21L" using "other_nextstrain_names"

# Expected earliest date by cluster as taken from approx_first_dates.py
# Instead of using (random) clus names from clusters.py, switch to "display_name" which is the same as "Nextstrain_clade" from metadata
clus_dates = {clusters[clus]["display_name"] : datetime.datetime.strptime(cluster_first_dates[clus]["first_date"], "%Y-%m-%d") for clus in clus_to_run if clus in cluster_first_dates}


# Date check - do a separate metadata pass just for dates
alert_first_date_quick = {} # Collect all strains with too early dates

# Compile a list of all countries found in the metadata
all_countries = []
answer = input("\nCheck for early dates? ") # If skipped, only number of metadata lines and list of countries will be collected
check_dates = answer in ["Y", "y", "Yes", "yes", "YES"]

if check_dates:
    print("\nChecking for early dates...") #Also collect all countries and count lines
else:
    print("\nCollect all countries and count metadata lines...")

# Input metadata file
input_meta = "data/metadata.tsv"
cols = ['strain', 'date', 'division', 'host', 'substitutions', 'deletions', 'Nextstrain_clade', 'country', 'gisaid_epi_isl', 'QC_overall_status']

# Traverse metadata and collect all strains that have date earlier than expected date for their clade
n_total = 0
with open(input_meta) as f:
    header = f.readline().split("\t")
    indices = {c:header.index(c) for c in cols}
    # TODO: is it faster when I create a variable for Nextstrain_clade?
    line = f.readline()
    while line:
        n_total += 1
        l = line.split("\t")
        if l[indices['country']] not in all_countries:
            all_countries.append(l[indices['country']])

        if check_dates:
            if not l[indices['strain']] in bad_seqs or bad_seqs[l[indices['strain']]] != l[indices['date']]:
                # Search for sequences with too early dates - only for Nextstrain_clades
                if l[indices['Nextstrain_clade']] in clus_dates:
                    if len(l[indices['date']]) == 10 and not "X" in l[indices['date']]:
                        date_formatted = datetime.datetime.strptime(l[indices['date']], "%Y-%m-%d")
                        if date_formatted < clus_dates[l[indices['Nextstrain_clade']]]:
                            if l[indices['Nextstrain_clade']] not in alert_first_date_quick:
                                alert_first_date_quick[l[indices['Nextstrain_clade']]] = {'strain': [],'date': [],'gisaid_epi_isl': []}
                            for k in alert_first_date_quick[l[indices['Nextstrain_clade']]]:
                                alert_first_date_quick[l[indices['Nextstrain_clade']]][k].append(l[indices[k]])
        line = f.readline()

t1 = time.time()
print(f"First metadata pass took {round((t1-t0)/60,1)} min to run")

# Print out how many bad seqs were found
# TODO: adjust to Emmas wishes
sequences_exclude = [] # Exclude all sequences newly identified as too early
if check_dates:
    print(f"Checking for early dates took {round((t1-t0)/60,1)} min to run")

    for c in alert_first_date_quick:
        alert_first_date_quick[c] = pd.DataFrame.from_dict(alert_first_date_quick[c])

    if alert_first_date_quick:
        print("\nDate alerts (fast check):")
        print([f"{x}: {len(alert_first_date_quick[x])}" for x in alert_first_date_quick.keys()])
        print("To view, use 'print_all_date_alerts_quick()' or 'print_date_alerts_quick(<clus>)'\n")

        print_answer = input("\nBad dates have been found. Do you want to auto-exclude them for this run and continue (\"n\" is exit program)? ")
        if print_answer in ["n", "N", "no", "NO", "No"]:
            sys.exit("Bad dates found. Exit program...")
        else:
            print_bad_sequences()
            sequences_exclude = [row[1]["strain"] for clus in alert_first_date_quick.values() for row in clus.iterrows()]
    else:
        print("\nNo bad dates found.\n")

##################################
##################################
##### Prepare datastructure

# Collect counts by country & date and various other information, all sorted per cluster
clus_data_all = {}

# Random very early date for max & min date search (just needs to be earlier than any date we might encounter)
earliest_date = datetime.datetime.strptime("2019-01-01", '%Y-%m-%d')
today = datetime.datetime.today() # TODO: is date faster than datetime?
#TODO: Check if items() is better for all my iterations
for clus in clus_to_run:
    clus_data_all[clus] = clusters[clus]
    # Prepare both summary and biweekly counts for all countries TODO: might need to remove unused countries at some point?
    clus_data_all[clus]["summary"] = {c: {'first_seq': today, 'num_seqs': 0, 'last_seq': earliest_date } for c in all_countries}
    clus_data_all[clus]["cluster_counts"] = {c: {} for c in all_countries}

    if clus == "mink":
        clus_data_all[clus]["clus_build_name"] = "mink"
        #clus_data_all[clus]["mink_meta"] = meta[meta["host"].apply(lambda x: x == "Mink")] #TODO: Is this required later? -> #### For all but mink, go through and extract wanted sequences
        #clus_data_all[clus]["wanted_seqs"] = list(clus_data["mink_meta"]["strain"])

        clus_data_all[clus]["clusterlist_output"] = cluster_path + f"/clusters/cluster_mink.txt"
        clus_data_all[clus]["out_meta_file"] = (
            cluster_path + f"/cluster_info/cluster_mink_meta.tsv"
        )

    else:
        clus_data_all[clus]["clus_build_name"] = clusters[clus]["build_name"]
        clus_data_all[clus]["snps"] = clusters[clus]["snps"]
        if "snps2" not in clusters[clus]:
            clus_data_all[clus]["snps2"] = []
        if "gaps" not in clusters[clus]:
            clus_data_all[clus]["gaps"] = []
        if "exclude_snps" not in clusters[clus]:
            clus_data_all[clus]["exclude_snps"] = []

        clus_data_all[clus]["clusterlist_output"] = (
            cluster_path + f'/clusters/cluster_{clusters[clus]["build_name"]}.txt'
        )
        clus_data_all[clus]["out_meta_file"] = (
            cluster_path
            + f'/cluster_info/cluster_{clusters[clus]["build_name"]}_meta.tsv'
        )

##################################
##################################
#### Read and clean metadata line by line
early_dates_no_Nextclade = {}

print("\nReading and cleaning up the metadata line-by-line...\n")
n = 0
with open(input_meta) as f:
    header = f.readline().split("\t")
    indices = {c:header.index(c) for c in cols}

    while True:
        line = f.readline()
        if not line:
            break
        n += 1
        if ((n-1)/n_total) % 0.05 > n/n_total % 0.05:
            print(f"{round(n/n_total * 100)}% complete...")

        l = line.split("\t")

        ##### CLEANING METADATA #####

        #l = [float("NaN") if i == "" else i for i in l] # Fillna # TODO: Do we really need this?

        # If bad seq there  - exclude!
        # Also, if only just identified as bad sequence but not yet in the official list - still exclude
        if l[indices['strain']] in bad_seqs and l[indices['date']] == l[indices['date']] or l[indices['strain']] in sequences_exclude:
            continue

        # Filter for only Host = Human
        if l[indices['host']] != "Human":
            continue

        # Filter only for those without 'bad' and those without '' QC status
        # available values (as of 30 mar 22) are 'bad', 'good', 'mediocre', ''
        # these '' values are likely those where alignment fails
        # as of 30 mar 22, this excludes 466,596 sequences (!) for bad, and 4,781 for ''
        if l[indices['QC_overall_status']] == "bad" or l[indices['QC_overall_status']] == "":
            continue

        # Invalid dates
        if len(l[indices['date']]) != 10 or "X" in l[indices['date']]:
            continue
        # Future dates
        date_formatted = datetime.datetime.strptime(l[indices['date']], "%Y-%m-%d")
        if date_formatted > today:
            print("WARNING! Data from the future!")
            print(f"{l[indices['strain']]}: {l[indices['date']]}")
            continue

        # Replace Swiss divisions with swiss-region, but store original division
        if l[indices['division']] in swiss_regions:
            swiss_division = swiss_regions[l[indices['division']]]

        ##### ASSIGNING CLUSTERS #####

        # If an official Nextstrain clade, then use Nextclade designation to assign them.
        # If not an official Nextstrain clade, use our SNP method
        # TODO: Mink special case

        clus_all = [] #TODO: Does this have to be a list, are several clusters possible per sequence?
        # Use Nextclade
        if l[indices['Nextstrain_clade']] in nextstrain_clade_to_clus:
            clus_all.append(nextstrain_clade_to_clus[l[indices['Nextstrain_clade']]])

        else: #Use SNPS
            muts_snp_pos = [int(y[1:-1]) for y in l[indices['substitutions']].split(',') if y]
            # expand metadata deletions formatting
            muts_del_pos = [z for y in l[indices['deletions']].split(',') if y for z in range(int(y.split("-")[0]), int(y.split("-")[-1]) + 1)]

            # TODO: Did not include "exclude_snps" since none are currently used in clusters.py
            for c in clus_to_run:
                if all([p in muts_snp_pos for p in clus_data_all[c]["snps"]]) and clus_data_all[c]["snps"]:
                    clus_all.append(c)

                if all([p in muts_snp_pos for p in clus_data_all[c]["snps2"]]) and clus_data_all[c]["snps2"]:
                    clus_all.append(c)

                if all([p in muts_del_pos for p in clus_data_all[c]["gaps"]]) and clus_data_all[c]["gaps"]:
                    clus_all.append(c)


        ##### COLLECT COUNTS PER CLUSTER #####
        for clus in clus_all:


            # TODO: S:Q677 not in clus_dates
            if clus not in nextstrain_clade_to_clus:
                if clusters[clus]["display_name"] in clus_dates: # TODO: Could do faster...
                    if date_formatted < clus_dates[clusters[clus]["display_name"]]:
                        if clus not in early_dates_no_Nextclade:
                            early_dates_no_Nextclade[clus] = {}
                        early_dates_no_Nextclade[clus][l[indices['strain']]] = l[indices['date']]
                        continue

            # TODO: Maybe remove from certain clusters?
            # if wanted seqs are part of a Nextclade designated variant, remove from that count & use this one.
            # ONLY IF PLOTTING and if this run ISN'T an official run

            # TODO: This takes an insane amount of time
            ''' 
            # Do we want to write out cluster for Nextstrain?
            if print_files:
                nextstrain_run = clusters[clus]['nextstrain_build']
                if nextstrain_run:
                    # TODO: What is faster, opening file n timer or storing list of length n?
                    with open(clus_data_all[clus]["clusterlist_output"], "a") as f2: # TODO: add expected length of string to make faster?
                        f2.write("%s\n" % l[indices['strain']])
            '''

            # TODO: Removed dated_limit, check if must be added again

            country = l[indices["country"]]

            # Summary: Total counts and first & last seq
            clus_data_all[clus]["summary"][country]["num_seqs"] += 1
            clus_data_all[clus]["summary"][country]["first_seq"] = min(clus_data_all[clus]["summary"][country]["first_seq"], date_formatted)
            clus_data_all[clus]["summary"][country]["last_seq"] = max(clus_data_all[clus]["summary"][country]["first_seq"], date_formatted)

            # TODO: is it okay to apply this threshold here already?
            date_2weeks = to2week_ordinal(date_formatted)
            if date_2weeks < min_data_week:
                continue

            # cluster_counts: Number of sequences per cluster per country per date (2-week interval)
            # TODO: What if there are *NO* sequences in a given week?
            if date_2weeks not in clus_data_all[clus]["cluster_counts"][country]:
                clus_data_all[clus]["cluster_counts"][country][date_2weeks] = 0
            clus_data_all[clus]["cluster_counts"][country][date_2weeks] += 1


##################################
##################################
#### Process counts and check for min number of sequences per country

# TODO: print out second date check

# Create total_counts: Total counts per country and date, not sorted by cluster
total_counts_countries = {country: {} for country in all_countries}
for clus in clus_data_all:
    clus_data_all[clus]["total_counts"] = {}
    for country in clus_data_all[clus]["cluster_counts"]:
        for date in clus_data_all[clus]["cluster_counts"][country]:
            if date not in total_counts_countries[country]:
                total_counts_countries[country][date] = 0
            total_counts_countries[country][date] += clus_data_all[clus]["cluster_counts"][country][date]

cutoff_num_seqs = 1200

# TODO: Special case for Danish cluster?
# TODO: also special for "UK countries"?
# TODO: Line 1149, I don't understand the difference

# Collect all countries that have at least *cutoff_num_seqs* in at least one cluster
countries_to_plot = []
for country in all_countries:
    for clus in clus_data_all:
        if clus_data_all[clus]["summary"][country]["num_seqs"] > cutoff_num_seqs and country not in countries_to_plot:
            countries_to_plot.append(country)

print(
    f"Countries who have more than {cutoff_num_seqs} in any cluster:",
    countries_to_plot,
    "\n",
    f"There are {len(countries_to_plot)}",
    "\n",
)

##################################
##################################
#### Plotting

### CLUSTERS ###

ndone = 1

width = 1
smoothing = np.exp(-np.arange(-10, 10) ** 2 / 2 / width ** 2)
smoothing /= smoothing.sum()
for clus in clus_to_run:

    print(f"\nPlotting & writing out cluster {clus}: number {ndone} of {len(clus_to_run)}")

    total_data = pd.DataFrame(total_counts_countries)
    cluster_data = pd.DataFrame(clus_data_all[clus]["cluster_counts"])
    clus_build_name = clus_data_all[clus]["build_name"]

    json_output[clus_build_name] = {}
    for country in [x for x in countries_to_plot]:

        (
            week_as_date,
            cluster_count,
            total_count,
            unsmoothed_cluster_count,
            unsmoothed_total_count,
        ) = non_zero_counts(cluster_data, total_data, country, smoothing=smoothing) # TODO: do we need smoothing?

        week_as_date, cluster_count, total_count = trim_last_data_point(
            week_as_date, cluster_count, total_count, frac=0.1, keep_count=10
        )
        if len(cluster_count) < len(
            unsmoothed_cluster_count
        ):  # if the trim_last_data_point came true, match trimming
            unsmoothed_cluster_count = unsmoothed_cluster_count[:-1]
            unsmoothed_total_count = unsmoothed_total_count[:-1]

        json_output[clus_build_name][country] = {}
        json_output[clus_build_name][country]["week"] = [
            datetime.datetime.strftime(x, "%Y-%m-%d") for x in week_as_date
        ]
        json_output[clus_build_name][country]["total_sequences"] = [
            int(x) for x in total_count
        ]
        json_output[clus_build_name][country]["cluster_sequences"] = [
            int(x) for x in cluster_count
        ]
        json_output[clus_build_name][country]["unsmoothed_cluster_sequences"] = [
            int(x) for x in unsmoothed_cluster_count
        ]
        json_output[clus_build_name][country]["unsmoothed_total_sequences"] = [
            int(x) for x in unsmoothed_total_count
        ]

        if print_files:
            with open(tables_path + f"{clus_build_name}_data.json", "w") as fh:
                json.dump(json_output[clus_build_name], fh)
    ndone += 1


# TODO: Is this still needed?
'''
## Write out plotting information - only if all clusters have run
if print_files and "all" in clus_answer:
    with open(tables_path + f"perVariant_countries_toPlot.json", "w") as fh:
        json.dump(countries_plotted, fh)
'''

### COUNTRIES ###

def get_ordered_clusters_to_plot(clusters, division=False, selected_country=None):
    # fix cluster order in a list so it's reliable
    clus_keys = [x for x in clusters.keys()]  # if x in clusters_tww]

    # DO NOT PLOT 69 AS IT OVERLAPS WITH 439 AND 501!!!!
    # Do not plot 484 as it overlaps with 501Y.V2, possibly others
    # Do not plot DanishCluster as also overlaps
    # clus_keys = [x for x in clus_keys if x not in ["S69","S484", "DanishCluster"]]
    if division:
        clus_keys = [
            x
            for x in clus_keys
            if clusters[x]["type"] == "variant"
               or ("usa_graph" in clusters[x] and clusters[x]["usa_graph"] is True)
        ]
        cluster_data_key = "cluster_data_2wk_div"
        min_to_plot = 20
    else:
        clus_keys = [x for x in clus_keys if clusters[x]["graphing"] is True]
        cluster_data_key = "cluster_data_2wk"
        min_to_plot = 70

    countries_all = defaultdict(dict)
    for clus in clus_keys:
        if division:
            clus_dat = clusters[clus][selected_country][cluster_data_key]
        else:
            clus_dat = clusters[clus][cluster_data_key]
        for coun in clus_dat.columns:
            countries_all[coun][clus] = clus_dat[coun]

    # how to decide what to plot?
    proposed_coun_to_plot = []
    for clus in clus_keys:
        if division:
            country_inf = clusters[clus][selected_country]["division_info"]
        else:
            country_inf = clusters[clus]["country_info_df"]
        proposed_coun_to_plot.extend(
            country_inf[country_inf.num_seqs > min_to_plot].index
        )
        # special rule for Andorra
        proposed_coun_to_plot.extend(
            country_inf[(country_inf.num_seqs > 50) & (country_inf.index == "Andorra")].index
        )

    proposed_coun_to_plot = set(proposed_coun_to_plot)
    print(f"At min plot {min_to_plot}, there are {len(proposed_coun_to_plot)} entries PLUS ANDORRA")

    total_coun_counts = {}
    # decide order
    for clus in clus_keys:
        if division:
            country_inf = clusters[clus][selected_country]["division_info"]
        else:
            country_inf = clusters[clus]["country_info_df"]
        for coun in proposed_coun_to_plot:
            if coun not in total_coun_counts:
                total_coun_counts[coun] = 0
            if coun in country_inf.index:
                total_coun_counts[coun] += country_inf.num_seqs[coun]

    sorted_country_tups = sorted(
        total_coun_counts.items(), key=lambda x: x[1], reverse=True
    )
    proposed_coun_to_plot = [x[0] for x in sorted_country_tups]

    return proposed_coun_to_plot, clus_keys


def plot_country_data(
        clusters,
        proposed_coun_to_plot,
        print_files,
        clus_keys,
        file_prefix,
        division=False,
        selected_country=None,
):
    country_week = {clus: {} for clus in clusters}

    min_week = datetime.datetime(2020, 12, 31)
    max_week = datetime.datetime(2020, 1, 1)
    week_as_dates = {}
    json_output = {}
    json_output["countries"] = {}

    for coun in proposed_coun_to_plot:
        i = 0
        first_clus_count = []

        country_data = {"week": {}, "total_sequences": {}}

        for clus in clus_keys:
            if division:
                cluster_data = clusters[clus][selected_country]["cluster_data_2wk_div"]
            else:
                cluster_data = clusters[clus]["cluster_data_2wk"]
            cluster_data = cluster_data.sort_index()
            if division:
                total_data = clusters[clus][selected_country]["total_data_2wk_div"]
            else:
                total_data = clusters[clus]["total_data_2wk"]

            if coun not in cluster_data:
                i += 1
                continue
            (
                week_as_date,
                cluster_count,
                total_count,
                unsmoothed_cluster_count,
                unsmoothed_total_count,
            ) = non_zero_counts(cluster_data, total_data, coun)

            if len(total_count) < 2:
                continue

            # trim away any last data points that only have 1 or 2 seqs
            week_as_date, cluster_count, total_count = trim_last_data_point(
                week_as_date, cluster_count, total_count, frac=0.1, keep_count=10
            )

            mindat = min(week_as_date)
            if mindat < min_week:
                min_week = mindat
            maxdat = max(week_as_date)
            if maxdat > max_week:
                max_week = maxdat

            week_as_dates[coun] = week_as_date

            country_data[clusters[clus]["display_name"]] = list(
                cluster_count
            )

            country_week[clus][coun] = cluster_count / total_count

            linesty = "-"
            lab = clusters[clus]["display_name"]
            if i == 0:
                first_clus_count = [0] * len(total_count)
            if len(first_clus_count) == 0:
                first_clus_count = [0] * len(total_count)
            cluster_count = first_clus_count + cluster_count  # unindented

            first_clus_count = cluster_count  # unindented
            i += 1
        country_data["week"] = [
            datetime.datetime.strftime(x, "%Y-%m-%d") for x in week_as_date
        ]
        country_data["total_sequences"] = [
            int(x) for x in total_count
        ]
        if len(total_count) >= 2:
            json_output["countries"][coun] = country_data

    json_output["plotting_dates"] = {}
    json_output["plotting_dates"]["min_date"] = datetime.datetime.strftime(
        min_week, "%Y-%m-%d"
    )
    json_output["plotting_dates"]["max_date"] = datetime.datetime.strftime(
        max_week, "%Y-%m-%d"
    )

    if print_files:
        with open(tables_path + f"{file_prefix}_data.json", "w") as fh:
            json.dump(json_output, fh)


if do_country:
    proposed_coun_to_plot, clus_keys = get_ordered_clusters_to_plot(clusters)
    plot_country_data(
        clusters, proposed_coun_to_plot, print_files, clus_keys, "EUClusters"
    )

if do_divisions_country:
    proposed_coun_to_plot, clus_keys = get_ordered_clusters_to_plot(
        clusters, True, "USA"
    )
    plot_country_data(
        clusters,
        proposed_coun_to_plot,
        print_files,
        clus_keys,
        "USAClusters",
        True,
        "USA",
    )

    proposed_coun_to_plot, clus_keys = get_ordered_clusters_to_plot(
        clusters, True, "Switzerland"
    )
    plot_country_data(
        clusters,
        proposed_coun_to_plot,
        print_files,
        clus_keys,
        "SwissClusters",
        True,
        "Switzerland",
    )

# if all went well (script got to this point), and did an 'all' run, then print out an update!
update_json = {"lastUpdated": str(datetime.datetime.now().isoformat())}

if print_files and "all" in clus_answer:
    with open(web_data_folder + f"update.json", "w") as fh:
        json.dump(update_json, fh)

if "all" in clus_answer:
    ccounts = []
    for clus in clusters:
        if clusters[clus]['type'] == "variant":
            displayn = clusters[clus]["display_name"]
            ccounts.append([displayn, len(clusters[clus]['cluster_meta'])])

    count_df = pd.DataFrame(ccounts, columns=['cluster', 'counts'])
    print("Showing cluster counts")
    print(count_df.sort_values(by="counts"))


if "all" in clus_answer:
    for country in countries_to_plot.keys():
        if country not in country_styles_all:
            print(
                f"WARNING!: {coun} has no color! Please add it to country_list_2 in colors_and_countries.py and re-run make web-data"
            )

if "all" in clus_answer:
    for coun in country_styles_all:
        if coun not in countries_to_plot.keys():
            print(f"Not plotted anymore: {coun}")


'''

for clus in clus_to_run:
    # Summary table
    table_file = f"{tables_path}{clus_build_name}_table.tsv"
    ordered_country = pd.DataFrame(data=clus_data_all[clus]["summary"]).sort_values(by="first_seq")

    if print_files:
        ordered_country.to_csv(table_file, sep="\t")
        # only write if doing all clusters
        if "all" in clus_answer:
            with open(overall_tables_file, "a") as fh:
                fh.write(f"\n\n## {display_cluster}\n")
            ordered_country.to_csv(overall_tables_file, sep="\t", mode="a")

    # TODO: print acks


    clusterlist_output = clusters[clus]["clusterlist_output"]
    if print_files:
        nextstrain_run = clusters[clus]['nextstrain_build']
    else:
        nextstrain_run = False

    if print_files and nextstrain_run:
        # Copy file with date, so we can compare to prev dates if we want...
        if clus in clusters:
            build_nam = clusters[clus]["build_name"]
        else:
            build_nam = "mink"
        copypath = clusterlist_output.replace(
            f"{build_nam}",
            "{}-{}".format(build_nam, datetime.date.today().strftime("%Y-%m-%d")),
        )
        copyfile(clusterlist_output, copypath)
        copypath2 = clusterlist_output.replace(
            "clusters/cluster_", "clusters/current/cluster_"
        )
        copyfile(clusterlist_output, copypath2)

        # TODO: Currently I don't do that to save time, should I add it again?
        # Just so we have the data, write out the metadata for these sequences
        #cluster_meta.to_csv(out_meta_file, sep="\t", index=False)







'''






