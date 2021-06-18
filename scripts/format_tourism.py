import pandas as pd

d = pd.read_csv("tourism_arrivals.csv", sep="\t")
d.Total.astype(float)
d = d.fillna(0)

months = d.Period.unique()

table = d.pivot_table(
    values="Total", index=["Country of residence"], columns=["Period"]
)

table = pd.concat([table, table.sum(axis=1)], axis=1)

table = table.sort_values(by=[0], ascending=False)
