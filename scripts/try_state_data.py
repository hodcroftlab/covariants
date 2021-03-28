

selected_country = "USA"
division = True

for clus in clus_to_run:
    print(f"\nPreparing to plot cluster {clus}\n")

    clus_data = clusters[clus]
    #wanted_seqs = clus_data['wanted_seqs']
    clus_display = clus_data['build_name']
    cluster_meta = clus_data['cluster_meta']
    #observed_countries = clus_data['observed_countries']
    #country_dates = clus_data['country_dates']
    #country_info_df = clus_data['country_info_ordered']

    clus_data['cluster_data_div'] = []
    clus_data['total_data_div'] = []

    cluster_meta = cluster_meta[cluster_meta['country'].apply(lambda x: x == selected_country)]
    observed_divisions = [x for x in cluster_meta['division'].unique()]

    division_info, division_dates = get_summary(cluster_meta, observed_divisions, division=True)

    # Get counts per week for sequences in the cluster
    clus_week_counts = {}
    clus_2week_counts = {}
    for coun in observed_divisions:
        counts_by_week = defaultdict(int)
        counts_by_2week = defaultdict(int)
        for dat in division_dates[coun]:
            #counts_by_week[dat.timetuple().tm_yday//7]+=1 # old method
            #counts_by_week[dat.isocalendar()[1]]+=1  #returns ISO calendar week
            wk = dat.isocalendar()[1]#returns ISO calendar week
            wk2 = (dat.isocalendar()[1]//2*2) #returns ISO calendar week -every 2 weeks
            yr = dat.isocalendar()[0]
            yr_wk = (yr, wk)
            yr_2wk = (yr, wk2)
            counts_by_week[yr_wk]+=1
            counts_by_2week[yr_2wk]+=1
        clus_week_counts[coun] = counts_by_week
        clus_2week_counts[coun] = counts_by_2week

    # Get counts per week for sequences regardless of whether in the cluster or not - from week 20 only.
    total_week_counts = {}
    total_2week_counts = {}
    for coun in observed_divisions:
        counts_by_week = defaultdict(int)
        counts_by_2week = defaultdict(int)
        if coun in uk_countries or division:
            #temp_meta = meta[meta['division'].isin([coun])]
            temp_meta = meta[meta['division'].apply(lambda x: x == coun)]
        else:
            #temp_meta = meta[meta['country'].isin([coun])]
            temp_meta = meta[meta['country'].apply(lambda x: x == coun)]

        #temp_meta['calendar_week'] = temp_meta['date_formatted'].apply(lambda x: x.isocalendar()[1])
        temp_meta['calendar_week'] = temp_meta['date_formatted'].apply(lambda x: (x.isocalendar()[0], x.isocalendar()[1]))
        temp_meta = temp_meta[temp_meta['calendar_week']>=min_data_week]
        #If no samples are after min_data_week, will be empty!!
        if temp_meta.empty:
            continue

        week_counts = temp_meta['calendar_week'].value_counts().sort_index()
        counts_by_week = week_counts.to_dict()
        total_week_counts[coun] = counts_by_week

        # TWO WEEKS
        temp_meta['calendar_2week'] = temp_meta['date_formatted'].apply(lambda x: (x.isocalendar()[0], x.isocalendar()[1]//2*2))
        temp_meta = temp_meta[temp_meta['calendar_2week']>=min_data_week]
        week2_counts = temp_meta['calendar_2week'].value_counts().sort_index()
        counts_by_2week = week2_counts.to_dict()
        total_2week_counts[coun] = counts_by_2week

    # Convert into dataframe
    cluster_data = pd.DataFrame(data=clus_week_counts)
    total_data = pd.DataFrame(data=total_week_counts)
    # sort
    total_data=total_data.sort_index()
    cluster_data=cluster_data.sort_index()
    #store
    clus_data['cluster_data_div'] = cluster_data
    clus_data['total_data_div'] = total_data

    # Convert into dataframe -- 2 weeks
    cluster_data_2wk = pd.DataFrame(data=clus_2week_counts)
    total_data_2wk = pd.DataFrame(data=total_2week_counts)
    # sort
    total_data_2wk=total_data_2wk.sort_index()
    cluster_data_2wk=cluster_data_2wk.sort_index()
    #store
    clus_data['cluster_data_2wk_div'] = cluster_data_2wk
    clus_data['total_data_2wk_div'] = total_data_2wk

######################################################################################################
##################################

def get_ordered_clusters_to_plot_div(clusters):
    #fix cluster order in a list so it's reliable
    clus_keys = [x for x in clusters.keys()] #if x in clusters_tww]

    # DO NOT PLOT 69 AS IT OVERLAPS WITH 439 AND 501!!!!
    # Do not plot 484 as it overlaps with 501Y.V2, possibly others
    # Do not plot DanishCluster as also overlaps
    #clus_keys = [x for x in clus_keys if x not in ["S69","S484", "DanishCluster"]]
    clus_keys = [x for x in clus_keys if clusters[x]["type"] == "variant" or clusters[x]["usa_graph"] is True] #["graphing"] is True]

    divisions_all = defaultdict(dict)
    for clus in clus_keys:
        clus_dat = clusters[clus]["cluster_data_2wk_div"]
        for coun in clus_dat.columns:
            divisions_all[coun][clus] = clus_dat[coun]

    for clus in clus_keys:
        cluster_meta = clusters[clus]['cluster_meta']
        cluster_meta = cluster_meta[cluster_meta['country'].apply(lambda x: x == selected_country)]
        observed_divisions = [x for x in cluster_meta['division'].unique()]
        division_info, division_dates = get_summary(cluster_meta, observed_divisions, division=True)
        division_info_df = pd.DataFrame(data=division_info)
        clusters[clus]["division_info_df"] = division_info_df

    # how to decide what to plot?
    min_to_plot = 20
    proposed_coun_to_plot = []
    for clus in clus_keys:
        country_inf = clusters[clus]["division_info_df"]
        proposed_coun_to_plot.extend(country_inf[country_inf.num_seqs >= min_to_plot].index)
    proposed_coun_to_plot = set(proposed_coun_to_plot)
    print(f"At min plot {min_to_plot}, there are {len(proposed_coun_to_plot)} divisions")

    total_div_counts = {}
    #decide order
    for clus in clus_keys:
        country_inf = clusters[clus]["division_info_df"]
        for coun in proposed_coun_to_plot:
            if coun not in total_div_counts:
                total_div_counts[coun] = 0
            if coun in country_inf.index:
                total_div_counts[coun] += country_inf.num_seqs[coun]

    sorted_div_tups = sorted(total_div_counts.items(), key=lambda x: x[1], reverse=True)
    proposed_coun_to_plot = [x[0] for x in sorted_div_tups]

    return proposed_coun_to_plot, clus_keys

def plot_country_data_div(clusters, proposed_coun_to_plot, print_files, clus_keys):
    division_week = {clus: {} for clus in clusters}

    fs = 14
    rws = int(np.ceil((len(proposed_coun_to_plot)+1)/2))
    fig, axs = plt.subplots(nrows=rws, #len(countries_to_plot)+1,
        ncols=2, sharex=True,figsize=(9,11))

    min_week = datetime.datetime(2020,12,31)
    max_week = datetime.datetime(2020,1,1)
    week_as_dates = {}
    json_output = {}
    json_output['countries'] = {}
    ptchs = {}

    for coun, ax in zip(proposed_coun_to_plot, fig.axes[1:]): #axs[1:]):
        i=0
        first_clus_count = []

        json_output['countries'][coun] = {'week': {}, 'total_sequences': {} }

        for clus in clus_keys:
            cluster_data = clusters[clus]['cluster_data_2wk_div']
            cluster_data=cluster_data.sort_index()
            total_data = clusters[clus]['total_data_2wk_div']
            if coun not in cluster_data:
                if clus == clus_keys[-1]:
                    ax.fill_between(week_as_date, cluster_count/total_count, 1, facecolor=grey_color)
                    patch = mpatches.Patch(color=grey_color, label=f"other")
                    ptchs["other"] = patch
                i+=1
                continue
            week_as_date, cluster_count, total_count,\
                unsmoothed_cluster_count, unsmoothed_total_count = non_zero_counts(cluster_data, total_data, coun)
            #trim away any last data points that only have 1 or 2 seqs
            week_as_date, cluster_count, total_count  = trim_last_data_point(week_as_date, cluster_count, total_count, frac=0.1, keep_count=10)

            mindat = min(week_as_date)
            if mindat < min_week:
                min_week = mindat
            maxdat = max(week_as_date)
            if maxdat > max_week:
                max_week = maxdat

            week_as_dates[coun] = week_as_date

            json_output['countries'][coun][clusters[clus]['display_name']] = list(cluster_count)

            division_week[clus][coun] = cluster_count/total_count

            linesty = '-'
            lab = clusters[clus]["display_name"]
            if i == 0:
                first_clus_count = [0] * len(total_count)
            if len(first_clus_count) == 0:
                first_clus_count = [0] * len(total_count)
            cluster_count = first_clus_count + cluster_count #unindented

            ax.fill_between(week_as_date, first_clus_count/total_count, cluster_count/total_count, facecolor=clusters[clus]['col'])
            patch = mpatches.Patch(color=clusters[clus]['col'], label=lab)

            if clus not in ptchs:
                ptchs[clus] = patch

            if clus == clus_keys[-1]:
                ax.fill_between(week_as_date, cluster_count/total_count, 1, facecolor=grey_color)
                patch = mpatches.Patch(color=grey_color, label=f"other")

            first_clus_count = cluster_count # unindented
            i+=1
        json_output['countries'][coun]['week'] = [datetime.datetime.strftime(x, "%Y-%m-%d") for x in week_as_date]
        json_output['countries'][coun]['total_sequences'] = [int(x) for x in total_count]

        ax.text(datetime.datetime(2020,6,1), 0.7, coun, fontsize=fs)
        ax.tick_params(labelsize=fs*0.8)


    json_output['plotting_dates'] = {}
    json_output['plotting_dates']["min_date"] = datetime.datetime.strftime(min_week, "%Y-%m-%d")
    json_output['plotting_dates']["max_date"] = datetime.datetime.strftime(max_week, "%Y-%m-%d")


    fig.axes[0].legend(handles=ptchs.values(), loc=3, fontsize=fs*0.7, ncol=3)
    fig.axes[0].axis('off')
    fig.autofmt_xdate(rotation=30)
    plt.show()
    plt.tight_layout()

    if print_files:
        fmt = "pdf"
        with open(tables_path+f'USAClusters_data.json', 'w') as fh:
            json.dump(json_output, fh)

        plt.savefig(figure_path+f"USAClusters_compare.png")

        #plt.savefig(figure_only_path+f"EUClusters_compare.{fmt}")
        #trends_path = figure_only_path+f"EUClusters_compare.{fmt}"
        #copypath = trends_path.replace("compare", "compare-{}".format(datetime.date.today().strftime("%Y-%m-%d")))
        #copyfile(trends_path, copypath)


if do_country:
    proposed_coun_to_plot, clus_keys = get_ordered_clusters_to_plot_div(clusters)
    plot_country_data_div(clusters, proposed_coun_to_plot, print_files, clus_keys)
