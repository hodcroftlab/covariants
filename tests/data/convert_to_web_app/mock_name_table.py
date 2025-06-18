import urllib.request
import urllib.error

mock_name_table = [
    {
        "clade": "20A/S:126A",
        "who": "",
        "lineages": [
            {"name": "B.1.620", "url": None}
        ],
        "others": [],
    },
]


def mock_does_url_respond(url: str):
    req = urllib.request.Request(url, headers={'content-type': 'text/html'})

    try:
        urllib.request.urlopen(req)
    except urllib.error.HTTPError:
        return False
    except urllib.error.URLError:
        return False

    return True


def mock_update_name_table(name_table):
    for datum in name_table:
        for lineage in datum["lineages"]:
            if lineage["url"] is not None:
                continue

            name = lineage["name"]

            # Make a request to a hypothetical URL where global report might reside.
            # Keep the URL if it responds with something meaningful.
            url = f"https://cov-lineages.org/global_report_{name}.html"
            if mock_does_url_respond(url):
                lineage["url"] = url

    return name_table


mock_name_table = mock_update_name_table(mock_name_table)
