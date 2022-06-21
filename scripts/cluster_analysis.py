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


def print_date_alerts(clus):
    print(clus)
    print(f"Expected date: {cluster_first_dates[clus]['first_date']}")
    print(alert_dates[clus][['strain','date','gisaid_epi_isl']])

def print_all_date_alerts():
    for clus in alert_dates.keys():
        print_date_alerts(clus)
        print("\n")

# Print out bad sequences in a format that can be directly copied over to bad_sequences.py
def print_bad_sequences():
    print()
    for clus in alert_dates.keys():
        for row in alert_dates[clus].iterrows():
            print(f"\"{row[1]['strain']}\": \"{row[1]['date']}\", # {clus}, {cluster_first_dates[clus]['first_date']}")
    print("\n")

# Transform (year, month, day) datetime to (year, week) tuple in a two-week interval, starting at this reference Monday
ref_monday = datetime.datetime.strptime("2020-04-27", '%Y-%m-%d').toordinal()
def to2week_ordinal(x):
    n = x.toordinal()
    monday = datetime.date.fromordinal(n - ((n - ref_monday) % 14))
    return (monday.isocalendar()[0], monday.isocalendar()[1]) #TODO: Currently returned as tuple of year & week -> Can we switch to returning datetime? Needs adjustment at several places in the script

def print_clus_alerts(key, clus):
    print(clus)
    print(summary_cluster_assignments[key][clus])

def print_all_clus_alerts(key):
    for clus in summary_cluster_assignments[key]:
        print_clus_alerts(key, clus)




# set min data week to consider
min_data_week = (2020, 18)  # 20)

##################################
##################################
#### Find out what users want

# TODO: Which of these are still required?
# ask user if they want to write-out files or not:
print_files = True
print_answer = input("\nWrite out data files?(y/n) (Enter is yes): ")
if print_answer in ["n", "N", "no", "NO", "No"]:
    print_files = False
print(f"Writing out files? {print_files}")

print_acks = False
print_ack_answer = input("\nWrite out acknowledgements?(y/n) (Enter is no): ")
if print_ack_answer in ["y", "Y", "yes", "YES", "Yes"]:
    print_acks = True
print(f"Writing out acknowledgements? {print_acks}")

# default is 222, but ask user what they want - or run all.
clus_to_run = []
reask = True

while reask:
    clus_answer = input(
        "\nWhat cluster to run? (Enter is all): "
    )
    if clus_answer == '':
        print("Using default of all\n")
        clus_answer = "all"

    if clus_answer in clusters.keys():
        print(f"Using {clus_answer}\n")
        clus_to_run = [clus_answer]
        reask = False
    elif "all" in clus_answer:
        clus_to_run = list(clusters.keys())
        reask = False
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

print("These clusters will be run: ", clus_to_run)

# division: collect division info for USA and Switzerland
division = False
do_divisions_country = False
if "all" in clus_answer:
    print("Doing division for USA and Switzerland.")
    selected_country = ["USA", "Switzerland"]
    division = True
    do_divisions_country = True
else:
    print("Not doing division for USA and Switzerland (not 'all' clusters selected).")

# Full country plotting
do_country = False
if "all" in clus_answer:
    print("Doing country plotting.")
    do_country = True
else:
    print("Can't do country plot as aren't doing 'all' clusters")

if do_country == False:
    print("You can alway run this step by calling `plot_country_data(clusters, proposed_coun_to_plot, print_files)`")

clus_check = False
print_answer = input("\nDo additional checks for cluster inconsistencies (one sequence appearing in multiple official clusters)?(y/n) (Enter is no): ")
if print_answer in ["y", "Y", "yes", "YES", "Yes"]:
    clus_check = True
print(f"Cluster check? {clus_check}")

start_time = time.time()

##################################
##################################
#### Prepare output files

t0 = time.time()

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
#### Prepare various useful dictionaries and count metadata lines for percentage output

# Random very early date for max & min date search (just needs to be earlier than any date we might encounter)
earliest_date = datetime.datetime.strptime("2019-01-01", '%Y-%m-%d')
today = datetime.datetime.today() # TODO: is date faster than datetime?

# Link Nextstrain clade and name to our cluster names used in clusters.py
# TODO: There could be more than one display name
display_name_to_clus = {clusters[clus]["display_name"]: clus for clus in clus_to_run if "display_name" in clusters[clus]}
nextstrain_name_to_clus = {clusters[clus]["nextstrain_name"]: clus for clus in clus_to_run if "nextstrain_name" in clusters[clus]}
# TODO: Might need to add extra entries for "21K.21L" using "other_nextstrain_names"

