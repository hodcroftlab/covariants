#This should be run from within 'ncov' repo
# Note there is a manual step where you need to decide
# where the 'cluster' starts! Suggest opening 'tree.nwk'
# in Figtree and figuring out node name from this.

# You need to have updated the files below - copy into 'ncov'
#treefile = "results/clusone/tree.nwk"

#branchfile = "results/clusone/branch_lengths.json"
metadatafile = "data/metadata.tsv"
#metadatafile = "data/metadata-2020-11-11.tsv"
#alignfile = "results/clusone/subsampled_alignment.fasta"

#For November 30 data
alignfile = "results/clusone/subsampled_alignment-2020-11-30.fasta"
nt_muts = "results/clusone/nt_muts-2020-11-30.json"
treefile = "results/clusone/tree_treetime-2020-11-30.nwk"
figure_path = "../covariants/through_Nov_data/figures/"

# For Sept 30 data
alignfile = "results/clusone/subsampled_alignment-2020-09-30.fasta"
nt_muts = "results/clusone/branch_lengths-2020-09-30.json"
treefile = "results/clusone/tree-2020-09-30.nwk"
figure_path = "../cluster_scripts/through_Sept_data/figures/"

# Path to write figures to
#figure_path = "../cluster_scripts/figures/"

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
import json
import datetime
from shutil import copyfile
from collections import defaultdict
import copy
import pandas as pd
from colors_and_countries import *

def read_tree(treefile, alignfile):
    # Read in the tree, and add node data
    # make tree 'divergence' tree (collapse tiny polytomies)
    tt = treetime.TreeAnc(tree = treefile, aln =alignfile)
    tt.optimize_tree()
    T=tt.tree

    # read in extra node data and put it on the tree
    node_data, node_attrs, node_data_names, metadata_names = parse_node_data_and_metadata(T, [nt_muts], metadatafile)
    #node_data, node_attrs, node_data_names, metadata_names = parse_node_data_and_metadata(T, [branchfile], metadatafile)
    #rate = node_data['clock']['rate']

    for node in T.find_clades(order='postorder'):
        data = node_data['nodes'][node.name]
        #node.date = data['date']
        #node.num_date = data['numdate']
        #node.mut_length = round(data['mutation_length'])
        node.mut_length = node.mutation_length
        raw_data = node_attrs[node.name]
        node.country = raw_data["country"] if 'country' in raw_data else ''
        node.division = raw_data["division"] if 'division' in raw_data else ''

    #set parents to avoid excess tree-traversal
    for node in T.find_clades(order='preorder'):
        for child in node:
            child.parent = node

    return T


# Create a dictionary to find nodes by name
def lookup_by_names(tree):
    names = {}
    for clade in tree.find_clades():
        if clade.name:
            if clade.name in names:
                raise ValueError("Duplicate key: %s" % clade.name)
            names[clade.name] = clade
    return names

def find_EU1_root(T):
    potential_roots = []
    for n in T.find_clades():
        if ('C',22226,'T') in n.mutations:
            potential_roots.append(n)
    potential_roots.sort(key=lambda x:x.count_terminals())
    return potential_roots[-1]

def count_unique_sequences(tree):
    unique_seqs = 0
    for node in tree.get_nonterminals(order='postorder'):
        # if node has at least one terminal child
        has_ident_seq = False
        # cycle through children
        for leaf in node.clades:
            if leaf.is_terminal():
                mutations = list(filter(lambda x: x[2] != 'N', leaf.mutations))
                if len(mutations) > 0:
                    unique_seqs+=1
                elif len(mutations) == 0:
                    has_ident_seq = True
        if has_ident_seq:
            unique_seqs+=1

    return unique_seqs


def resample_country(node_countries, country):
    total_sequences = np.sum([x.get(country, 0) for x in node_countries.values()])

    fractions = np.linspace(0.01,1.0, 30)
    expected_intros = []
    for frac in fractions:
        expected_intros.append(np.sum([1-np.exp(-frac*x.get(country, 0)) for x in node_countries.values()]))

    return {"n_seqs":fractions*total_sequences, "expected_intros":expected_intros, "total_sequences":total_sequences}

###############################
###############################

#this has to be set manually
#start = names['NODE_0001008'] #["NODE_0000814"]  # ["NODE_0003268"]   #["NODE_0002406"]
#start = names['NODE_0004656']#['NODE_0002374'] #['NODE_0001979'] #['NODE_0001981']

T_backup = read_tree(treefile, alignfile)

# find the EU 1 root
start = find_EU1_root(T_backup)


######## RERUN FROM HERE

#back up the original tree so we don't hve to optimize again if we mess up...
T = copy.deepcopy(T_backup)
names = lookup_by_names(T)

#Make a subtree of the cluster so we can just work with that
cluster = T.from_clade(names[start.name])


######################
######################
# get number of unique sequences
unique_seqs = count_unique_sequences(cluster)


# Make another name dictionary to locate nodes by name
clus_names = lookup_by_names(cluster)

