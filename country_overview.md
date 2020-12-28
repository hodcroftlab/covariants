# Overview of Clusters in Countries with >20 Sequences in any Cluster

Graphs show the proportion of total number of sequences, over time, that fall into defined clusters/mutation groups. 
From a pre-selected list of countries (see [colors_and_countries.py](scripts/colors_and_countries.py)), countries are displayed if they have at least 20 sequences in any cluster being tracked.

Note that sequences with the 69 deletion in Spike are not shown on these plots as they commonly are found in the clusters of S:N439K, S:Y453F, and S:N501, so they would be 'double-plotted'.

It is worth interpreting with caution:
- The last data point - this often has incomplete data and may change as more sequences come in
- Frequencies that are very 'jagged' - this often indicates low sequencing numbers and so may not be truly representative of the country

![Cluster in Countries](/overall_trends_figures/EUClusters_compare.png)
