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
import networkx as nx
import pandas as pd

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

#this has to be set manually
start = names["NODE_0003268"]   #["NODE_0002406"]

#back up the original tree so we don't hve to optimize again if we mess up...
T_backup = copy.deepcopy(T)

#Make a subtree of the cluster so we can just work with that
cluster = T.from_clade(start)

# Make another name dictionary to locate nodes by name
clus_names = lookup_by_names(cluster)

# Count up countries that the nodes leaf-children come from
for node in cluster.find_clades(order='postorder'):
    node.countries = []
    node.total_countries = []

for node in cluster.find_clades(order='postorder'):
    if node.is_terminal():
        node.parent.countries.append(node.country)

#How many internals do we start with?
len(cluster.get_nonterminals())
#481

# for each internal node - if only has leaf children from 1 country
# then collapse this node - its children go to its parent, it disappears
for node in cluster.get_nonterminals(order='postorder'):
    if node.is_preterminal():
        node.countries = []
        for leaf in node.get_terminals():
            node.countries.append(leaf.country)
        if len(set(node.countries)) == 1:
            cluster.collapse(target=node)

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
        node.parent.total_countries.append(node.country)

# Gather up the country counts for each node:
node_attr = {}
for node in cluster.get_nonterminals(order='postorder'):
    node_attr[node.name] = Counter(node.total_countries)


# make dataframe out of the counts
node_counts = pd.DataFrame(data=node_attr)
node_counts = node_counts.fillna(0)
node_counts=node_counts.sort_index()

### Set and order the colors we are going to use!
# Ensure number of countries hasn't changed... or will need more colors!
colors_only = [
    "#bfef45",
    "#3cb44b",
    "#000075",
    "#a9a9a9",
    "#f58231",
    "#f032e6",
    "#000000",
    "#ffe119",
    "#42d4f4",
    "#e6194B",
    "#4363d8",
    "#911eb4"]

country_colors = {}
for i in range(len(node_counts.index)):
    country_colors[node_counts.index[i]] = colors_only[i]

#make color patches for legend
ptchs = []
for key in country_colors.keys():
    patch = mpatches.Patch(color=country_colors[key], label=key)
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
    node_names[node.name] = ch
    node_countries[ch] = {}
    print(ch)
    for i in range(len(node_counts.index)):
        if node_counts[node.name][i] != 0:
            print("\t", node_counts.index[i], node_counts[node.name][i])
            node_countries[ch][node_counts.index[i]] = node_counts[node.name][i]
    ch = chr(ord(ch) + 1)

# Actually plot!
Phylo.draw(cluster2, label_func=lambda x:'')
for node in cluster2.find_clades(order="preorder"):
    counts = node_counts[node.name]
    draw_pie(ax=plt.gca(), ratios=[x/sum(counts) for x in counts], 
        colors=colors_only, X=node.x, Y=node.y, size=700)
    plt.text(node.x+0.00001, node.y, round(sum(counts)))
    plt.text(node.x-0.000015, node.y, node_names[node.name] )
plt.axis('off')
plt.legend(handles=ptchs)

plt.savefig(figure_path+"pie_tree.png")
trends_path = figure_path+"pie_tree.png"
copypath = trends_path.replace("tree", "tree-{}".format(datetime.date.today().strftime("%Y-%m-%d")))
copyfile(trends_path, copypath)



##############
# Now repeat for the UK only
