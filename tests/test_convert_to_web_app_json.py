from scripts.convert_to_web_app_json import convert_mutation_comparison


def test_convert_mutation_comparison():
    mutation_comparison = {
        "21K (Omicron)\n(BA.1)": {
            "nonsynonymous": [
                "S:A67V",
                "S:H69-",
            ]
        },
    }

    expected_mutation_comparison_output = {
        "individual": [
            {
                'index': 0,
                'mutations': [
                    'S:A67V',
                ],
            },
            {
                'index': 1,
                'mutations': [
                    'S:H69-',
                ],
            }, ],
        "shared_by_commonness": [],
        "shared_by_pos": [],
        "variants": [
            "21K (Omicron)\n(BA.1)"
        ]
    }

    output = convert_mutation_comparison(mutation_comparison)
    assert expected_mutation_comparison_output == output
