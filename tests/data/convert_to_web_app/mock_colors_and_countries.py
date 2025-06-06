mock_colors_2 = [
    "#a6cee3",
]

mock_country_list_2 = [
    "South Africa",  # 5
]

mock_country_styles_2 = {
    country: {"c": mock_colors_2[i], "ls": "-"}  # linestyles[i//len(colors)]}
    for i, country in enumerate(mock_country_list_2)
}

mock_country_styles_all = {**mock_country_styles_2}
