

country_list =[
'France',
'United Kingdom',
'Latvia',
'Netherlands',
'Norway',
'Spain',
'Belgium',
'Switzerland',
'Germany',
'Hong Kong',
'Ireland',
'Italy',
'New Zealand'
]

colors = [
"#a6cee3",
"#1f78b4",
"#b2df8a",
"#33a02c",
"#fb9a99",
"#e31a1c",
"#fdbf6f",
"#ff7f00",
"#cab2d6",
"#6a3d9a",
"#ffff99",
"#b15928",
"#ffffff"
]

#separate out Scotland, England, NI, Wales...
uk_countries = ['Scotland', 'England', 'Wales', 'Northern Ireland']
countries_and_uk_list = [x for x in country_list if x!='United Kingdom'] + uk_countries
all_countries = country_list + uk_countries

# For the main cluster, ran out of colors... try this hack.
# palette = sns.color_palette("tab10", round(len(country_list)/2))
linestyles = ['-', '-.','--', ':']

country_styles = {
    country: {'c':colors[i], 'ls':linestyles[i//len(colors)]}
    for i, country in enumerate(country_list)
 }

country_styles.update({
 'Scotland':        {'c':country_styles['United Kingdom']['c'], 'ls':'--'},
 'England':         {'c':country_styles['United Kingdom']['c'], 'ls':'-'},
 'Wales':           {'c':country_styles['United Kingdom']['c'], 'ls':'-.'},
 'Northern Ireland':{'c':country_styles['United Kingdom']['c'], 'ls':':'},
})