# Count up countries that the nodes leaf-children come from
for node in cluster.find_clades(order='postorder'):
    node.countries = []
    node.total_countries = []

#find out how many seqs from each country
#for node in cluster.get_nonterminals(order='postorder'):
#    if node.is_preterminal():
#        node

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
print(f"number of terminals pre collapsing: {len(cluster.get_nonterminals())}")
#481
#576
#710
#715
#1106
#836
#1140
#851

select_run = True
uk_run = False
if select_run:
    selected_countries = ["Spain", "Switzerland", "United Kingdom", "Ireland", "Denmark", "Norway", "Iceland"]
else:
    selected_countries = list({n.country for n in cluster.get_terminals()})

if uk_run:
    selected_countries.extend(['Scotland', 'England', 'Wales', 'Northern Ireland'])

for leaf in cluster.get_terminals():
    if uk_run and leaf.country == "United Kingdom":
        leaf.cluster_country = leaf.division
    elif leaf.country in selected_countries:
        leaf.cluster_country = leaf.country
    else:
        leaf.cluster_country = "Other"


# for each internal node - if only has leaf children from 1 country
# then collapse this node - its children go to its parent, it disappears
for node in cluster.get_nonterminals(order='postorder'):
    if node.is_preterminal():
        node.countries = []
        for leaf in node.get_terminals():
            node.countries.append(leaf.cluster_country)

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
print(f"number of terminals after collapsing: {len(cluster.get_nonterminals())}")
#45
#60
#66
#71
#79
#133
#384
#226
#207 - with selected_countries

# A lot of nodes will have gained children from collapsed nodes
# so recount the countries!
for node in cluster.find_clades(order='postorder'):
    if node.is_terminal():
        if not uk_run:
            node.parent.total_countries.append(node.cluster_country)
        else:
            if node.country == "United Kingdom":
                node.parent.total_countries.append(node.division)
            elif node.country in also_uk_countries:
                node.parent.total_countries.append(node.country)
            else:
                node.parent.total_countries.append("Other")

# Gather up the country counts for each node:
country_count_by_node = {}
for node in cluster.get_nonterminals(order='postorder'):
    country_count_by_node[node.name] = Counter(node.total_countries)


# make dataframe out of the counts
node_counts = pd.DataFrame(data=country_count_by_node)
node_counts = node_counts.fillna(0)
node_counts = node_counts.sort_index()

countries_clusters = {}
for coun in node_counts.index:
    countries_clusters[coun] = defaultdict()
#get lists of sequences per node per 'slice'
for node in cluster.find_clades(order='postorder'):
    for child in node:
        if child.is_terminal():
            #if node.country not in countries_clusters:
            #    countries_clusters[child.country] = {}
            if node.name not in countries_clusters[child.cluster_country]:
                countries_clusters[child.cluster_country][node.name] = {}
                countries_clusters[child.cluster_country][node.name]["sequences"] = []
            countries_clusters[child.cluster_country][node.name]["sequences"].append(child.name)
            if hasattr(node.parent, "total_countries") and child.cluster_country in node.parent.total_countries:
                countries_clusters[child.cluster_country][node.name]["parent"] = f"is a child of {node.parent.name}, which also contains nodes from {child.cluster_country}"

with open(figure_path+f'pie_tree_asFigure_data.json', 'w') as fh:
    json.dump(countries_clusters, fh)

#Copy our cluster, and then delete/collapse all the tips! (for plotting)
cluster2 = copy.deepcopy(cluster)

for node in cluster2.get_terminals(order='postorder'):
        cluster2.collapse(target=node)

cluster2.ladderize()

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
    for ci,c in enumerate(n):
        if (c.branch_length - 1.0/29900) < 1e-6:
            c.branch_length *= 0.6 + 0.8*np.random.random()
            # if (len(c)>2):
            #     c.branch_length *= 0.75 + 0.25*(ci%3)
            # else:
            #     c.branch_length *= 0.75 + 0.5*(ci%2)
        c.x = n.x + c.branch_length

# Function to draw pie charts
def draw_pie(ax, ratios=[0.4,0.3,0.3], colors=["red", "blue"], X=0, Y=0, size = 1000, zorder=10):
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
        ax.scatter([X],[Y] , marker=xyi, s=size, facecolor=colors[i], zorder=zorder)

# Give each node a character name to make the easier to discuss/identify
# Also store country counts for each node by this name (so can associate
# the graph and data)
ch = 'A'
nextKey=''
node_names = {}
node_countries = {}
for node in cluster2.find_clades(order="preorder"):
    node.color='grey'
    new_name = nextKey+ch
    node_names[node.name] = new_name
    node_countries[new_name] = {}
    print(new_name)
    for i in range(len(node_counts.index)):
        if node_counts[node.name][i] != 0:
            print("\t", node_counts.index[i], node_counts[node.name][i])
            node_countries[new_name][node_counts.index[i]] = node_counts[node.name][i]
    if ch == "~":
        if nextKey != '':
            nextKey = chr(ord(nextKey) + 1)
        else:
            nextKey='A'
        ch='A'
    else:
        ch = chr(ord(ch) + 1)

