from Bio import Phylo
from augur.utils import read_metadata, read_node_data
from augur.export_v2 import parse_node_data_and_metadata
import treetime

# copy files from clusone run into ncov and run from there:

treefile = "results/clusone/tree.nwk"
branchfile = "results/clusone/branch_lengths.json"
metadatafile = "data/metadata.tsv"
alignfile = "results/clusone/subsampled_alignment.fasta"

T = Phylo.read(treefile, "newick")
node_data = read_node_data([branchfile])

# make tree 'divergence' tree
tt = treetime.TreeAnc(tree=T, aln=alignfile)
tt.optimize_tree()

node_data, node_attrs, node_data_names, metadata_names = parse_node_data_and_metadata(
    T, [branchfile], metadatafile
)
rate = node_data["clock"]["rate"]

for node in T.find_clades(order="postorder"):
    data = node_data["nodes"][node.name]
    node.date = data["date"]
    node.num_date = data["numdate"]
    node.mut_length = round(data["mutation_length"])
    raw_data = node_attrs[node.name]
    node.country = raw_data["country"] if "country" in raw_data else ""
    node.division = raw_data["division"] if "division" in raw_data else ""

# set parents to avoid excess tree-traversal
for node in T.find_clades(order="preorder"):
    for child in node:
        child.parent = node


def lookup_by_names(tree):
    names = {}
    for clade in tree.find_clades():
        if clade.name:
            if clade.name in names:
                raise ValueError("Duplicate key: %s" % clade.name)
            names[clade.name] = clade
    return names


names = lookup_by_names(T)

# find better way to find start of cluster
# this is starting where there's 2876 children
start = names["NODE_0002406"]

for child in names["NODE_0002406"]:
    print(child.name)

cluster = T.from_clade(start)

for node in cluster.find_clades(order="preorder"):
    node.num_seqs = 0
    node.countries = []

import networkx as nx
import pandas as pd

frmN = []
toN = []

for node in cluster.find_clades(order="preorder"):
    if node.is_terminal():
        node.parent.num_seqs += 1
        node.parent.countries.append(node.country)
    else:
        frmN.append(node.parent.name)
        toN.append(node.name)

df = pd.DataFrame({"from": frmN, "to": toN})

# Build your graph
G = nx.from_pandas_edgelist(df, "from", "to")

# Plot it
nx.draw(G, with_labels=True)
plt.show()


# associated with spanish seqs
for node in cluster.find_clades(order="preorder"):
    node.spanish = False

spanish_nodes = []
for node in cluster.find_clades(order="preorder"):
    node.num_seqs = 0
    node.countries = []

for node in cluster.find_clades(order="preorder"):
    if node.is_terminal():
        if node.country == "Spain" and node.mut_length == 0:
            node.parent.spanish = True
            if node.parent not in spanish_nodes:
                spanish_nodes.append(node.parent)

for node in cluster.get_terminals(order="preorder"):
    tip = node
    while node.parent.name != start.name and node.parent.spanish == False:
        node = node.parent
    if node.parent.name == start.name:
        print("warning, never found a spanish parent for {}".format(tip.name))
    elif node.parent.spanish == True:
        node.parent.num_seqs += 1
        node.parent.countries.append(tip.country)

frmN = []
toN = []

for node in spanish_nodes:
    tip = node
    while node.parent.name != start.name and node.parent.spanish == False:
        node = node.parent
    if node.parent.name == start.name:
        print("warning, never found a spanish parent for {}".format(tip.name))
        frmN.append(start.name)
        toN.append(tip.name)
    elif node.parent.spanish == True:
        frmN.append(node.parent.name)
        toN.append(tip.name)

df = pd.DataFrame({"from": frmN, "to": toN})

# Build your graph
G = nx.from_pandas_edgelist(df, "from", "to")

# Plot it
nx.draw(G, with_labels=True)
plt.show()

from collections import Counter
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

spanish_attr = {}
for node in spanish_nodes:
    spanish_attr[node.name] = Counter(node.countries)

# manually add the 'root'
if start.name not in spanish_attr:
    spanish_attr[start.name] = Counter([])

node_counts = pd.DataFrame(data=spanish_attr)
node_counts = node_counts.fillna(0)
node_counts = node_counts.sort_index()

# make colors
# for coun in node_counts.index:

country_colors = {
    "Spain": "#e6194B",
    "United Kingdom": "#911eb4",
    "Ireland": "#f58231",
    "Netherlands": "#ffe119",
    "Switzerland": "#bfef45",
    "France": "#3cb44b",
    "Norway": "#42d4f4",
    "Belgium": "#4363d8",
    "Italy": "#f032e6",
    "Germany": "#000075",
    "Latvia": "#000000",
    "Hong Kong": "#a9a9a9",
}

colors_only = [
    "#e6194B",
    "#911eb4",
    "#f58231",
    "#ffe119",
    "#bfef45",
    "#3cb44b",
    "#42d4f4",
    "#4363d8",
    "#f032e6",
    "#000075",
    "#000000",
    "#a9a9a9",
]

# make color patches for legend
ptchs = []
for key in country_colors.keys():
    patch = mpatches.Patch(color=country_colors[key], label=key)
    ptchs.append(patch)

spanish_dict = {}
for node in spanish_nodes:
    spanish_dict[node.name] = node

# again manually add root
if start.name not in spanish_dict:
    spanish_dict[start.name] = start


nx.draw(G, with_labels=True)
pos = nx.spring_layout(G, k=0.5)

nx.draw_networkx_edges(G, pos=pos, with_labels=True)
for node in G.nodes:
    plt.pie(node_counts[node], colors=colors_only, center=pos[node], radius=0.07)
    plt.text(pos[node][0], pos[node][1], sum(node_counts[node]))

plt.legend(handles=ptchs, loc=(0.8, 0.3))
plt.ylim(-1, 1.5)
plt.xlim(-1, 1.5)
plt.tight_layout()


plt.legend(handles=ptchs)

plt.tight_layout()
plt.show()