alert_dates = {} # All strains that are dated earlier than their respective clade are autoexcluded and printed out
for clus in cluster_first_dates: # Transform date from string to datetime for easier comparison
    cluster_first_dates[clus]["date_formatted"] = datetime.datetime.strptime(cluster_first_dates[clus]["first_date"], "%Y-%m-%d")


# Input metadata file
input_meta = "data/metadata.tsv"
cols = ['strain', 'date', 'division', 'host', 'substitutions', 'deletions', 'Nextstrain_clade', 'country', 'gisaid_epi_isl', 'QC_overall_status']

# Traverse metadata once to count lines and collect Nextstrain_clades
print("\nDoing first metadata pass...")
Nextstrain_clades = []
all_countries = []
n_total = 0
with open(input_meta) as f:
    header = f.readline().split("\t")
    indices = {c:header.index(c) for c in cols}
    line = f.readline()
    while line:
        l = line.split("\t")
        if l[indices['Nextstrain_clade']] not in Nextstrain_clades:
            Nextstrain_clades.append(l[indices['Nextstrain_clade']])
        if l[indices['country']] not in all_countries:
            all_countries.append(l[indices['country']])
        n_total += 1
        line = f.readline()

Nextstrain_clades_display_names = []
for clus in Nextstrain_clades:
    if clus in display_name_to_clus and display_name_to_clus[clus] in clus_to_run:
        Nextstrain_clades_display_names.append(clus)

snps_categories = ["snps", "snps2", "gaps"]
clus_to_run_breakdown = {key: {"official_clus": [], "unofficial_clus": [], "rest": []} for key in snps_categories}

for clus in clus_to_run:
    for key in snps_categories:
        if key in clusters[clus] and clusters[clus][key]:
            if clusters[clus]["display_name"] in Nextstrain_clades:
                clus_to_run_breakdown[key]["official_clus"].append(clus)
            elif clusters[clus]["type"] == "variant" and clusters[clus]["graphing"]:
                clus_to_run_breakdown[key]["unofficial_clus"].append(clus)
            else:
                clus_to_run_breakdown[key]["rest"].append(clus)

# TODO: think of prettier solution
rest_all = []
for key in clus_to_run_breakdown:
    for clus in clus_to_run_breakdown[key]["rest"]:
        if clus not in rest_all:
            rest_all.append(clus)

daughter_clades = {}
# TODO: Rename and adjust
for c in clus_to_run:
    if "parent" in clusters[c]:
        Nextstrain_clade = clusters[clusters[c]["parent"]]["display_name"]
        if Nextstrain_clade not in daughter_clades:
            daughter_clades[Nextstrain_clade] = []
        daughter_clades[Nextstrain_clade].append(c)


##################################
##################################
##### Prepare datastructure

# Collect counts by country & date and various other information, all sorted per cluster
clus_data_all = {}
division_data_all = {}
if division:
    for country in selected_country:
        division_data_all[country] = {}
        for clus in clus_to_run:
            division_data_all[country][clus] = {}
            division_data_all[country][clus]["summary"] = {}
            division_data_all[country][clus]["cluster_counts"] = {}

#TODO: Check if items() is better for all my iterations
for clus in clus_to_run:
    clus_data_all[clus] = clusters[clus]
    clus_data_all[clus]["summary"] = {country: {'first_seq': today, 'num_seqs': 0, 'last_seq': earliest_date} for country in all_countries}
    clus_data_all[clus]["cluster_counts"] = {country: {} for country in all_countries} #TODO: Do I need to remove unused countries?

    clus_data_all[clus]["clus_build_name"] = clusters[clus]["build_name"]
    clus_data_all[clus]["snps"] = [str(s) for s in clusters[clus]["snps"]]
    if "snps2" in clusters[clus]:
        clus_data_all[clus]["snps2"] = [str(s) for s in clusters[clus]["snps2"]]
    else:
        clus_data_all[clus]["snps2"] = []

    # use int for gaps since they need to be expanded from the metadata deletions column
    # -> save time by not converting to str for each line.
    if "gaps" not in clusters[clus]:
        clus_data_all[clus]["gaps"] = []

    #TODO: Is this still required?
    #if "exclude_snps" not in clusters[clus]:
        #clus_data_all[clus]["exclude_snps"] = []

    clus_data_all[clus]["clusterlist_output"] = (
        cluster_path + f'/clusters/cluster_{clusters[clus]["build_name"]}.txt'
    )
    clus_data_all[clus]["out_meta_file"] = (
        cluster_path
        + f'/cluster_info/cluster_{clusters[clus]["build_name"]}_meta.tsv'
    )

total_counts_countries = {country: {} for country in all_countries}

# store acknoweledgements
acknowledgement_by_variant = {}
acknowledgement_by_variant["acknowledgements"] = {clus: [] for clus in clus_to_run}

acknowledgement_keys = {}
acknowledgement_keys["acknowledgements"] = {}