# Use this function to list all nodes containing that country
# Or if you give 2 countries, nodes with both
def list_countries(wanted_country, second_country=None):
    i=0
    for no in node_countries.keys():
        if wanted_country in node_countries[no].keys():
            if second_country:
                if second_country in node_countries[no].keys():
                    print(no,": ",node_countries[no])
                    i+=1
            else:
                print(no,": ",node_countries[no])
                i+=1
    print("total: ", i)

#use this to count countries with direct shared diversity (on same node)
def most_shared_countries(wanted_country):
    other_country_count = defaultdict(int)
    for no in node_countries.keys():
        if wanted_country in node_countries[no].keys():
            for co in node_countries[no].keys():
                if co != wanted_country:
                    other_country_count[co]+=1
    print({k: v for k, v in sorted(other_country_count.items(), key=lambda item: item[1])})

# Use this to to count up the nodes with wanted_country that have second_country
# as a parent - but *not* shared diversity on the same node (only parent) (so will not
# include nodes identified with 'list_countries')
parent = {}
for node in cluster2.find_clades(order="preorder"):
    if node.parent and node.parent.name in node_names:
        parent[node_names[node.name]] = node_names[node.parent.name]

def list_parent_countries(wanted_country, second_country):
    i=0
    for no in node_countries.keys():
        if wanted_country in node_countries[no].keys() and second_country not in node_countries[no].keys():
            par = parent[no]
            if second_country in node_countries[par].keys():
                print(no,": ",node_countries[no])
                i+=1
    print("total: ",i)

# Actually plot!
fs = 16
fig = plt.figure(figsize=(12,14))
ax = fig.add_subplot(1,1,1)
Phylo.draw(cluster2, label_func=lambda x:'', axes=ax) #,
#           branch_labels=lambda x: ",".join([f"{a}{p+1}{d}" for a,p,d in x.mutations]))

country_colors = {}
if select_run:
    for coun in country_styles_all:
        if coun in selected_countries:
            country_colors[coun] = country_styles_all[coun]
        else:
            country_colors[coun] = {'c': "#BBBBBB" }
else:
    country_colors = country_styles_all


#make color patches for legend
ptchs = []
for key in selected_countries + ["Other"]:
    patch = mpatches.Patch(color=country_colors[key]['c'] if key in country_colors else '#BBBBBB', label=key)
    if key not in country_colors:
        print(f"color needed: {key}")
    ptchs.append(patch)

def marker_size(n):
    return 30*np.sum(n)**0.5

for node in cluster2.find_clades(order="preorder"):
    counts = node_counts[node.name].to_dict()
    sqrt_counts = np.array([x for k,x in counts.items() if x>0])**0.25
    total_counts = sum(list(counts.values()))
    nonzero = [k for k,x in counts.items() if x>0]
    draw_pie(ax=plt.gca(), ratios=[x/sqrt_counts.sum() for x in sqrt_counts],
        colors=[country_colors[c]['c'] if c in country_colors else "#CCCCCC" for c in nonzero], X=node.x, Y=node.y,
        size=marker_size(total_counts))
    # plt.text(node.x+0.00001, node.y, int(sum(list(counts.values()))))
    # plt.text(node.x-0.000015, node.y, node_names[node.name] )

for ni,n in enumerate([1,10,100, 1000]):
    ax.scatter([0.00002], [70 + ni*5], s=marker_size(n), edgecolor='k', facecolor='w')
    ax.text(0.000029, 70.8 + ni*5, f"n={n}")

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

plt.figure()
for country in selected_countries:
    res = resample_country(node_countries, country)
    plt.plot(res['n_seqs'], res['expected_intros'], label=f"{country} (n={int(res['total_sequences']):d})", lw=2,
        ls=country_colors[country]['ls'] if country in country_colors else "-",
        c=country_colors[country]['c'] if country in country_colors else "#CCCCCC")

plt.ylabel('unique genotypes')
plt.xlabel('number of sequences')
plt.xscale('log')
plt.legend()

##############
# Now repeat for the UK only

# go back to original tree and take the cluster again
T_uk = copy.deepcopy(T_backup)

#Make a subtree of the cluster so we can just work with that
cluster = T_uk.from_clade(start)

# #make it a UK run
# uk_run = True

# also_uk_countries = ["Ireland", "Spain"]


# ########################################################
# ##############
# # If you want to re-run the scripts in clusterDynamics.py
# # but with /real/ number of sequences from the cluster...

# #this will replace `wanted_seqs` which is the starting piont for everything.
# # be careful you don't overwrtite any files if you don't mean to!!

# real_wanted_seqs = []
# # use cluster as that's *just* the cluster
# for leaf in cluster.get_terminals(order='preorder'):
#     real_wanted_seqs.append(leaf.name)

# wanted_seqs = real_wanted_seqs