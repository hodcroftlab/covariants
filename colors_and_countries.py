

country_list =[
'France',
'United Kingdom',
'Austria',
'Netherlands',
'Norway',
'Spain',
'Belgium',
'Switzerland',
'Germany',
'USA',
'Ireland',
'Italy',
'New Zealand',
'Sweden',
'Australia',
'Singapore',
'Denmark',
'Hong Kong',
'Portugal',
'Luxembourg',
'Lithuania',
'Iceland',
'Czech Republic'
]

colors = [
"#a6cee3",
"#1f78b4",
"#ffff00",
"#33a02c",
"#fb9a99",
"#e31a1c",
"#fdbf6f",
"#ff7f00",
"#cab2d6",
"#6a3d9a",
"#b2df8a",
"#b15928",
"#000000",
"#9900cc",
"#ffcc00",
"#a6a6a6",
"#0099ff",
"#d9d9d9",
'#990000',
'#c2c2a3',
'#ff66ff',
'#0000ff',
'#006600'
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

popsizes = {
    'Spain':46723749,
    'United Kingdom': 66488991,
    'Switzerland':8516543,
    'Netherlands':17231017,
    'Norway':5314336,
    'Germany':82927922,
    'France':66987244,
    'Ireland':4853506,
    'Belgium':11422068,
    'Denmark':5797446,
    "Scotland": 5469000,
    "Wales":3136000,
    "England":56000000,
    "Italy":60390000,
    "Sweden":10230000,
    "Croatia": 4076000,
    "Finland":5518000
}


country_list_2 = [
    "Israel",
    "Brazil",
    "Slovakia",
    "Hungary",
    "Turkey",
    "South Africa",
    "United Arab Emirates",
    "Finland",
    "Jordan",
    "Morocco",
    "Cameroon",
    "Canada",
    "India",
    "Latvia",
    "Malaysia",
    "Peru",
    "South Korea",
    "Taiwan",
    "Thailand",
    "Tunisia"
]

country_styles_2 = {
    country: {'c':colors[i], 'ls':":"}#linestyles[i//len(colors)]}
    for i, country in enumerate(country_list_2)
 }

country_styles_all = {**country_styles, **country_styles_2}