t1 = time.time()
print(f"Preparation took {round((t1-t0)/60,1)} min to run.\n")

##################################
##################################
#### Read and clean metadata line by line
t0 = time.time()
#detailed_time_measurement = {"ab": 0, "bc": 0,"cd": 0,"de": 0,"ef": 0,"fg": 0,"gh": [0,0,0,0,0,0,0,0,0]}

early_dates_no_Nextclade = {}
all_sequences = {clus: [] for clus in clusters}
cluster_inconsistencies = {"Nextstrain_clade": {}, "Non_Nextstrain_clade": {}}

print_lines = sorted([int(n_total/20*i) + 1 for i in range(1,20)])

print("\nReading and cleaning up the metadata line-by-line...\n")
n = 0
with open(input_meta) as f:
    header = f.readline().split("\t")
    indices = {c:header.index(c) for c in cols}

    while True:
        #t_a = time.time()
        line = f.readline()
        if not line:
            break
        n += 1

        if n in print_lines:
            t1 = time.time()
            print(f"{round(n/n_total * 100)}% complete... ({round((t1-t0)/60,1)} min)")
            #print(detailed_time_measurement)


        l = line.split("\t")
        #t_b = time.time()


        ##### CLEANING METADATA #####

        #l = [float("NaN") if i == "" else i for i in l] # Fillna # TODO: Do we really need this?

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
        if len(l[indices['date']]) != 10:
            continue

        if "X" in l[indices['date']]:
            continue

        # If bad seq there  - exclude!
        if l[indices['strain']] in bad_seqs and l[indices['date']] == bad_seqs[l[indices['strain']]]:
            continue

        # Future dates
        date_formatted = datetime.datetime.strptime(l[indices['date']], "%Y-%m-%d")
        if date_formatted > today:
            print("WARNING! Data from the future!")
            print(f"{l[indices['strain']]}: {l[indices['date']]}")
            continue

        # TODO: is it faster if I don't call the function?
        date_2weeks = to2week_ordinal(date_formatted)
        # n = date_formatted.toordinal()
        # monday = datetime.date.fromordinal(n - ((n - ref_monday) % 14))
        # date_2weeks = (monday.isocalendar()[0], monday.isocalendar()[1])

        country = l[indices["country"]]

        if date_2weeks >= min_data_week:
            if date_2weeks not in total_counts_countries[country]:
                total_counts_countries[country][date_2weeks] = 0
            total_counts_countries[country][date_2weeks] += 1

        #t_c = time.time()

        ##### ASSIGNING CLUSTERS #####

        # If an official Nextstrain clade, then use Nextclade designation to assign them.
        # If not an official Nextstrain clade, use our SNP method

        clus_to_check = {key: clus_to_run_breakdown[key]["rest"] for key in clus_to_run_breakdown}

        clade = l[indices['Nextstrain_clade']]

        clus_all = []
        only_Nextstrain = False
        # Use Nextclade
        if clade in Nextstrain_clades_display_names:
            clus_all.append(display_name_to_clus[clade])
            only_Nextstrain = True
            if clade in daughter_clades:
                for daughter in daughter_clades[clade]:
                #TODO: make sure this works for snps
                    if not clus_check or daughter not in clus_to_run_breakdown["unofficial_clus"]: # Make sure daughter clade is not added two times
                        clus_to_check = {key: clus_to_check[key] + daughter for key in clus_to_check if daughter in clus_to_check[key]["official_clus"] or daughter in clus_to_check[key]["unofficial_clus"]}
                only_Nextstrain = False

        if clus_all == []:
            clus_to_check = {key: clus_to_check[key] + clus_to_run_breakdown[key]["official_clus"] + clus_to_run_breakdown[key]["unofficial_clus"] for key in clus_to_check}
            only_Nextstrain = False

        elif clus_check:
            clus_to_check = {key: clus_to_check[key] + clus_to_run_breakdown[key]["unofficial_clus"] for key in clus_to_check}
            only_Nextstrain = False

        #t_d = time.time()

        muts = {"snps": []}

        if l[indices['substitutions']]:
            muts["snps"] = [y[1:-1] for y in l[indices['substitutions']].split(',')]

        #muts = {"snps": [int(y[1:-1]) for y in l[indices['substitutions']].split(',') if y], "gaps": [z for y in l[indices['deletions']].split(',') if y for z in
                        #range(int(y.split("-")[0]), int(y.split("-")[-1]) + 1)]} # expand metadata deletions formatting

        muts["snps2"] = muts["snps"]

        if l[indices['deletions']]:
            muts["gaps"] = [z for y in l[indices['deletions']].split(',') for z in range(int(y.split("-")[0]), int(y.split("-")[-1]) + 1)]

        #t_e = time.time()

        # TODO: Did not include "exclude_snps" since none are currently used in clusters.py
        for key in muts:
            for clus in clus_to_check[key]:
                if clus in clus_all:
                    continue
                for snp in clus_data_all[clus][key]:
                    if snp not in muts[key]:
                        break
                else:
                    clus_all.append(clus)

        #t_f = time.time()

        clus_all_no_plotting = []
        # Check for inconsistencies
        # TODO: Maybe remove from certain clusters?
        # if wanted seqs are part of a Nextclade designated variant, remove from that count & use this one.
        # ONLY IF PLOTTING and if this run ISN'T an official run
        if not only_Nextstrain: # Only check for inconsistencies if there could be more than only one Nextstrain clade
            clus_all_unique = [c for c in clus_all if c not in rest_all]
            daughter_parent = False
            if len(clus_all_unique) == 2: # Exactly two clus - check if daughter/parent pair
                if clus_all_unique[0] in daughter_clades and daughter_clades[clus_all_unique[0]] == clus_all_unique[1]:
                    clus_all_no_plotting.append(clus_all_unique[0]) # Remove parent, keep child
                    daughter_parent = True
                if clus_all_unique[1] in daughter_clades and daughter_clades[clus_all_unique[1]] == clus_all_unique[0]:
                    clus_all_no_plotting.append(clus_all_unique[1]) # Remove parent, keep child
                    daughter_parent = True

            if len(clus_all_unique) > 1 and not daughter_parent: # Flag for inconsistency
                clus_all = [clus for clus in clus_all if clus not in clus_all_unique]
                if clade in display_name_to_clus and display_name_to_clus[clade] in clus_all_unique: # If Nextstrain clade: Keep this and remove all others
                    clus_all.append(display_name_to_clus[clade])
                    cluster_inconsistencies["Nextstrain_clade"][l[indices['gisaid_epi_isl']]] = clus_all_unique

                else:# If no Nextstrain clade: Drop all unique clusters (still keep mutations and unofficial clusters)
                    cluster_inconsistencies["Non_Nextstrain_clade"][l[indices['gisaid_epi_isl']]] = clus_all_unique


        #t_g = time.time()

        #t_gh = [0,0,0,0,0,0,0,0,0]

        ##### COLLECT COUNTS PER CLUSTER #####
        for clus in clus_all: # TODO: maybe include print_files to not collect data?

            #t_0 = time.time()

            #if clus not in clus_to_run: # TODO: I think this would never happen, can I cut it out to save time?
                #continue

            #t_1 = time.time()

            # Exclude all strains that are dated before their respective clade
            # TODO: S:Q677 not in clus_dates
            if clus in cluster_first_dates: # TODO: What if missing?
                if date_formatted < cluster_first_dates[clus]["date_formatted"]:
                    if clus not in alert_dates:
                        alert_dates[clus] = {'strain': [], 'date': [], 'gisaid_epi_isl': []}
                    for k in alert_dates[clus]:
                        alert_dates[clus][k].append(l[indices[k]])
                    continue

            #t_2 = time.time()

            # Store all strains per assigned cluster
            all_sequences[clus].append(l[indices['strain']])

            #t_3 = time.time()

            if clus in clus_all_no_plotting:
                continue

            # TODO: Removed dated_limit, check if must be added again

            '''
            # Summary: Total counts and first & last seq
            if country not in clus_data_all[clus]["summary"]:
                clus_data_all[clus]["summary"][country] = {'first_seq': today, 'num_seqs': 0, 'last_seq': earliest_date}
            '''

            #t_4 = time.time()
            clus_data_all[clus]["summary"][country]["num_seqs"] += 1
            clus_data_all[clus]["summary"][country]["first_seq"] = min(clus_data_all[clus]["summary"][country]["first_seq"], date_formatted)
            clus_data_all[clus]["summary"][country]["last_seq"] = max(clus_data_all[clus]["summary"][country]["last_seq"], date_formatted)

            #t_5 = time.time()

            #t_6 = time.time()

            # TODO: is it okay to apply this threshold here already? It does have to be in summary, right?
            if date_2weeks < min_data_week:
                continue

            #t_7 = time.time()

            # cluster_counts: Number of sequences per cluster per country per date (2-week interval)
            # TODO: What if there are *NO* sequences in a given week?
            '''
            if country not in clus_data_all[clus]["cluster_counts"]:
                clus_data_all[clus]["cluster_counts"][country] = {}
            '''
            if date_2weeks not in clus_data_all[clus]["cluster_counts"][country]:
                clus_data_all[clus]["cluster_counts"][country][date_2weeks] = 0
            clus_data_all[clus]["cluster_counts"][country][date_2weeks] += 1

            #t_8 = time.time()

            # For selected countries (e.g. USA, Switzerland), also collect data by division
            if division:
                if country in selected_country:

                    # Replace Swiss divisions with swiss-region, but store original division
                    div = l[indices['division']]
                    if div in swiss_regions:
                        div = swiss_regions[div]

                    if div not in division_data_all[country][clus]["summary"]:
                        division_data_all[country][clus]["summary"][div] = {'first_seq': today, 'num_seqs': 0, 'last_seq': earliest_date}
                    division_data_all[country][clus]["summary"][div]["num_seqs"] += 1
                    division_data_all[country][clus]["summary"][div]["first_seq"] = min(division_data_all[country][clus]["summary"][div]["first_seq"], date_formatted)
                    division_data_all[country][clus]["summary"][div]["last_seq"] = max(division_data_all[country][clus]["summary"][div]["last_seq"], date_formatted)

                    if div not in division_data_all[country][clus]["cluster_counts"]:
                        division_data_all[country][clus]["cluster_counts"][div] = {}
                    if date_2weeks not in division_data_all[country][clus]["cluster_counts"][div]:
                        division_data_all[country][clus]["cluster_counts"][div][date_2weeks] = 0
                    division_data_all[country][clus]["cluster_counts"][div][date_2weeks] += 1

            #t_9 = time.time()

            if print_acks:
                # remove all but EPI_ISL, on request from GISAID
                acknowledgement_by_variant["acknowledgements"][clus].append(l[indices['gisaid_epi_isl']])

            #t_gh[0] += t_1 - t_0
            #t_gh[1] += t_2 - t_1
            #t_gh[2] += t_3 - t_2
            #t_gh[3] += t_4 - t_3
            #t_gh[4] += t_5 - t_4
            #t_gh[5] += t_6 - t_5
            #t_gh[6] += t_7 - t_6
            #t_gh[7] += t_8 - t_7
            #t_gh[8] += t_9 - t_8


        #detailed_time_measurement["ab"] += t_b-t_a
        #detailed_time_measurement["bc"] += t_c - t_b
        #detailed_time_measurement["cd"] += t_d - t_c
        #detailed_time_measurement["de"] += t_e - t_d
        #detailed_time_measurement["ef"] += t_f - t_e
        #detailed_time_measurement["fg"] += t_g - t_f
        #detailed_time_measurement["gh"] = [t_gh[i] + detailed_time_measurement["gh"][i] for i in range(len(t_gh))]


