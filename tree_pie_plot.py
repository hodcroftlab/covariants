#This should be run from within 'ncov' repo
# Note there is a manual step where you need to decide
# where the 'cluster' starts! Suggest opening 'tree.nwk'
# in Figtree and figuring out node name from this.

# You need to have updated the files below - copy into 'ncov'
treefile = "results/clusone/tree.nwk"
branchfile = "results/clusone/branch_lengths.json"
metadatafile = "data/metadata.tsv"
alignfile = "results/clusone/subsampled_alignment.fasta"

# Path to write figures to
figure_path = "../cluster_scripts/figures/"
fmt = 'pdf'

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
from colors_and_countries import *

# Read in the tree, and add node data
T = Phylo.read(treefile, 'newick')
node_data = read_node_data([branchfile])

# make tree 'divergence' tree (collapse tiny polytomies)
tt = treetime.TreeAnc(tree = T, aln =alignfile)
tt.optimize_tree()

# read in extra node data and put it on the tree
node_data, node_attrs, node_data_names, metadata_names = parse_node_data_and_metadata(T, [branchfile], metadatafile)
rate = node_data['clock']['rate']

for node in T.find_clades(order='postorder'):
    data = node_data['nodes'][node.name]
    node.date = data['date']
    node.num_date = data['numdate']
    node.mut_length = round(data['mutation_length'])
    raw_data = node_attrs[node.name]
    node.country = raw_data["country"] if 'country' in raw_data else ''
    node.division = raw_data["division"] if 'division' in raw_data else ''

#set parents to avoid excess tree-traversal
for node in T.find_clades(order='preorder'):
    for child in node:
        child.parent = node

# Create a dictionary to find nodes by name
def lookup_by_names(tree):
    names = {}
    for clade in tree.find_clades():
        if clade.name:
            if clade.name in names:
                raise ValueError("Duplicate key: %s" % clade.name)
            names[clade.name] = clade
    return names

names = lookup_by_names(T)


###############################
###############################

# set whether UK run or not
uk_run = False

#this has to be set manually
start = names["NODE_0003268"]   #["NODE_0002406"]

#back up the original tree so we don't hve to optimize again if we mess up...
T_backup = copy.deepcopy(T)

#Make a subtree of the cluster so we can just work with that
cluster = T.from_clade(start)

######## UK RERUN FROM HERE

# Make another name dictionary to locate nodes by name
clus_names = lookup_by_names(cluster)

# Count up countries that the nodes leaf-children come from
for node in cluster.find_clades(order='postorder'):
    node.countries = []
    node.total_countries = []

#for node in cluster.find_clades(order='postorder'):
#    if node.is_terminal():
#        if not uk_run:
#            node.parent.countries.append(node.country)
#        else:
#            if node.country == "United Kingdom":
#                node.parent.countries.append(node.division)
#            elif node.country in also_uk_countries:
#                node.parent.countries.append(node.country)
#            else
#                node.parent.countries.append("Other")

#How many internals do we start with?
len(cluster.get_nonterminals())
#481

# for each internal node - if only has leaf children from 1 country
# then collapse this node - its children go to its parent, it disappears
for node in cluster.get_nonterminals(order='postorder'):
    if node.is_preterminal():
        node.countries = []
        for leaf in node.get_terminals():
            if not uk_run:
                node.countries.append(leaf.country)
            else:
                if leaf.country == "United Kingdom":
                    node.countries.append(leaf.division)
                elif leaf.country in also_uk_countries:
                    node.countries.append(leaf.country)
                else:
                    node.countries.append("Other")
        if len(set(node.countries)) == 1:
            #print("collapsing {} with {}".format(node.name, set(node.countries)))
            cluster.collapse(target=node)
        #else:
            #print("not collapsing {} with {}".format(node.name, set(node.countries)))


#reassign parents since we deleted a bunch:
for node in cluster.find_clades(order='preorder'):
    for child in node:
        child.parent = node

#how many internals are left?
len(cluster.get_nonterminals())
#45

# A lot of nodes will have gained children from collapsed nodes
# so recount the countries!
for node in cluster.find_clades(order='postorder'):
    if node.is_terminal():
        if not uk_run:
            node.parent.total_countries.append(node.country)
        else:
            if node.country == "United Kingdom":
                node.parent.total_countries.append(node.division)
            elif node.country in also_uk_countries:
                node.parent.total_countries.append(node.country)
            else:
                node.parent.total_countries.append("Other")

# Gather up the country counts for each node:
node_attr = {}
for node in cluster.get_nonterminals(order='postorder'):
    node_attr[node.name] = Counter(node.total_countries)


