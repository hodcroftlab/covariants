import urllib.request
import urllib.error

name_table = [
    {
        "clade": "20E (EU1)",
        "who": None,
        "lineages": [
            {"name": "B.1.177", "url": None},
        ],
        "others": [
            {"name": "20A.EU1", "url": None}
        ]
    },
    {
        "clade": "20A.EU2",
        "who": None,
        "lineages": [
            {"name": "B.1.160", "url": None}
        ],
        "others": []
    },
    {
        "clade": "20I (Alpha, V1)",
        "who": "Alpha",
        "lineages": [
            {"name": "B.1.1.7", "url": None}
        ],
        "others": [
            {"name": "VOC 202012/01", "url": None}
        ]
    },
    {
        "clade": "20H (Beta, V2)",
        "who": "Beta",
        "lineages": [
            {"name": "B.1.351", "url": None}
        ],
        "others": [
            {"name": "501Y.V2", "url": None}
        ]
    },
    {
        "clade": "20J (Gamma, V3)",
        "who": "Gamma",
        "lineages": [
            {"name": "P.1", "url": None}
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
            {"name": "CAL.20C", "url": None},
            {"name": "20C/S:452R", "url": None}
        ],
    },
    {
        "clade": "21D (Eta)",
        "who": "Eta",
        "lineages": [
            {"name": "B.1.525", "url": None}
        ],
        "others": [
            {"name": "20A/S:484K", "url": None},
        ]
    },
    {
        "clade": "21F (Iota)",
        "who": "Iota",
        "lineages": [
            {"name": "B.1.526", "url": None}
        ],
        "others": [
            {"name": "(Part of Pango lineage)", "url": None},
            {"name": "20C/S:484K", "url": None},
        ]
    },
    {
        "clade": "21A (Delta)",
        "who": "Delta",
        "lineages": [
            {"name": "B.1.617.2", "url": "https://cov-lineages.org/lineages/lineage_B.1.617.2.html"}
        ],
        "others": [
            {"name": "21A/S:478K", "url": None}
        ]
    },
    {
        "clade": "21B (Kappa)",
        "who": "Kappa",
        "lineages": [
            {"name": "B.1.617.1", "url": "https://cov-lineages.org/lineages/lineage_B.1.617.1.html"}
        ],
        "others": [
            {"name": "21A/S:154K", "url": None}
        ]
    },
    {
        "clade": "20A/S:439K",
        "who": None,
        "lineages": [
            {"name": "B.1.258", "url": None}
        ],
        "others": []
    },
    {
        "clade": "20A/S:98F",
        "who": None,
        "lineages": [
            {"name": "B.1.221", "url": None}
        ],
        "others": []
    },
    {
        "clade": "20C/S:80Y",
        "who": None,
        "lineages": [
            {"name": "B.1.367", "url": None}
        ],
        "others": []
    },
    {
        "clade": "20B/S:626S",
        "who": None,
        "lineages": [
            {"name": "B.1.1.277", "url": None}
        ],
        "others": []
    },
    {
        "clade": "20B/S:1122L",
        "who": None,
        "lineages": [
            {"name": "B.1.1.302", "url": None}
        ],
        "others": []
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
