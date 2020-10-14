

# We want to compare the frequency of lineages in Switzerland
# over time, since ~1 June, in particular against our cluster!

# create these folders, and ensure correct files a copied in -
# from a 'Swiss' build:

# You need to have updated the files below - copy into 'ncov'
treefile = "results/clusone/tree.nwk"
branchfile = "results/clusone/branch_lengths.json"
metadatafile = "data/metadata.tsv"

from Bio import Phylo
from augur.utils import read_metadata, read_node_data
from augur.export_v2 import parse_node_data_and_metadata
import treetime
from collections import Counter
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np
import math
import datetime
from shutil import copyfile
from collections import defaultdict
import copy
import pandas as pd

# First we need to read in the tree, and we'll put some extra
# data on it - like what country sequences are from, so we don't
# always need to look it up in the metadata table!


# Read in the tree, and add node data
T = Phylo.read(treefile, 'newick')
node_data = read_node_data([branchfile])

# read in extra node data and put it on the tree
node_data, node_attrs, node_data_names, metadata_names = parse_node_data_and_metadata(T, [branchfile], metadatafile)
rate = node_data['clock']['rate']

# Here's where we add country and division, date, etc to each node
for node in T.find_clades(order='postorder'):
    data = node_data['nodes'][node.name]
    node.date = data['date']
    node.num_date = data['numdate']
    node.mut_length = round(data['mutation_length'])
    raw_data = node_attrs[node.name]
    node.country = raw_data["country"] if 'country' in raw_data else ''
    node.division = raw_data["division"] if 'division' in raw_data else ''

#set parents - this way we can easily get a node's parent!
for node in T.find_clades(order='preorder'):
    for child in node:
        child.parent = node

#To traverse a tree there's three ways:
# for node in T.find_clades():
# this goes through and will find *all* clades - internal nodes and tips

# for node in T.get_nonterminals():
# this will only find internal nodes ('nonterminals')

# for node in T.get_terminals():
# this will only find tips ('termainals')

# The order you traverse the tree can be set - either preorder
# or postorder (see the code above)
# I forget which is which all the time - google preorder vs postorder!
# but essentially it matters whether you want to start at the root
# or a the tips!

#first we want to go through the tree and figure out what
# is going to be our 'lineage' - nodes with a date > 1 June
# and that have at least 10 Swiss tips coming from them

# We'll want to go through 'preorder' because we want to 
# grab as 'big' a lineage as we can!
# we'll also just look at nonterminals because we want to grab
# groups of sequences, not just one sequence

# we can also just get terminals (tips) of a node only with the command:
# for leaf in node.get_terminals():



# one problem - if we decide that a node is a 'lineage' then
# we don't want to also mark it's 'children' as lineages!
# so we'll need to keep track of lineages we've already decided to keep!

#we could do this by adding a new attribute to the tree, originally all set to false
for node in T.get_nonterminals(order='preorder'):
    node.is_lineage = False


#set cutoff date 
# this converts it into a 'date' object so we can do comparisons!
cutoffDate = datetime.datetime.strptime("2020-06-01", '%Y-%m-%d')

#set our cut off for how many swiss seqs it should have
swiss_number_cutoff = 10

#store the lineages somehow?
lineages = {}

for node in T.get_nonterminals(order='preorder'):
    #if the node's parent is in lineage already - it is too! So mark it and don't check it again!
    #I don't know if there's a way to short-circuit the traversal here... but this should mean it doens't check at least
    # (but it'll keep going down the tree)
     if node.parent.is_lineage == True:
         node.is_lineage = True
    else:
        # convert the node date into a date object too!
        node_date = datetime.datetime.strptime(node.date, '%Y-%m-%d')
        if node_date >= cutoffDate:
            #if it's after our cutoff, we want to count the seqs
            for leaf in node.get_terminals():
                #cycle through the leaves and count up how many are swiss

            if number_swiss > swiss_number_cutoff  #pseudo-code
                #we'll need to store this lineage somehow
                #we could either just store it and come back to get the swiss tip dates later,
                #or we could gather up the get_terminals() swiss sequences & store a list of their dates now!
                lineages[ ... ] =  ...

                #mark that we have already decided this is a lineage!
                node.is_lineage = True

