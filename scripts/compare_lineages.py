from Bio import Phylo
from augur.utils import read_metadata, read_node_data
from augur.export_v2 import parse_node_data_and_metadata
import treetime
from collections import Counter
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib.cm as cm
import numpy as np
import math
import datetime
from shutil import copyfile
from collections import defaultdict
import copy
import pandas as pd
from os import listdir, path, mkdir
from colors_and_countries import *
from travel_data import *
from clusters import *
from helpers import *

# run from inside ncov folder, in ipython call as
#    run ../cluster_scripts/compare_lineages.py

# This script can be used to compare frequency of lineages in a specified country over time,
# using a specified tree cutoff date

##### Read in tree and other input files #####

# Input files TODO: where to put them?
input_folder = "../cluster_scripts/compare_lineages/input_files/"
output_folder = "../cluster_scripts/compare_lineages/output_files/"
ncov_swiss_folder = "../ncov-swiss"
figure_path = "../cluster_scripts/figures/"

treefile = ncov_swiss_folder + "/results/switzerland/tree.nwk"
branchfile = ncov_swiss_folder + "/results/switzerland/branch_lengths.json"
metadatafile = ncov_swiss_folder + "/data/metadata.tsv"

if not path.isdir(output_folder):
    mkdir(output_folder)

# create reverse look up from build name to cluster key
build_name_clusters = {}
for clus in clusters.keys():
    build_name_clusters[clusters[clus]["build_name"]] = clus

# Known clusters we compare against. TODO: File position temporary
#   named_clusters_dir = input_folder + "named_clusters/"
# look in the folder where 'clusterDynamics.py' write out cluster lists!
named_clusters_dir = "../ncov_cluster/cluster_profile/clusters/"
known_clusters = {}
clus_files = [
    x
    for x in listdir(named_clusters_dir)
    if "2020-" not in x and "clusone" not in x and "clustwo" not in x and "_clus" not in x
]
for file in clus_files:
    cluster_name = file.strip("cluster_.txt")
    with open(named_clusters_dir + file) as f:
        cluster = f.read().splitlines()
    if cluster_name in build_name_clusters:
        actual_clus = build_name_clusters[cluster_name]
    else:
        print(f"WARNING! Build name {cluster_name} is not found in clusters!")
        actual_clus = ""
    if actual_clus != "":
        known_clusters[actual_clus] = cluster


# Read in the tree and add extra node data
T = Phylo.read(treefile, "newick")
node_data = read_node_data([branchfile])

(
    node_data,
    node_attrs,
    node_data_names,
    metadata_names,
) = parse_node_data_and_metadata(T, [branchfile], metadatafile)
rate = node_data["clock"]["rate"]

# Add country and division, date, etc to each node
for node in T.find_clades(order="postorder"):
    data = node_data["nodes"][node.name]
    node.date = data["date"]
    node.num_date = data["numdate"]
    node.mut_length = round(data["mutation_length"])
    raw_data = node_attrs[node.name]
    node.country = raw_data["country"] if "country" in raw_data else ""
    node.division = raw_data["division"] if "division" in raw_data else ""

# set node parents
for node in T.find_clades(order="preorder"):
    for child in node:
        child.parent = node


##### Traverse tree and collect dates #####

# Idea: make applicable for other countries and dates TODO: would need other trees as input!
countries_dates = {
    "Switzerland": "2020-05-01"  # ,
    # "Switzerland": "2020-06-01"
}