print("100% complete!")
t1 = time.time()
print(f"Collecting all data took {round((t1-t0)/60,1)} min to run.\n")

##################################
##################################
#### Process counts and check for min number of sequences per country

#TODO: Maybe adjust clus_to_run, what if a clus is not found?

print("\nWrite out strains for Nextstrain runs...\n")
# Write out strains for Nextstrain runs
if print_files:
    for clus in clus_to_run:
        if all_sequences[clus] == []:
            print(f"No strains written out for cluster {clus} (no sequences assigned to this cluster).")
            continue

        # Store all strains per cluster
        nextstrain_run = clusters[clus]['nextstrain_build']
        clusterlist_output = clusters[clus]["clusterlist_output"]
        if nextstrain_run:
            with open(clusterlist_output, "w") as f:
                f.write("\n".join(all_sequences[clus]))

            # Copy file with date, so we can compare to prev dates if we want...
            build_nam = clusters[clus]["build_name"]
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

# Write out summary table
print("\nWrite out summary tables...\n")
if print_files:
    for clus in clus_to_run:
        if clus_data_all[clus]["summary"] == {}: #TODO: No sequence is "Delta.299I"? Is that possible?
            print(f"No summary written out for cluster {clus} (no sequences assigned to this cluster).")
            continue

        clus_build_name = clus_data_all[clus]["build_name"]
        table_file = f"{tables_path}{clus_build_name}_table.tsv"
        ordered_country = pd.DataFrame.from_dict(clus_data_all[clus]["summary"], orient="index").sort_values(by="first_seq")
        ordered_country = ordered_country[ordered_country["num_seqs"] != 0]
        ordered_country["first_seq"] = ordered_country["first_seq"].dt.date
        ordered_country["last_seq"] = ordered_country["last_seq"].dt.date
        ordered_country.to_csv(table_file, sep="\t")
        # only write if doing all clusters
        if "all" in clus_answer:
            display_cluster = clus_data_all[clus]["display_name"]
            with open(overall_tables_file, "a") as fh:
                fh.write(f"\n\n## {display_cluster}\n")
            ordered_country.to_csv(overall_tables_file, sep="\t", mode="a")

