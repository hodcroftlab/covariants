#%%
import os
import requests
import json
import pathlib
from clusters import clusters
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

THIS_DIR = os.path.dirname(os.path.realpath(__file__))
OUTPUT_FOLDER = os.path.join(THIS_DIR, "..", "web", "data", "mutationCounts")


aa_base_url = 'https://lapis.cov-spectrum.org/gisaid/v1/sample/aa-mutations'
count_base_url = 'https://lapis.cov-spectrum.org/gisaid/v1/sample/aggregated'
filter_deletions_url = "aaMutations=Orf1a:1.,N:420."

LAPIS_API_ACCESS_KEY = os.environ.get("LAPIS_API_ACCESS_KEY")

#only include mutations that are above this threshhold
THRESHOLD = 0.005
#only show the top N_ENTRIES most frequent mutations on the website
N_ENTRIES = 10


clusters_example = {
    '21I.Delta': ['5184T','11514T','22227T'],
    "21K.Omicron": ["25000T","25584T","8393A"]
}

def build_url(base_url,cluster,threshold):
    url = f"{base_url}?{filter_deletions_url}&accessKey={LAPIS_API_ACCESS_KEY}&nucMutations={','.join(cluster)}"
    if threshold is not None:
        url += f"&minProportion={threshold:f}"
    return url

if __name__ == '__main__':
    for cluster in clusters.values():
        cluster_name = cluster["build_name"]

        # Don't use all clusters

        if cluster["type"] == "do_not_display":
            continue

        if cluster["type"] == "mutation":
            continue

        if "snps_with_base" not in cluster:
            print(f"snps_with_base missing from {cluster_name}")
            continue

        if "mutations" not in cluster:
            print(f"mutations missing from {cluster_name}")
            continue


        cluster_muts = cluster["snps_with_base"]
        aa_request_url = build_url(aa_base_url,cluster_muts,THRESHOLD)
        count_request_url = build_url(count_base_url,cluster_muts,None)
        print(f"Requesting cov-spectrum for {cluster_name} with snps {', '.join(cluster_muts)}")
        print(aa_request_url)
        print(count_request_url)
        aa_request = requests.get(aa_request_url)
        count_request = requests.get(count_request_url)
        aa = json.loads(aa_request.content)
        count = json.loads(count_request.content)
        print("Download complete...\n")

        defining_mutations = []
        for mut in cluster["mutations"]["nonsynonymous"]:
            defining_mutations.append(f"{mut['gene']}:{mut['left']}{mut['pos']}{mut['right']}")

        total = count['data'][0]['count']
        mutations = {"S" : [], "nonS": []}
        muts = {}
        for mutation in aa['data']:
            if mutation['mutation'] in defining_mutations:
                continue
            if mutation['mutation'].startswith("S:"):
                s = "S"
            else:
                s = "nonS"
            mutations[s].append({'mut': mutation['mutation'], 'count': int(mutation['proportion'] * total)})

            # Check for mutation duplicates
            if mutation['mutation'] not in muts:
                muts[mutation['mutation']] = mutation['proportion']
            else:
                print(f"Duplicate mutation found: {mutation['mutation']} (counts {mutation['proportion']} vs {muts[mutation['mutation']]}")

        out_json_S = {"total": total, "counts": sorted(mutations["S"], key=lambda d: d['count'], reverse=True)[:N_ENTRIES]}
        out_json_nonS = {"total": total, "counts": sorted(mutations["nonS"], key=lambda d: d['count'], reverse=True)[:N_ENTRIES]}
        out_json = {
            "S": out_json_S,
            "others": out_json_nonS,
        }

        OUTPUT_PATH = pathlib.Path(f"{OUTPUT_FOLDER}/{cluster_name}")
        OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

        with open(f"{OUTPUT_PATH}.json",'w') as f:
            json.dump(out_json,f,indent=2)

