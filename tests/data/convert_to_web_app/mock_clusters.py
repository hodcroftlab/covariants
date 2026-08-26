# Meaning of fields
#
# You can query the list of all fields existing in `clusters.json` using this command (requires jq (https://github.com/stedolan/jq/releases) ):
#
#    jq '[ .clusters[] | keys[] ] | unique' web/public/data/clusters.json
#
# Note that not all fields from `clusters.py` end up in JSON, and vice-versa not all fields in JSON are present in `clusters.py` (some are generated elsewhere).
#

# Though not explicitly noted, clusters/variants are assigned based on this hierarchy:
# if 'display_name' is found in metadata.tsv Nextclade (if this is an official Nextstrain clade) this is used
# Otherwise, if not, and 'use_pango' is true, the pango lineages are used (the Nextclade assignments in metadata.tsv)
# If neither of the above, use the SNPs/gaps to determine the variant
# "Mutations" (not variants) always use SNPs or gaps

#Defining variants
# | snps                    | PIPELINE - used to identify clusters when not using pango or nextclade definitions
# | snps2                   | PIPELINE - alternative set of SNPs (see above) - can have one set or the other to qualify
# | gaps                    | PIPELINE - define a variant/mutation by gaps rather than SNPs
# | snps_with_base          | PIPELINE (not clus_anal) - used to query CoVSpectrum to find other common mutations (mutation_counts.py)
# | meta_cluster            | PIPELINE - set to TRUE if this definition is a group of variants (for Nextstrain builds)
# | other_nextstrain_names  | PIPELINE - if a meta_cluster, this defines what variants make up this meta_cluster
# | parent                  | PIPELINE - if not yet an official Nextstrain clade, the parent (what the variant would currently be called as) needs to be specified so that we re-check these seqs in case they are the new variant
# | use_pango               | PIPELINE - if true, use the pango lineage designation to assign sequences (using their Nextclade pango assignment in metadata.tsv)
# | pango_lineages          | BOTH - List of pango lineages associated with the variant

# | cluster_data            | PIPELINE - used to store data in cluster_analysis.py, but code assumes it's there
# | country_info            | PIPELINE - used to store data in cluster_analysis.py, but code assumes it's there

# | usa_graph               | PIPELINE - include this in USA-specific output files that create USA per Country page. Overrides 'graphing=False' for USA-specific outputs for these clusters.
# | nextstrain_build        | PIPELINE - determines whether cluster files are output, which are the starting point of Nextstrain builds
# | graphing                | PIPELINE - determines whether a particular variant/mutation is included in output files that are eventually graphed on the website
# Some confusion here. For Per Country, this means it gets included in the master files which
# are used by convert_to_web_app_json.py to create graphing files (SwissClsutres_data.json, USAClusters_data.json, EUClusters_data.json)
# The same files are used for Cases page.
# However, for Per Variant, it pulls everything like this: cluster_tables/*_data.json
# And it doesn't _seem_ like this `graphing` is checked before outputting those files...

# | type                    | PIPELINE & VIZ: Used to distinguish types of graphing, & name of the group in the sidebar on main page
# | mutations               | List of nonsyn & syn muts that should be displayed on variant/mutation pages on the right-hand side
#                           | Also used in mutation_counts.py - when querying CoVSpectrum, all these mutations are removed from results (as they are defining)

# | build_name              | Unique, safe name of a variant (to use in files, keys, URLs etc.) - does not have spaces or special symbols
# | display_name            | Friendly name of a variant (to display to the user) PIPELINE - also CURRENTLY used to match Nextstrain clade
# | nextstrain_name         | Variant name in year-letter Nextstrain nomenclature TODO MAY BE USED IN PIPELINE to match Nextstrain clade in future.
# | who_name                | The Variant name assigned by WHO (Alpha, Beta, etc)


