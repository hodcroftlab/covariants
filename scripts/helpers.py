import pandas as pd
import numpy as np
import datetime
from collections import defaultdict

def logistic(x, a, t50):
    return np.exp((x - t50) * a) / (1 + np.exp((x - t50) * a))


def fit_logistic(days, cluster, total):
    from scipy.optimize import minimize

    def cost(P, t, k, n):
        a, t50 = P
        prob = np.minimum(0.98, np.maximum(1e-2, logistic(t, a, t50)))
        return -np.sum(k * np.log(prob) + (n - k) * np.log(1 - prob))

    sol = minimize(cost, [0.08, np.max(days)], args=(days, cluster, total))
    return sol


def trim_last_data_point(
    week_as_date, cluster_count, total_count, frac=0.2, keep_count=10
):
    if total_count[-1] < frac * total_count[-2] and total_count[-1] < keep_count:
        return week_as_date[:-1], cluster_count[:-1], total_count[:-1]

    return week_as_date, cluster_count, total_count


def non_zero_counts(cluster_data, total_data, country, smoothing=None):

    smooth = True
    if smoothing is None:
        smoothing = np.array([1])
        smooth = False

    cluster_and_total = pd.concat(
        [cluster_data[country], total_data[country]], axis=1
    ).fillna(0)
    # remove initial time points without data
    data_range = np.cumsum(cluster_and_total.iloc[:, 1]) > 0
    with_data = cluster_and_total.iloc[:, 1] > 0
    with_data_inrange = with_data[data_range]
    # this lets us plot X axis as dates rather than weeks (I struggle with weeks...)
    week_as_date = [
        datetime.datetime.strptime("{}-W{}-1".format(*x), "%G-W%V-%u")
        for x in cluster_and_total[data_range].index
    ]
    # plt.plot(weeks.index[with_data_inrange], weeks.loc[with_data_inrange].iloc[:,0]/(total[with_data_inrange]), 'o', color=palette[i], label=coun, linestyle=sty)
    if len(week_as_date) < len(smoothing) and smooth:
        chop = -(len(week_as_date) - len(smoothing) - 1) // 2
        smoothing = smoothing[chop:-chop]
    mode = "same"  # RICHARD
    cluster_count = np.convolve(
        cluster_and_total[data_range].iloc[:, 0], smoothing, mode=mode
    )  #'same')
    # cluster_count = cluster_count[0:len(week_as_date)]
    total_count = np.convolve(
        cluster_and_total[data_range].iloc[:, 1], smoothing, mode=mode
    )  #'same')
    # if mode == 'valid':
    #     total_count = total_count[0:len(week_as_date)]

    return (
        [x for x, wd in zip(week_as_date, with_data_inrange) if wd],
        np.array(cluster_count)[with_data_inrange],
        np.array(total_count)[with_data_inrange],
        cluster_and_total[data_range].loc[with_data_inrange].iloc[:, 0],
        cluster_and_total[data_range].loc[with_data_inrange].iloc[:, 1],
    )


# n is the number of observations
# x is the number of times you see the mutation
# Distributions.Beta(a,b) is the Beta distribution
# cdf is the cumulative distribution function (of the Beta distribution in this case)
def bernoulli_estimator(x, n, dp=0.10):
    from scipy.stats import beta

    naivemean = x / n
    estmean = (x + 0.5) / (n + 1)
    a = x + 0.5
    b = n - x + 0.5
    #
    lowerbound = 0.0
    while beta.cdf(lowerbound, a, b) < dp:
        lowerbound += 0.01
    #
    higherbound = 1.0
    while beta.cdf(higherbound, a, b) > 1 - dp:
        higherbound -= 0.01

    return naivemean, max(0, naivemean - lowerbound), max(0, higherbound - naivemean)
