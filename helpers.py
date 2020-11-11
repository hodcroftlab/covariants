import pandas as pd
import numpy as np
import datetime
from collections import defaultdict


def logistic(x, a, t50):
    return np.exp((x-t50)*a)/(1+np.exp((x-t50)*a))

def fit_logistic(days, cluster, total):
    from scipy.optimize import minimize

    def cost(P, t, k, n):
        a, t50 = P
        prob = np.minimum(0.98,np.maximum(1e-2,logistic(t, a, t50)))
        return -np.sum(k*np.log(prob) + (n-k)*np.log(1-prob))

    sol = minimize(cost, [0.08, np.max(days)], args=(days, cluster, total))
    return sol


def trim_last_data_point(week_as_date, cluster_count, total_count, frac=0.2, keep_count=10):
    if total_count[-1]<frac*total_count[-2] and total_count[-1]<keep_count:
        return week_as_date[:-1], cluster_count[:-1], total_count[:-1]

    return week_as_date, cluster_count, total_count

def non_zero_counts(cluster_data, total_data, country):

    cluster_and_total = pd.concat([cluster_data[country], total_data[country]], axis=1).fillna(0)
    with_data = cluster_and_total.iloc[:,1]>0

    #this lets us plot X axis as dates rather than weeks (I struggle with weeks...)
    week_as_date = [ datetime.datetime.strptime("2020-W{}-1".format(x), '%G-W%V-%u')
                     for x in cluster_and_total.index[with_data] ]
    #plt.plot(weeks.index[with_data], weeks.loc[with_data].iloc[:,0]/(total[with_data]), 'o', color=palette[i], label=coun, linestyle=sty)
    cluster_count = cluster_and_total[with_data].iloc[:,0]
    total_count = cluster_and_total[with_data].iloc[:,1]

    return week_as_date, np.array(cluster_count), np.array(total_count)


def read_case_data_by_week(fname):
    #read in case data
    cases = pd.read_csv(fname, sep='\t', index_col=False, skiprows=3)

    #instead of total case numbers, get new cases per day, with diff
    new_cases = np.diff(cases.cases)
    # convert dates to datetime objects
    case_dates = [datetime.datetime.strptime(dat, '%Y-%m-%d') for dat in cases.time]
    # remove first date object as the 'np.diff' above shortens the list by 1! now lengths match.
    case_dates = case_dates[1:]

    #to avoid things like no reporting on weekends, get total # new cases per week.
    cases_by_week = defaultdict(int)
    for dat, num_cas in zip(case_dates, new_cases):
        wk = dat.isocalendar()[1] #returns ISO calendar week
        cases_by_week[wk]+=num_cas

    case_data = pd.DataFrame(data={'cases':cases_by_week})
    case_data = case_data.sort_index()
    case_week_as_date = [ datetime.datetime.strptime("2020-W{}-1".format(x), '%G-W%V-%u') for x in case_data.index ]

    return case_week_as_date, case_data


# n is the number of observations
# x is the number of times you see the mutation
# Distributions.Beta(a,b) is the Beta distribution
# cdf is the cumulative distribution function (of the Beta distribution in this case)
def bernoulli_estimator(x,n, dp=0.10):
    from scipy.stats import beta
    naivemean = x/n
    estmean = (x+0.5)/(n+1)
    a = x + 0.5
    b = n - x + 0.5
    #
    lowerbound = 0.
    while beta.cdf(lowerbound, a, b) < dp:
        lowerbound += 0.01
    #
    higherbound = 1.
    while beta.cdf(higherbound, a, b) > 1-dp:
        higherbound -= 0.01

    return naivemean, max(0,naivemean-lowerbound), max(0, higherbound-naivemean)