# Visual display on website
# | important               | Boolean: Whether we should show it by default in web or it can be hidden under "show more"
# | has_no_page             | Boolean: if true, variant will not be shown on the left sidebar on main page and will not have a page to navigate to
# | alt_display_name        | REQUIRED: List of alternative friendly names (appear in web under the heading on variant page - and are used in the pango/nextstrain name switch)
# | col                     | Color associated with the variant
# | nextstrain_url          | URL to the phylogenetic tree visualization (the "build" in Nextstrain lingo) of this variant on nextstrain.org
# | old_build_names         | Old variant names in Nextstrain nomenclature (usually before assigned a greek letter)


mock_clusters = {
    "20AS126": {
        "snps": [21939, 1473, 6236],  # S: 126 (21939C)  #ORF1a: 403 (1473T), 1991 (6236A)
        "snps_with_base": ["21939C", "1473T", "6236A"],
        "alt_display_name": ["B.1.620"],
        "cluster_data": [],
        "nextstrain_build": False,
        "graphing": True,
        "type": "variant",
        "important": False,
        "country_info": [],
        "col": "#d5f6d5",
        "display_name": "20A/S:126A",
        "build_name": "20A.S.126A",
        "old_build_names": [],
        "who_name": [],
        "pango_lineages": [
            {"name": "B.1.620", "url": None}
        ],
        "nextstrain_url": "https://nextstrain.org/groups/neherlab/ncov/20A.S.126A",
        "mutations": {
            "nonsynonymous": [
                {'gene': 'S', 'left': 'P', 'pos': 26, 'right': 'S'},
                {"gene": "S", "left": "H", "pos": 69, "right": "-"},
                {"gene": "S", "left": "V", "pos": 70, "right": "-"},
                {"gene": "S", "left": "V", "pos": 126, "right": "A"},
                {"gene": "S", "left": "Y", "pos": 144, "right": "-"},
                {"gene": "S", "left": "L", "pos": 241, "right": "-"},
                {'gene': 'S', 'left': 'L', 'pos': 242, 'right': '-'},
                {"gene": "S", "left": "A", "pos": 243, "right": "-"},
                {"gene": "S", "left": "H", "pos": 245, "right": "Y"},
                {"gene": "S", "left": "S", "pos": 477, "right": "N"},
                {"gene": "S", "left": "E", "pos": 484, "right": "K"},
                {"gene": "S", "left": "D", "pos": 614, "right": "G"},
                {"gene": "S", "left": "P", "pos": 681, "right": "H"},
                {"gene": "S", "left": "T", "pos": 1027, "right": "I"},
                {"gene": "S", "left": "D", "pos": 1118, "right": "H"},
                {'gene': 'ORF1a', 'left': 'T', 'pos': 403, 'right': 'I'},
                {'gene': 'ORF1a', 'left': 'V', 'pos': 1991, 'right': 'I'},
                {'gene': 'ORF1a', 'left': 'S', 'pos': 3675, 'right': '-'},
                {'gene': 'ORF1a', 'left': 'G', 'pos': 3676, 'right': '-'},
                {'gene': 'ORF1a', 'left': 'F', 'pos': 3677, 'right': '-'},
                {'gene': 'ORF1b', 'left': 'P', 'pos': 314, 'right': 'L'},
                {'gene': 'ORF1b', 'left': 'A', 'pos': 1215, 'right': 'S'},
                {"gene": "N", "left": "A", "pos": 220, "right": "V"},
                {'gene': 'ORF9b', 'left': 'I', 'pos': 5, 'right': 'T'},
            ],
            "synonymous": [
                {"left": "C", "pos": 241, "right": "T"},
                {"left": "C", "pos": 3037, "right": "T"},
                {"left": "C", "pos": 15324, "right": "T"},
                {"left": "T", "pos": 20049, "right": "C"},
                {"left": "A", "pos": 23416, "right": "T"},
                {"left": "T", "pos": 27795, "right": "-"},
                {"left": "T", "pos": 27796, "right": "-"},
                {"left": "A", "pos": 27797, "right": "-"},
                {"left": "A", "pos": 28271, "right": "T"},
            ],
        },
    },
}
