# The first part of this script needs to be run after running tree_pie_plot.py
# In order to have the phylogeny loaded

# Then the second part needs to be run after running most/some of
# clusterDynamics.py - to link with metadata and get dates
# and then plot changes over time by week (as in original plot)

################## ################## ################## 
##################  FIRST PART
#Get growth of specific swiss clusters
# For this we'll use the tree to get the sequeneces from each intro
# Then we need to move to other script to compare...

# Use the graph with the node names + node_countries to figure
# out what Intros you want to pull out & plot

# We want for H, V, and X+[ (together)
char_names_wanted = ['H', 'V', 'X', '[']


# For 19 Oct - these are the four intros I chose by looking at node_countries
# for two I combine multiple nodes that chain from each other
# K
# \ ` a  -NO d
# F Q T - NOT THIS ONE BAD
# i

char_names_wanted = ['K', '\\', 'i']


intro_nodes_map = {}
intro_nodes = []
for key in node_names.keys():
    if node_names[key] in char_names_wanted:
        intro_nodes_map[node_names[key]] = key
        intro_nodes.append(key)

list_of_seqs = {}
for want_node in intro_nodes:
    for node in cluster.find_clades(order='postorder'):
        if node.name == want_node:
            list_of_seqs[node_names[want_node]] = [leaf.name for leaf in node.get_terminals() if leaf.country == "Switzerland" ]

#combine X and [
list_of_seqs["X"].extend(list_of_seqs["["])
list_of_seqs.pop("[")

#list_of_seqs['\\'].extend(list_of_seqs['`'])
#list_of_seqs['\\'].extend(list_of_seqs['a'])
#list_of_seqs['\\'].extend(list_of_seqs['d'])
#list_of_seqs.pop('`')
#list_of_seqs.pop('a')
#list_of_seqs.pop('d')
#
#list_of_seqs['F'].extend(list_of_seqs['Q'])
#list_of_seqs['F'].extend(list_of_seqs['T'])
#list_of_seqs.pop('Q')
#list_of_seqs.pop('T')


################## ################## ################## 
################## ################## ################## 
##################  SECOND PART

# Need to run this after running all the stuff related to logistic plotting

###
# Try logistic fit plots for multiple introductions into switzerland
# Note you'll need to use tree_pie_plot.py (very bottom) to get the list of
# sequences for each intro that you pick.

#what country are we looking at introductions for?
intro_country = "Switzerland"

intro_dates = {}
# Get dates for the sequences:
for coun in list_of_seqs.keys():
    dates = [datetime.datetime.strptime(meta[meta.strain == seq].date.values[0], '%Y-%m-%d') for seq in list_of_seqs[coun]]
    intro_dates[coun] = dates

# To avoid the up-and-down of dates, bin samples into weeks

# Get counts per week for sequences in the cluster
intro_week_counts = {}
for coun in list_of_seqs.keys():
    counts_by_week = defaultdict(int)
    for dat in intro_dates[coun]:
        counts_by_week[dat.isocalendar()[1]]+=1  #returns ISO calendar week
    intro_week_counts[coun] = counts_by_week

intro_data = pd.DataFrame(data=intro_week_counts)
intro_data=intro_data.sort_index()

def non_zero_counts_intros(cluster_data, intro_id, country):
    cluster_and_total = pd.concat([cluster_data[intro_id], total_data[country]], axis=1).fillna(0)
    with_data = cluster_and_total.iloc[:,1]>0

    #this lets us plot X axis as dates rather than weeks (I struggle with weeks...)
    week_as_date = [ datetime.datetime.strptime("2020-W{}-1".format(x), '%G-W%V-%u')
                     for x in cluster_and_total.index[with_data] ]
    #plt.plot(weeks.index[with_data], weeks.loc[with_data].iloc[:,0]/(total[with_data]), 'o', color=palette[i], label=coun, linestyle=sty)
    cluster_count = cluster_and_total[with_data].iloc[:,0]
    total_count = cluster_and_total[with_data].iloc[:,1]

    return week_as_date, np.array(cluster_count), np.array(total_count)

#to let us use the country style stuff
fake_countries = ["United Kingdom", "Switzerland", "Spain", "Belgium"]

fig = plt.figure()
from scipy.stats import scoreatpercentile
rates = {}
n_bootstraps=100
i = 0
for coun in list_of_seqs.keys():
    fake_coun = fake_countries[i]
    week_as_date, cluster_count, total_count = non_zero_counts_intros(intro_data, coun, intro_country)
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
                 color=country_styles[fake_coun]['c'],
                 linestyle=country_styles[fake_coun]['ls'])

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

    plt.plot(week_as_date, logistic(days, center_fit['x'][0], center_fit['x'][1]),
             c=country_styles[fake_coun]['c'], ls=country_styles[fake_coun]['ls'],
             label = f"{coun}, growth rate: {rates[coun]['center']*700:1.1f}({rates[coun]['lower']*700:1.1f}-{rates[coun]['upper']*700:1.1f})%/week")
    print(f"{coun} growth rate: {rates[coun]['center']*700:1.2f}% per week")
    i+=1

plt.legend()
fig.autofmt_xdate(rotation=30)
plt.ylabel('frequency')
plt.tight_layout()