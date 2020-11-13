from helpers import *
from paths import *
from matplotlib import pyplot as plt
from colors_and_countries import *

fmt='pdf'

countries = ['Spain', 'France', 'Belgium', 'United Kingdom', 'Switzerland', 'Netherlands', 'Norway',
              'Ireland']


if __name__ == '__main__':
    case_data = load_case_data(countries)
    fig=plt.figure()
    for c in case_data:
        incidence = np.array(list(case_data[c].values())[:-1])/popsizes[c]*1e5
        weeks = list(case_data[c].keys())[:-1]
        plt.plot(weeks, incidence, lw=2,
                 label=c, c=country_styles[c]['c'])
        print(c, np.mean([i for w,i in zip(weeks, incidence) if w.month==7]), np.mean([i for w,i in zip(weeks, incidence) if w.month==8]))
    plt.ylabel('weekly incidence per 100000')
    plt.yscale('log')
    plt.ylim([1,1000])
    plt.xlim([datetime.datetime(2020,4,1), datetime.datetime(2020,10,1)])
    plt.legend(ncol=2)
    fig.autofmt_xdate(rotation=30)
    plt.savefig(f'../cluster_scripts/figures/incidence.{fmt}')

    fig, axs = plt.subplots(1,4, sharey=True, figsize=(12,3))

    for ax, week in zip(axs, [26, 29, 32, 35]):
        d = datetime.datetime.strptime(f"2020-W{week}-1", '%G-W%V-%u')
        ratio = np.ones((len(countries), len(countries)))
        for i1, c1 in enumerate(countries):
            for i2, c2 in enumerate(countries):
                if True:# i1<i2:
                    ratio[i1,i2] = case_data[c1][d]/popsizes[c1]/case_data[c2][d]*popsizes[c2]

        img = ax.matshow(np.log10(ratio), vmin=-2, vmax=2, cmap='coolwarm')
        ax.set_xticks(range(len(countries)))
        ax.set_xticklabels(countries, rotation=30, ha='left')
        ax.text(0,len(countries)+.2, d.strftime('%Y-%m-%d'))

    axs[0].set_yticks(range(len(countries)))
    axs[0].set_yticklabels(countries, rotation=0)
    plt.tight_layout()
    plt.savefig('../cluster_scripts/figures/incidence_ratios.png')

    cbar = plt.figure(figsize=(12,1))
    cbar_ax = plt.subplot(111)
    ticks = [-2.,-1,0,1,2]
    plt.colorbar(img, cax=cbar_ax, orientation="horizontal", ticks=ticks)
    plt.xticks(ticks, [f"{x:1.2f}" for x in 10**np.array(ticks)])
    plt.tight_layout()
    plt.savefig('../cluster_scripts/figures/incidence_ratio_colorbar.png')
