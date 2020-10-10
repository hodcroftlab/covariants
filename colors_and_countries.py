

country_list =[
'United Kingdom',
'Switzerland',
'France',
'Spain',
'Netherlands',
'Norway',
'Latvia',
'Belgium',
'Germany',
'Hong Kong',
'Ireland',
'Italy',
]

#separate out Scotland, England, NI, Wales...
uk_countries = ['Scotland', 'England', 'Wales', 'Northern Ireland']
countries_and_uk_list = [x for x in country_list if x!='United Kingdom'] + uk_countries
all_countries = country_list + uk_countries

# For the main cluster, ran out of colors... try this hack.
# palette = sns.color_palette("tab10", round(len(country_list)/2))
linestyles = ['-', '-.','--', ':']

country_styles = {
    country: {'c':f"C{i%10}", 'ls':linestyles[i//10]}
    for i, country in enumerate(country_list)
 }

country_styles.update({
 'Scotland':        {'c':country_styles['United Kingdom']['c'], 'ls':'--'},
 'England':         {'c':country_styles['United Kingdom']['c'], 'ls':'-'},
 'Wales':           {'c':country_styles['United Kingdom']['c'], 'ls':'-.'},
 'Northern Ireland':{'c':country_styles['United Kingdom']['c'], 'ls':':'},
})