# only do this for 'all' runs as otherwise the main file won't be updated.
if print_acks and "all" in clus_answer:
    print("\nWrite out acknowledgements...\n")
    for clus in clus_to_run:
        if clus not in acknowledgement_by_variant["acknowledgements"]:
            print(f"Cluster {clus} missing from acknowledgements (no sequences assigned to this cluster).")
            continue

        clus_build_name = clusters[clus]["build_name"]

        if clus_build_name == "DanishCluster":
            continue

        ack_out_folder = acknowledgement_folder_new + f"{clus_build_name}/"
        if not os.path.exists(ack_out_folder):
            os.mkdir(ack_out_folder)
        ack_list = acknowledgement_by_variant["acknowledgements"][clus]
        chunk_size = 1000
        chunks = [ack_list[i : i + chunk_size] for i in range(0, len(ack_list), chunk_size)]

        # get number & file names
        ack_file_names = ["{0:03}".format(i) for i in range(len(chunks))]
        acknowledgement_keys["acknowledgements"][clus_build_name] = {}
        acknowledgement_keys["acknowledgements"][clus_build_name]["numChunks"] = len(
            chunks
        )

        #for ch, fn in zip(chunks, ack_file_names):
            #with open(ack_out_folder + fn + ".json", "w") as fh:
                #json.dump(ch, fh, indent=2, sort_keys=True)
