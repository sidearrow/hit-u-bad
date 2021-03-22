import csv
import json

cr = csv.reader(open("tmp.tsv"), delimiter="\t")
cw = csv.writer(open("tmp.csv", "w"))

res = []
for r in cr:
    id = r[0] + r[1].split(".")[1][:-1].zfill(2)
    res.append([id] + r)

res.sort(key=lambda v: v[0], reverse=True)

cw.writerows(res)