import urllib.request
import urllib.error

name_table = [
    {
        "clade": "20I (Alpha, V1)",
        "who": "Alpha",
        "lineages": [
            {"name": "B.1.1.7", "url": None}
        ],
        "others": [
            {"name": "VOC 202012/01", "url": None}
        ],
    },
    {
        "clade": "20H (Beta, V2)",
        "who": "Beta",
        "lineages": [
            {"name": "B.1.351", "url": None}
        ],
        "others": [
            {"name": "501Y.V2", "url": None}
        ],
    },
    {
        "clade": "20J (Gamma, V3)",
        "who": "Gamma",
        "lineages": [
            {"name": "P.1", "url": None}
        ],
        "others": [],
    },
    {
        "clade": "21A (Delta)",
        "who": "Delta",
        "lineages": [
            {"name": "B.1.617.2", "url": "https://cov-lineages.org/lineages/lineage_B.1.617.2.html"}
        ],
        "others": [],
    },
    {
        "clade": "21I (Delta)",
        "who": "Delta",
        "lineages": [],
        "others": [],
    },
    {
        "clade": "21J (Delta)",
        "who": "Delta",
        "lineages": [],
        "others": [],
    },
    {
        "clade": "21B (Kappa)",
        "who": "Kappa",
        "lineages": [
            {"name": "B.1.617.1", "url": "https://cov-lineages.org/lineages/lineage_B.1.617.1.html"}
        ],
        "others": []
    },
    {
        "clade": "21C (Epsilon)",
        "who": "Epsilon",
        "lineages": [
            {"name": "B.1.427", "url": None},
            {"name": "B.1.429", "url": None}
        ],
        "others": [
            {"name": "CAL.20C", "url": None}
        ],
    },
    {
        "clade": "21D (Eta)",
        "who": "Eta",
        "lineages": [
            {"name": "B.1.525", "url": None}
        ],
        "others": [],
    },
    {
        "clade": "21F (Iota)",
        "who": "Iota",
        "lineages": [
            {"name": "B.1.526", "url": None}
        ],
        "others": [
            {"name": "(Part of Pango lineage)", "url": None},
        ]
    },
    {
        "clade": "21G (Lambda)",
        "who": "Lambda",
        "lineages": [
            {"name": "C.37", "url": None}
        ],
        "others": [],
    },
    {
        "clade": "21H (Mu)",
        "who": "Mu",
        "lineages": [
            {"name": "B.1.621", "url": None}
        ],
        "others": [],
    },
    {
        "clade": "21K (Omicron)",
        "who": "Omicron",
        "lineages": [
            {"name": "BA.1", "url": "https://cov-lineages.org/lineages/lineage_BA.1.html"}
        ],
        "others": [],
    },
    {
        "clade": "21L (Omicron)",
        "who": "Omicron",
        "lineages": [
            {"name": "BA.2", "url": "https://cov-lineages.org/lineages/lineage_BA.2.html"}
        ],
        "others": [],
    },
    {
        "clade": "22A (Omicron)",
        "who": "Omicron",
        "lineages": [
            {"name": "BA.4", "url": "https://cov-lineages.org/lineages/lineage_BA.4.html"}
        ],
        "others": [],
    },
    {
        "clade": "22B (Omicron)",
        "who": "Omicron",
        "lineages": [
            {"name": "BA.5", "url": "https://cov-lineages.org/lineages/lineage_BA.5.html"}
        ],
        "others": [],
    },
    {
        "clade": "22C (Omicron)",
        "who": "Omicron",
        "lineages": [
            {"name": "BA.2.12.1", "url": "https://cov-lineages.org/lineages/lineage_BA.2.12.1.html"}
        ],
        "others": [],
    },
    {
        "clade": "22D (Omicron)",
        "who": "Omicron",
        "lineages": [
            {"name": "BA.2.75", "url": "https://cov-lineages.org/lineages/lineage_BA.2.75.html"}
        ],
        "others": [
            {"name": "Centaurus", "url": "https://www.snopes.com/news/2022/07/14/centaurus-covid-19-strain/"}
        ],
    },
    {
        "clade": "22E (Omicron)",
        "who": "Omicron",
        "lineages": [
            {"name": "BQ.1", "url": "https://cov-lineages.org/lineages/lineage_BQ.1.html"}
        ],
        "others": [],
    },
    {
        "clade": "22F (Omicron)",
        "who": "Omicron",
        "lineages": [
            {"name": "XBB", "url": "https://cov-lineages.org/lineages/lineage_XBB.html"}
        ],
        "others": [],
    },
    {
        "clade": "23A (Omicron)",
        "who": "Omicron",
        "lineages": [
            {"name": "XBB.1.5", "url": "https://cov-lineages.org/lineages/lineage_XBB.1.5.html"}
        ],
        "others": [],
    },
    {
        "clade": "23B (Omicron)",
        "who": "Omicron",
        "lineages": [
            {"name": "XBB.1.16", "url": "https://cov-lineages.org/lineages/lineage_XBB.1.16.html"}
        ],
        "others": [
            {"name": "Arcturus", "url": None}
        ],
    },
    {
        "clade": "23C (Omicron)",
        "who": "Omicron",
        "lineages": [
            {"name": "CH.1.1", "url": "https://cov-lineages.org/lineages/lineage_CH.1.1.html"}
        ],
        "others": [],
    },
    {
        "clade": "23D (Omicron)",
        "who": "Omicron",
        "lineages": [
            {"name": "XBB.1.9", "url": "https://cov-lineages.org/lineages/lineage_XBB.1.9.html"}
        ],
        "others": [],
    },
    {
        "clade": "23E (Omicron)",
        "who": "Omicron",
        "lineages": [
            {"name": "XBB.2.3", "url": "https://cov-lineages.org/lineages/lineage_XBB.2.3.html"}
        ],
        "others": [],
    },
    {
        "clade": "23F (Omicron)",
        "who": "Omicron",
        "lineages": [
            {"name": "EG.5.1", "url": "https://cov-lineages.org/lineages/lineage_EG.5.1.html"}
        ],
        "others": [],
    },
    {
        "clade": "23G (Omicron)",
        "who": "Omicron",
        "lineages": [
            {"name": "XBB.1.5.70", "url": "https://cov-lineages.org/lineages/lineage_XBB.1.5.70.html"}
        ],
        "others": [],
    },
    {
        "clade": "23H (Omicron)",
        "who": "Omicron",
        "lineages": [
            {"name": "HK.3", "url": "https://cov-lineages.org/lineages/lineage_HK.3.html"}
        ],
        "others": [],
    },
    {
        "clade": "23I (Omicron)",
        "who": "Omicron",
        "lineages": [
            {"name": "BA.2.86", "url": "https://cov-lineages.org/lineages/lineage_BA.2.86.html"}
        ],
        "others": [],
    },
    {
        "clade": "24A (Omicron)",
        "who": "Omicron",
        "lineages": [
            {"name": "JN.1", "url": "https://cov-lineages.org/lineages/lineage_JN.1.html"}
        ],
        "others": [],
    },
    {
        "clade": "24B (Omicron)",
        "who": "Omicron",
        "lineages": [
            {"name": "JN.1.11.1", "url": "https://cov-lineages.org/lineages/lineage_JN.1.11.1.html"}
        ],
        "others": [],
    },
    {
        "clade": "24C (Omicron)",
        "who": "Omicron",
        "lineages": [
            {"name": "KP.3", "url": "https://cov-lineages.org/lineages/lineage_KP.3.html"}
        ],
        "others": [],
    },
    {
        "clade": "20E (EU1)",
        "who": None,
        "lineages": [
            {"name": "B.1.177", "url": None},
        ],
        "others": [
            {"name": "EU1", "url": None}
        ],
    },
    {
        "clade": "20B/S:732A",
        "who": "",
        "lineages": [
            {"name": "B.1.1.519", "url": None}
        ],
        "others": [],
    },
    {
        "clade": "20A/S:126A",
        "who": "",
        "lineages": [
            {"name": "B.1.620", "url": None}
        ],
        "others": [],
    },
    {
        "clade": "20A.EU2",
        "who": None,
        "lineages": [
            {"name": "B.1.160", "url": None}
        ],
        "others": [],
    },
    {
        "clade": "20A/S:439K",
        "who": None,
        "lineages": [
            {"name": "B.1.258", "url": None}
        ],
        "others": [],
    },
    {
        "clade": "20A/S:98F",
        "who": None,
        "lineages": [
            {"name": "B.1.221", "url": None}
        ],
        "others": [],
    },
    {
        "clade": "20C/S:80Y",
        "who": None,
        "lineages": [
            {"name": "B.1.367", "url": None}
        ],
        "others": [],
    },
    {
        "clade": "20B/S:626S",
        "who": None,
        "lineages": [
            {"name": "B.1.1.277", "url": None}
        ],
        "others": [],
    },
    {
        "clade": "20B/S:1122L",
        "who": None,
        "lineages": [
            {"name": "B.1.1.302", "url": None}
        ],
        "others": [],
    }
]


def does_url_respond(url: str):
    req = urllib.request.Request(url, headers={'content-type': 'text/html'})

    try:
        urllib.request.urlopen(req)
    except urllib.error.HTTPError:
        return False
    except urllib.error.URLError:
        return False

    return True


def update_name_table(name_table):
    for datum in name_table:
        for lineage in datum["lineages"]:
            if lineage["url"] is not None:
                continue

            name = lineage["name"]

            # Make a request to a hypothetical URL where global report might reside.
            # Keep the URL if it responds with something meaningful.
            url = f"https://cov-lineages.org/global_report_{name}.html"
            if does_url_respond(url):
                lineage["url"] = url

    return name_table


name_table = update_name_table(name_table)