# make dataframe out of the counts
node_counts = pd.DataFrame(data=node_attr)
node_counts = node_counts.fillna(0)
node_counts=node_counts.sort_index()


#make color patches for legend
ptchs = []
for key in node_counts.index:
    patch = mpatches.Patch(color=country_styles[key]['c'], label=key)
    ptchs.append(patch)


#Copy our cluster, and then delete/collapse all the tips! (for plotting)
cluster2 = copy.deepcopy(cluster)

for node in cluster2.get_terminals(order='postorder'):
        cluster2.collapse(target=node)

# Calculate the Y plotting values for each node
terminal_counter = 1
for n in cluster2.find_clades(order='postorder'):
    if n.is_terminal():
        n.y = terminal_counter
        terminal_counter += 1
    else:
        kids_y = [c.y for c in n]
        n.y = 0.5*(np.max(kids_y) + np.min(kids_y))

# Calculate the X plotting values for each node
cluster2.root.x = cluster2.root.branch_length
for n in cluster2.get_nonterminals(order='preorder'):
    for c in n:
        c.x = n.x + c.branch_length

# Function to draw pie charts
def draw_pie(ax, ratios=[0.4,0.3,0.3], colors=["red", "blue"], X=0, Y=0, size = 1000):
    N = len(ratios)
    xy = []
    start = 0.
    for ratio in ratios:
        x = [0] + np.cos(np.linspace(2*math.pi*start,2*math.pi*(start+ratio), 30)).tolist()
        y = [0] + np.sin(np.linspace(2*math.pi*start,2*math.pi*(start+ratio), 30)).tolist()
        xy1 = list(zip(x,y))
        xy.append(xy1)
        start += ratio
    for i, xyi in enumerate(xy):
        ax.scatter([X],[Y] , marker=xyi, s=size, facecolor=colors[i] )

# Give each node a character name to make the easier to discuss/identify
# Also store country counts for each node by this name (so can associate
# the graph and data)
ch = 'A'
node_names = {}
node_countries = {}
for node in cluster2.find_clades(order="preorder"):
    node.color='grey'
    node_names[node.name] = ch
    node_countries[ch] = {}
    print(ch)
    for i in range(len(node_counts.index)):
        if node_counts[node.name][i] != 0:
            print("\t", node_counts.index[i], node_counts[node.name][i])
            node_countries[ch][node_counts.index[i]] = node_counts[node.name][i]
    ch = chr(ord(ch) + 1)

# Actually plot!
fs = 16
fig = plt.figure(figsize=(12,10))
ax = fig.add_subplot(1,1,1)
Phylo.draw(cluster2, label_func=lambda x:'', axes=ax,
           branch_labels=lambda x: ",".join([f"{a}{p+1}{d}" for a,p,d in x.mutations]))

for node in cluster2.find_clades(order="preorder"):
    counts = node_counts[node.name].to_dict()
    sqrt_counts = np.array([x for k,x in counts.items() if x>0])**0.25
    total_counts = sum(list(counts.values()))
    nonzero = [k for k,x in counts.items() if x>0]
    draw_pie(ax=plt.gca(), ratios=[x/sqrt_counts.sum() for x in sqrt_counts],
        colors=[country_styles[c]['c'] for c in nonzero], X=node.x, Y=node.y,
        size=200*np.sum(total_counts)**0.25)
    # plt.text(node.x+0.00001, node.y, int(sum(list(counts.values()))))
    # plt.text(node.x-0.000015, node.y, node_names[node.name] )

for ni,n in enumerate([1,10,100]):
    ax.scatter([0.00002*(ni+1)], [2], s=200*np.sum(n)**0.25, edgecolor='k', facecolor='w')
    ax.text(0.000018*(ni+1), 3, f"n={n}")

plt.axis('off')
plt.legend(handles=ptchs, loc=3, fontsize=fs)
plt.tight_layout()

if not uk_run:
    tree_path = figure_path+f"pie_tree.{fmt}"
else:
    tree_path = figure_path+f"uk_pie_tree.{fmt}"

plt.savefig(tree_path)
copypath = tree_path.replace("tree", "tree-{}".format(datetime.date.today().strftime("%Y-%m-%d")))
copyfile(tree_path, copypath)



##############
# Now repeat for the UK only
uk_countries = ['Scotland', 'England', 'Wales', 'Northern Ireland']

# go back to original tree and take the cluster again
T_uk = copy.deepcopy(T_backup)

#Make a subtree of the cluster so we can just work with that
cluster = T_uk.from_clade(start)

#make it a UK run
uk_run = True

also_uk_countries = ["Ireland", "Spain"]