'''
# TODO: Make sure my totals are not off due to the mutations!
# Create total_counts: Total counts per country and date, not sorted by cluster
total_counts_countries = {}
for clus in clus_data_all:
    #clus_data_all[clus]["total_counts"] = {}
    for country in clus_data_all[clus]["cluster_counts"]:
        if country not in total_counts_countries:
            total_counts_countries[country] = {}
        for date in clus_data_all[clus]["cluster_counts"][country]:
            if date not in total_counts_countries[country]:
                total_counts_countries[country][date] = 0
            total_counts_countries[country][date] += clus_data_all[clus]["cluster_counts"][country][date]
'''

# TODO: Special case for Danish cluster?
# TODO: also special for "UK countries"?

print("\nCollect countries above cutoff_num_seqs...\n")
cutoff_num_seqs = 1200
# Collect all countries that have at least *cutoff_num_seqs* in at least one cluster
countries_to_plot = []
for clus in clus_data_all:
    for country in clus_data_all[clus]["summary"]:
        if clus_data_all[clus]["summary"][country]["num_seqs"] > cutoff_num_seqs and country not in countries_to_plot:
            countries_to_plot.append(country)

print(
    f"\nCountries who have more than {cutoff_num_seqs} in any cluster:",
    countries_to_plot,
    "\n",
    f"There are {len(countries_to_plot)}",
    "\n",
)

if division:
    total_counts_divisions = {country: {} for country in division_data_all}
    for country in division_data_all:
        for clus in division_data_all[country]:
            for div in division_data_all[country][clus]["cluster_counts"]:
                total_counts_divisions[country][div] = {}
                for date in division_data_all[country][clus]["cluster_counts"][div]:
                    if date not in total_counts_divisions[country][div]:
                        total_counts_divisions[country][div][date] = 0
                    total_counts_divisions[country][div][date] += division_data_all[country][clus]["cluster_counts"][div][date]


##################################
##################################
#### Plotting

# Pass helper function non_zero_counts over all cluster and all countries once
print("\nPass non_zero_counts() helper function over the data...\n")
ndone = 0
for clus in clus_data_all:
    print(f"Plotting & writing out cluster {clus}: number {ndone} of {len(clus_to_run)}")
    total_data = pd.DataFrame(total_counts_countries)
    cluster_data = pd.DataFrame(clus_data_all[clus]["cluster_counts"]).sort_index() # TODO: Countries sort, clusters not. Hope it's okay to sort for both
    clus_data_all[clus]["non_zero_counts"] = {}

    for country in countries_to_plot:
        if country not in cluster_data: #TODO: Is this okay?
            continue

        (
            week_as_date,
            cluster_count,
            total_count,
            unsmoothed_cluster_count,
            unsmoothed_total_count,
        ) = non_zero_counts(cluster_data, total_data, country) # TODO: was it okay to remove smoothing?

        if len(total_count) < 2:  # TODO: Okay if this happens after trimming?
            continue

        week_as_date, cluster_count, total_count = trim_last_data_point(
            week_as_date, cluster_count, total_count, frac=0.1, keep_count=10
        )

        clus_data_all[clus]["non_zero_counts"][country] = (week_as_date, cluster_count, total_count)
    ndone += 1

