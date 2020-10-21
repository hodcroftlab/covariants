import numpy as np
import matplotlib.pyplot as plt
from travel_data import *
from colors_and_countries import *

fs=14
fmt = 'pdf'

fig = plt.figure()
for coun in travel_volume:
   plt.plot(travel_volume[coun].index, travel_volume[coun]/popsizes[coun]*100000, label=coun,
            c=country_styles[coun]['c'], lw=2)

plt.yscale('log')
plt.ylabel('passengers/100000', fontsize=fs)
fig.autofmt_xdate(rotation=30)
plt.legend()
plt.savefig(f'figures/travel_volume.{fmt}')