from helpers import *
from paths import *
from matplotlib import pyplot as plt

countries = ['Spain', 'United Kingdom', 'Switzerland', 'Norway',
             'Netherlands', 'France', 'Germany', 'Ireland']

popsizes = {
    'Spain':46723749,
    'United Kingdom': 66488991,
    'Switzerland':8516543,
    'Netherlands':17231017,
    'Norway':5314336,
    'Germany':82927922,
    'France':66987244,
    'Ireland':4853506
}

case_data = {}
for c in countries:
    w, cases = read_case_data_by_week(case_data_path+case_files.get(c, f"{c}.tsv"))
    case_data[c] = {k:v for k,v in zip(w, cases.cases)}

fig, axs = plt.subplots(1,4, sharey=True, figsize=(12,5))
for ax, week in zip(axs, [26, 30, 34,38]):
    d = datetime.datetime.strptime(f"2020-W{week}-1", '%G-W%V-%u')
    ratio = np.ones((len(countries), len(countries)))
    for i1, c1 in enumerate(countries):
        for i2, c2 in enumerate(countries):
            if i1<i2:
                ratio[i1,i2] = case_data[c1][d]/popsizes[c1]/case_data[c2][d]*popsizes[c2]

    img = ax.matshow(np.log10(ratio), vmin=-2, vmax=2, cmap='seismic')
    ax.set_xticks(range(len(countries)))
    ax.set_xticklabels(countries, rotation=30, ha='left')
    ax.text(1,len(countries)-2, d.strftime('%Y-%m-%d'))

plt.colorbar(img)
axs[0].set_yticks(range(len(countries)))
axs[0].set_yticklabels(countries, rotation=0)
plt.tight_layout()
plt.savefig('../cluster_scripts/figures/incidence_ratios.png')
