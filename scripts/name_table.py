import urllib.request
import urllib.error

name_table = [
    {
        "clade": "20E (EU1)",
        "lineages": [
            {"name": "B.1.177", "url": None},
        ],
        "others": [
            {"name": "20A.EU1", "url": None}
        ]
    },
    {
        "clade": "20A.EU2",
        "lineages": [
            {"name": "B.1.160", "url": None}
        ],
        "others": []
    },
    {
        "clade": "20I/501Y.V1",
        "lineages": [
            {"name": "B.1.1.7", "url": None}
        ],
        "others": [
            {"name": "VOC 202012/01", "url": None}
        ]
    },
    {
        "clade": "20H/501Y.V2",
        "lineages": [
            {"name": "B.1.351", "url": None}
        ],
        "others": [
            {"name": "501Y.V2", "url": None}
        ]
    },
    {
        "clade": "20J/501Y.V3",
        "lineages": [
            {"name": "P.1", "url": None}
        ],
        "others": []
    },
    {
        "clade": "20C/S:452R",
        "lineages": [
            {"name": "B.1.427", "url": None},
            {"name": "B.1.429", "url": None}
        ],
        "others": [
            {"name": "CAL.20C", "url": None},
        ],
    },
    {
        "clade": "20A/S:484K",
        "lineages": [
            {"name": "B.1.525", "url": None}
        ],
        "others": []
    },
    {
        "clade": "20C/S:484K",
        "lineages": [
            {"name": "B.1.526", "url": None}
        ],
        "others": [
            {"name": "(Part of Pango lineage)", "url": None},
        ]
    },
    {
        "clade": "20A/S:154K",
        "lineages": [
            {"name": "B.1.617.1", "url": "https://cov-lineages.org/lineages/lineage_B.1.617.1.html"}
        ],
        "others": []
    },
    {
        "clade": "20A/S:478K",
        "lineages": [
            {"name": "B.1.617.2", "url": "https://cov-lineages.org/lineages/lineage_B.1.617.2.html"}
        ],
        "others": []
    },
    {
        "clade": "20A/S:439K",
        "lineages": [
            {"name": "B.1.258", "url": None}
        ],
        "others": []
    },
    {
        "clade": "20A/S:98F",
        "lineages": [
            {"name": "B.1.221", "url": None}
        ],
        "others": []
    },
    {
        "clade": "20C/S:80Y",
        "lineages": [
            {"name": "B.1.367", "url": None}
        ],
        "others": []
    },
    {
        "clade": "20B/S:626S",
        "lineages": [
            {"name": "B.1.1.277", "url": None}
        ],
        "others": []
    },
    {
        "clade": "20B/S:1122L",
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