# We should now go through the tree again, but this time, gather up
# all the dates of all Swiss tips that are from nodes after 1 June.. this will be our 
# 'Total' that we'll use as the bottom of our fraction :)
# (So like the above but without checking for # of swiss seqs - just taking dates for all swiss seqs!)
# But again... we need to be careful not to double-count! so will need to mark what's already counted

#Once we have some lists of dates, we can convert these into 'numbers per week'...
# This is code from clusterDynamics.py, where country_dates[coun] is the list of all the dates for a country
# Here, we'll want to use the list of all the dates per lineage, and then in total!

clus_week_counts = {}
for coun in all_countries:
    counts_by_week = defaultdict(int)
    for dat in country_dates[coun]:
        counts_by_week[dat.isocalendar()[1]]+=1  #returns ISO calendar week
    clus_week_counts[coun] = counts_by_week

#(might do the total count separately, or together)
# for moment let's pretend it's stored in total_week_counts
# a dictionary with just one key, 'total'

#More code from clusterDynamics.py
# We convert into a dataframe and then sort by weeks:# Convert into dataframe
cluster_data = pd.DataFrame(data=clus_week_counts)
total_data = pd.DataFrame(data=total_week_counts)

total_data=total_data.sort_index()
cluster_data=cluster_data.sort_index()

# A function from clusterDynamics.py which
# gives us back 'ready to plot' data by filtering out weeks
# for which we have no counts!
# here I'm pretending our total_data only has one entry, 'total'
# rather than an entry per country as it does in the original code

def non_zero_counts(cluster_data, country):

    cluster_and_total = pd.concat([cluster_data[country], total_data["total"]], axis=1).fillna(0)
    with_data = cluster_and_total.iloc[:,1]>0

    #this lets us plot X axis as dates rather than weeks (I struggle with weeks...)
    week_as_date = [ datetime.datetime.strptime("2020-W{}-1".format(x), '%G-W%V-%u')
                     for x in cluster_and_total.index[with_data] ]
    cluster_count = cluster_and_total[with_data].iloc[:,0]
    total_count = cluster_and_total[with_data].iloc[:,1]

    return week_as_date, np.array(cluster_count), np.array(total_count)



# raw code from clusterDynamics.py but this uses the above
# function to plot!
# You'd need to make your own 'country_styles' - see
# colors_and_countries.py for how this is defined originally!

# this plots 3 axes but you only need one :)

fs = 14
fig, (ax1, ax2, ax3) = plt.subplots(nrows=3, sharex=True,figsize=(10,7),
                                    gridspec_kw={'height_ratios':[1,1,3]})

# here you'll need to loop over the lineages, not countries!
for coun in [x for x in countries_to_plot]:
    week_as_date, cluster_count, total_count = non_zero_counts(cluster_data, coun)

    ax3.plot(week_as_date, cluster_count/total_count,
             color=country_styles[coun]['c'],
             linestyle=country_styles[coun]['ls'], label=coun)
    ax3.scatter(week_as_date, cluster_count/total_count, s=[marker_size(n) for n in total_count],
             color=country_styles[coun]['c'],
             linestyle=country_styles[coun]['ls'])

plt.legend(ncol=1, fontsize=fs*0.8, loc=2)
fig.autofmt_xdate(rotation=30)
ax3.tick_params(labelsize=fs*0.8)
ax3.set_ylabel('frequency')
plt.show()
plt.tight_layout()


# We would want to adjust this plot so that it is 'filled space'
# so that all the lineages (and any tips not in lineages) add up to 1 on the y-axis
# Hopefully that makes sense!
# but this could be tackled after the above is working...!