# Minimum of strains of given country to count as a lineage
number_cutoff = 10
for country, date in countries_dates.items():

    cutoffDate = datetime.datetime.strptime(date, "%Y-%m-%d")

    # Store lineages by NODE (first node after cutoff date with entire lineage downstream)
    lineages_dates = {}  # Store dates of all sequences downstream of NODE
    lineages_info = {}  # Store node info of NODE
    lineages_strains = {}  # Store strain names of all sequences downstream of NODE

    # Store dates of all sequences of given country after cutoff date
    total_dates = {"total": []}

    # recursive traversal of tree (collects both total dates and dates per lineage):
    def traverse(node):

        # convert the node date into a date object
        node_date = datetime.datetime.strptime(node.date, "%Y-%m-%d")

        # count seqs only if after cutoff date
        if node_date >= cutoffDate:
            number_swiss = 0
            dates = []
            strains = []
            for leaf in node.get_terminals():
                if leaf.country == country:
                    number_swiss += 1
                    dates.append(datetime.datetime.strptime(leaf.date, "%Y-%m-%d"))
                    strains.append(leaf.name)

            # collect all seqs after cutoff date in total
            total_dates["total"] += dates

            # collect in lineages only if more that a specified number of sequences are found in this lineage
            if number_swiss > number_cutoff:
                lineages_dates[node.name] = dates
                lineages_strains[node.name] = strains
                lineages_info[node.name] = node

        else:
            for child in node:
                traverse(child)

    traverse(T.root)  # start recursive traversal of tree

    ##### Reorganize collected data #####

    # Compare against known clusters:
    lineage_clusters = {}  # compares all collected lineages to known clusters and stores overlap percentage
    for lineage in lineages_strains:
        lineage_clusters[lineage] = {}
        strains = lineages_strains[lineage]
        for cluster in known_clusters:
            strains_cluster = known_clusters[cluster]
            overlapping_strains = 0
            for strain in strains:
                if strain in strains_cluster:
                    overlapping_strains += 1
            lineage_clusters[lineage][cluster] = round(overlapping_strains / len(strains), 2)

    # Save lineage strains in text file for easier access
    with open(output_folder + "lineage_strains_" + country + "_" + date + ".txt", "w") as f:
        for lineage in lineages_strains:
            f.write(lineage + "\n")
            for strain in lineages_strains[lineage]:
                f.write(strain + "\n")
            f.write("\n")

    # Convert list of dates into numbers per week
    lineages_week_counts = {}
    for lineage in lineages_dates:
        counts_by_week = defaultdict(int)
        for d in lineages_dates[lineage]:
            counts_by_week[d.isocalendar()[1]] += 1  # returns ISO calendar week
        lineages_week_counts[lineage] = counts_by_week

    total_week_counts = {}
    counts_by_week = defaultdict(int)
    for d in total_dates["total"]:
        counts_by_week[d.isocalendar()[1]] += 1  # returns ISO calendar week
    total_week_counts["total"] = counts_by_week

    # Convert into dataframe
    lineages_data = pd.DataFrame(data=lineages_week_counts)
    total_data = pd.DataFrame(data=total_week_counts)

    # Reindex to force all lineages to have all weeks in total_data
    # (TODO: what if there is a week missing even in total_data?)
    lineages_data = lineages_data.reindex(total_data.index)

    # Sort by week
    lineages_data = lineages_data.sort_index()
    total_data = total_data.sort_index()

    # Replace all NaN with 0
    lineages_data = lineages_data.fillna(0)
    total_data = total_data.fillna(0)

    # Get dates for calendar weeks
    week_as_date = [datetime.datetime.strptime("2020-W{}-1".format(x), "%G-W%V-%u") for x in lineages_data.index]
    lineages_data.index = week_as_date
    total_data.index = week_as_date

    # Transpose for more convenient orientation
    lineages_data = lineages_data.transpose()
    total_data = total_data.transpose()

    # Get frequencies by dividing by total number
    lineages_data_frequencies = lineages_data.div(total_data.iloc[0], axis="columns")

    ##### Plot results #####

    fs = 14
    fig, (ax1, ax2) = plt.subplots(
        nrows=2,
        sharex=True,
        figsize=(12, 6),
        gridspec_kw={"height_ratios": [1, 3]},
    )

    # First plot: absolute numbers compare total versus lineages
    ax1.stackplot(total_data.columns, total_data.values.tolist(), color="darkblue")  # "lightgray")
    # ax1.stackplot(lineages_data.columns, lineages_data.values.sum(axis = 0).tolist(), color="gray")
    # ax1.legend(["Overall total", "Lineages total"], fontsize=fs * 0.8, loc=2)
    ax1.tick_params(labelsize=fs * 0.8)
    ax1.set_ylabel("sequences per week")
    textDate = cutoffDate.strftime("%A, %d %b %Y")
    ax1.set_title(f"Number of sequences in {country}")  # (cutoff date {textDate})")

    # Manipulate labels and handles to obtain legend only for colored clusters
    # TODO: color schemes won't work with percentage option selected
    lineage_to_cluster = {}
    for i, lineage in enumerate(lineages_data_frequencies.index):
        if sum(lineage_clusters[lineage].values()) > 0:
            s = []
            for cluster in lineage_clusters[lineage]:
                if lineage_clusters[lineage][cluster] > 0:
                    # s.append(cluster + " (" + str(100*lineage_clusters[lineage][cluster]) + "%)") #optional: apply percentage of cluster coverage
                    s.append(cluster)
            s = ", ".join(s)
            lineage_to_cluster[lineage] = s

    # Special color scheme for named clusters
    special_colors = {clus: clusters[clus]["col"] for clus in clusters.keys()}
    # special_colors = {"S222": "#69BEE9", "S477": "#FD8D47", "S80": "#42B250", "S92": "#9029B1"}
    color_map = cm.get_cmap("Greys")  # unnamed clusters get shades pf grey
    colors = [
        color_map(0.2 + 0.4 * i / len(lineages_data_frequencies.index))
        for i in range(len(lineages_data_frequencies.index))
    ]  # create gradient of grey shades
    for i, lineage in enumerate(lineages_data_frequencies.index):
        if lineage in lineage_to_cluster and lineage_to_cluster[lineage] in special_colors:
            colors[i] = special_colors[lineage_to_cluster[lineage]]

    ax2.fill_between(
        lineages_data_frequencies.columns,
        np.ones(len(lineages_data_frequencies.columns)),
        hatch="//",
        fc="#dddddd",
        ec="#aaaaaa",
    )
    ax2.stackplot(
        lineages_data_frequencies.columns,
        lineages_data_frequencies.values.tolist(),
        labels=lineages_data_frequencies.index,
        colors=colors,
    )

    (
        handles,
        labels,
    ) = ax2.get_legend_handles_labels()  # get the labels and handles
    new_labels = ["other lineages"]  # one gray label for all gray lineages
    gray_handles = [handles[i] for i in range(len(labels)) if labels[i] not in lineage_to_cluster]
    new_handles = [gray_handles[int(len(gray_handles) / 2)]]  # medium shade of gray

    for i, label in enumerate(labels):
        if label in lineage_to_cluster:  # only have named clusters in the legend
            new_labels.append(clusters[lineage_to_cluster[label]]["display_name"])
            new_handles.append(handles[i])

    ax2.legend(
        reversed(new_handles),
        reversed(new_labels),
        ncol=1,
        loc=2,
        fontsize=fs * 0.8,
    )
    fig.autofmt_xdate(rotation=30)
    ax2.tick_params(labelsize=fs * 0.8)
    ax2.set_ylabel("frequency")
    ax2.set_title("Lineage frequencies")
    ax2.set_ylim(0, 1)
    ax2.set_xlim(
        lineages_data_frequencies.columns[0],
        lineages_data_frequencies.columns[-1],
    )

    # fig.suptitle(country + " (Tree Cutoff Date: " + cutoffDate.strftime("%A, %d %b %Y") + ")")
    plt.show()
    plt.tight_layout()

    fig.savefig(output_folder + "compare_lineages_" + country + "_" + date + ".png")

    fmt = "pdf"
    plt.savefig(figure_path + f"compare_lineages_{country}.{fmt}")
    lineages_path = figure_path + f"compare_lineages_{country}.{fmt}"
    copypath = lineages_path.replace(
        country,
        "{}-{}".format(country, datetime.date.today().strftime("%Y-%m-%d")),
    )
    copyfile(lineages_path, copypath)