if division:
    for country in selected_country:
        for clus in division_data_all[country]:
            total_data = pd.DataFrame(total_counts_divisions[country])
            cluster_data = pd.DataFrame(division_data_all[country][clus]["cluster_counts"]).sort_index()  # TODO: Countries sort, clusters not. Hope it's okay to sort for both
            division_data_all[country][clus]["non_zero_counts"] = {}

            for div in division_data_all[country][clus]["cluster_counts"]: # TODO: Is this list okay?

                (
                    week_as_date,
                    cluster_count,
                    total_count,
                    unsmoothed_cluster_count,
                    unsmoothed_total_count,
                ) = non_zero_counts(cluster_data, total_data, div)  # TODO: was it okay to remove smoothing?

                if len(total_count) < 2:
                    continue

                week_as_date, cluster_count, total_count = trim_last_data_point(
                    week_as_date, cluster_count, total_count, frac=0.1, keep_count=10
                )

                division_data_all[country][clus]["non_zero_counts"][div] = (week_as_date, cluster_count, total_count)


### CLUSTERS ###

print("\nWrite out clusters...\n")
for clus in clus_to_run:

    clus_build_name = clus_data_all[clus]["build_name"]

    json_output[clus_build_name] = {}
    for country in clus_data_all[clus]["non_zero_counts"]:

        (week_as_date, cluster_count, total_count) = clus_data_all[clus]["non_zero_counts"][country]

        json_output[clus_build_name][country] = {}
        json_output[clus_build_name][country]["week"] = [datetime.datetime.strftime(x, "%Y-%m-%d") for x in week_as_date]
        json_output[clus_build_name][country]["total_sequences"] = [int(x) for x in total_count]
        json_output[clus_build_name][country]["cluster_sequences"] = [int(x) for x in cluster_count]

    if print_files:
        with open(tables_path + f"{clus_build_name}_data.json", "w") as fh:
            json.dump(json_output[clus_build_name], fh)


## Write out plotting information - only if all clusters have run
if print_files and "all" in clus_answer:
    countries_plotted = list(clus_data_all[clus]["non_zero_counts"].keys())
    with open(tables_path + f"perVariant_countries_toPlot.json", "w") as fh:
        json.dump({c: True  for c in countries_plotted}, fh) #TODO: Could we adjust the format?


### COUNTRIES ###

print("\nWrite out countries...\n")
# Return a list of proposed countries to plot as well as a list of clusters to plot
def get_ordered_clusters_to_plot(division_local=False, selected_country_local=None):
    # fix cluster order in a list so it's reliable
    clus_keys = [x for x in clusters.keys()]  # if x in clusters_tww]
    if division_local:
        clus_keys = [x for x in clus_keys if clusters[x]["type"] == "variant" or ("usa_graph" in clusters[x] and clusters[x]["usa_graph"] is True)]
        min_to_plot = 20
    else:
        clus_keys = [x for x in clus_keys if clusters[x]["graphing"] is True]
        min_to_plot = 70

    # Countries to plot must have at least *min_to_plot* sequences in at least one cluster (special case for Andorra)
    proposed_coun_to_plot = []
    for clus in clus_keys:
        if division_local:
            country_info = division_data_all[selected_country_local][clus]["summary"]
        else:
            country_info = clus_data_all[clus]["summary"]

        for c in country_info:
            if country_info[c]["num_seqs"] > min_to_plot and c not in proposed_coun_to_plot:
                proposed_coun_to_plot.append(c)

        # special rule for Andorra
        if "Andorra" in country_info and country_info["Andorra"]["num_seqs"] > 50 and "Andorra" not in proposed_coun_to_plot:
            proposed_coun_to_plot.append("Andorra")

    if division_local:
        print(f"\nDivision plotting ({selected_country_local}): At min plot {min_to_plot}, there are {len(proposed_coun_to_plot)} entries")
    else:
        print(f"\nCountry plotting: At min plot {min_to_plot}, there are {len(proposed_coun_to_plot)} entries PLUS ANDORRA")



    total_coun_counts = {}
    # Sort by total number of cases
    for clus in clus_keys:
        if division_local:
            country_info = division_data_all[selected_country_local][clus]["summary"]
        else:
            country_info = clus_data_all[clus]["summary"]
        for country in country_info:
            if country in proposed_coun_to_plot:
                if country not in total_coun_counts:
                    total_coun_counts[country] = 0
                total_coun_counts[country] += country_info[country]["num_seqs"]

    sorted_country_tups = sorted(total_coun_counts.items(), key=lambda x: x[1], reverse=True)
    proposed_coun_to_plot = [x[0] for x in sorted_country_tups]

    return proposed_coun_to_plot, clus_keys


