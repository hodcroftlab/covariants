# Defining Mutations

Hand-curated defining mutations for each Nextstrain Clade from this repo are combined with auto-generated defining mutations for each pango lineage from https://github.com/corneliusroemer/pango-sequences/.

Data updates are run via `.github/workflows/defining_mutations.yml` as a GitHub action. To manually update data
1. download the raw auto-generated data: https://github.com/corneliusroemer/pango-sequences/blob/main/data/pango-consensus-sequences_summary.json
2. place the file in `data/`
3. run in a shell in the root folder `python3 -m scripts.defining_mutations.merge_defining_mutations defining_mutations data web/public/data/definingMutations`
4. Review changes and commit them if you are satisfied
