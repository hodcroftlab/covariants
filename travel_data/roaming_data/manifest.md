# Roamers in Spain 2020

## Manifest
```
iso_codes.csv
province_codes.csv
roamers_weekly_spain_2020-04-06_2020-12-21.csv
```

## Roamer data
The file `roamers_weekly_spain_2020-04-06_2020-12-21.csv` contains the infered number of roamers per week by province and nationality.
The columns are:

1. `week` [datetime]: The first day (as YYYY-MM-dd) of the week considered.
2. `province_num` [int]: Identifier of province.
3. `country_iso` [str]: Nationality of the roamer as two-letter ISO code.
4. `is_arriving` [bool]: True when the roamer is not seen in the country in the last two months before the current week.
5. `is_departing` [bool]: True if the roamer is not seen in the country in the next two months after the current week.
6. `num_roamers` [int]: Number of roamers seen for the given set of `week`, `province_num`, `country_iso`, `is_arriving`, and `is_departing`.


### Auxiliary data

* `province_codes.csv`: province of Spain by number and name. Matches `province_num`. See https://es.wikipedia.org/wiki/Anexo:Provincias_de_Espa%C3%B1a_por_c%C3%B3digo_postal.
* `iso_codes.csv`: countries by two-letter ISO code and name. Matches `country_iso`. See https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
