#%%
import os
import requests
import json
import pathlib
from clusters import clusters

THIS_DIR = os.path.dirname(os.path.realpath(__file__))
OUTPUT_FOLDER = os.path.join(THIS_DIR, "..", "web", "data", "mutationCounts")


aa_base_url = 'https://cov-spectrum.ethz.ch/gisaid/api/v1/sample/aa-mutations'
count_base_url = 'https://cov-spectrum.ethz.ch/gisaid/api/v1/sample/aggregated'
THRESHOLD = 0.005


clusters_example = {
    '21I.Delta': ['5184T','11514T','22227T'],
    "21K.Omicron": ["25000T","25584T","8393A"]
}

def build_url(base_url,cluster,threshold):
    url = f"{base_url}?nucMutations={','.join(cluster)}"
    if threshold is not None:
        url += f"&minProportion={threshold:f}"
    return url

if __name__ == '__main__':
    for cluster_name, cluster_muts in clusters_example.items():
        aa_request_url = build_url(aa_base_url,cluster_muts,THRESHOLD)
        count_request_url = build_url(count_base_url,cluster_muts,None)
        print(aa_request_url)
        print(count_request_url)
        aa_request = requests.get(aa_request_url)
        count_request = requests.get(count_request_url)
        aa = json.loads(aa_request.content)
        count = json.loads(count_request.content)

        defining_mutations = []
        for mut in clusters[cluster_name]["mutations"]["nonsynonymous"]:
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

        out_json_S = {"total": total, "counts": sorted(mutations["S"], key=lambda d: d['count'], reverse=True)}
        out_json_nonS = {"total": total, "counts": sorted(mutations["nonS"], key=lambda d: d['count'], reverse=True)}
        
        OUTPUT_PATH = pathlib.Path(f"{OUTPUT_FOLDER}/{cluster_name}")
        OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
        
        with open(f"{OUTPUT_PATH}_S.json",'w') as f:
            json.dump(out_json_S,f,indent=2)
        with open(f"{OUTPUT_PATH}_nonS.json",'w') as f:
            json.dump(out_json_nonS,f,indent=2)