def plot_country_data(
        clusters,
        proposed_coun_to_plot,
        print_files,
        clus_keys,
        file_prefix,
        division_local=False,
        selected_country_local=None,
):

    min_week = today
    max_week = earliest_date
    week_as_dates = {}
    json_output = {}
    json_output["countries"] = {}

    for country in proposed_coun_to_plot:
        i = 0
        first_clus_count = []

        country_data = {"week": {}, "total_sequences": {}}

        for clus in clus_keys:
            if division_local:
                if country not in division_data_all[selected_country_local][clus]["non_zero_counts"]:
                    i += 1
                    continue # TODO: What exactly is this for?
                (week_as_date, cluster_count, total_count) = division_data_all[selected_country_local][clus]["non_zero_counts"][country]
            else:
                if country not in clus_data_all[clus]["non_zero_counts"]:
                    i += 1
                    continue
                (week_as_date, cluster_count, total_count) = clus_data_all[clus]["non_zero_counts"][country]

            mindat = min(week_as_date)
            if mindat < min_week:
                min_week = mindat
            maxdat = max(week_as_date)
            if maxdat > max_week:
                max_week = maxdat

            week_as_dates[country] = week_as_date

            country_data[clusters[clus]["display_name"]] = list([int(x) for x in cluster_count])

            if i == 0:
                first_clus_count = [0] * len(total_count)
            if len(first_clus_count) == 0:
                first_clus_count = [0] * len(total_count)

            i += 1

        country_data["week"] = [datetime.datetime.strftime(x, "%Y-%m-%d") for x in week_as_date]
        country_data["total_sequences"] = [int(x) for x in total_count] # TODO: I don't get this, why is this outside of the for loop?
        if len(total_count) >= 2:
            json_output["countries"][country] = country_data

    json_output["plotting_dates"] = {}
    json_output["plotting_dates"]["min_date"] = datetime.datetime.strftime(min_week, "%Y-%m-%d")
    json_output["plotting_dates"]["max_date"] = datetime.datetime.strftime(max_week, "%Y-%m-%d")

    if print_files:
        with open(tables_path + f"{file_prefix}_data.json", "w") as fh:
            json.dump(json_output, fh)

if do_country:
    proposed_coun_to_plot, clus_keys = get_ordered_clusters_to_plot()
    plot_country_data(clusters, proposed_coun_to_plot, print_files, clus_keys, "EUClusters")

if do_divisions_country:
    proposed_coun_to_plot, clus_keys = get_ordered_clusters_to_plot(True, "USA")
    plot_country_data(
        clusters,
        proposed_coun_to_plot,
        print_files,
        clus_keys,
        "USAClusters",
        True,
        "USA",
    )

    proposed_coun_to_plot, clus_keys = get_ordered_clusters_to_plot(True, "Switzerland")
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
            ccounts.append([displayn, len(all_sequences[clus])])

    count_df = pd.DataFrame(ccounts, columns=['cluster', 'counts'])
    print("\nShowing cluster counts")
    print(count_df.sort_values(by="counts"))


# Print out how many bad seqs were found
# TODO: adjust to Emmas wishes
if alert_dates:
    for clus in alert_dates:
        alert_dates[clus] = pd.DataFrame.from_dict(alert_dates[clus])

    print("\nDate alerts (all have been auto-excluded):")
    print([f"{x}: {len(alert_dates[x])}" for x in alert_dates.keys()])
    print("To view, use 'print_all_date_alerts()' or 'print_date_alerts(<clus>)'. Formatted for bad_sequences.py: use 'print_bad_sequences()'\n")

else:
    print("\nNo bad dates found.\n")

# Print out countries missing colors
if "all" in clus_answer:
    missing_c_found = False
    for country in countries_to_plot:
        if country not in country_styles_all:
            print(f"WARNING!: {country} has no color! Please add it to country_list_2 in colors_and_countries.py and re-run make web-data.")
            missing_c_found = True
    if not missing_c_found:
        print("No country is missing colors.\n")

# Print out countries with assigned colors that did not make it into plotting
if "all" in clus_answer:
    for country in country_styles_all:
        if country not in countries_to_plot:
            print(f"Not plotted anymore: {country}")

# Print out inconsistent cluster assignments (more than one cluster per sequence)
summary_cluster_assignments = {}
for key in cluster_inconsistencies:
    summary_cluster_assignments[key] = {}
    for strain, clus in cluster_inconsistencies[key].items():
        clus = [c for c in clus if c not in rest_all]
        if str(clus) not in summary_cluster_assignments[key]:
            summary_cluster_assignments[key][str(clus)] = []
        summary_cluster_assignments[key][str(clus)].append(strain)

for key in summary_cluster_assignments:
    if summary_cluster_assignments[key]:
        print(f"\nWarning: Inconsistent cluster assignment found for {key} sequences (all automatically excluded unless Nextstrain clade):")
        for clus in summary_cluster_assignments[key]:
            print(f"{clus}: {len(summary_cluster_assignments[key][clus])}")
        print(f"To view, use 'print_all_clus_alerts('{key}')' or 'print_clus_alerts('{key}', \"[clus_list]\")'")
    else:
        print(f"\nNo inconsistent cluster assignment found for {key} sequences.")
