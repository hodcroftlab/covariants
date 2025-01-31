# How to contribute to CoVariants

As an open-source project, we welcome contributions! Please follow the guide below for how to help add to CoVariants!

To make a 'Pull Request' or 'PR,' you'll need to be a little familiar with GitHub. If you aren't comfortable doing this, but still have some information to share or a suggestion to make, you can make an [Issue](https://github.com/hodcroftlab/covariants/issues/new) instead. We may be slower to review and/or implement these, but we still appreciate getting the information!

## How to build locally to check your changes:

When possible, you should build the repository locally after making changes, to check that they look how you expect. In particular, mixing Markdown and JSX can be tricky!

If you can't build the repository - that's ok. By creating a PR an automatic build should trigger, allowing you to view the branch. This isn't as fast as building locally, since it's harder to see the difference between each change, but it can be used for small changes or if you can't build locally.

To build locally:
Navigate to `covariants/web` and type the following commands:
```
cp .env.example .env
nvm use
```

install node modules:
```
yarn install
```

then start the development server with:
```
yarn dev
```

for Windows, (without Linux Subsystem), try:
```
yarn dev:start_win
```

This may take a while to build. Once finished, open a browser and navigate to `localhost:3000`. Note that navigating between pages may be slow: your computer is building each page as it needs them.

## To add links, information, and resources:

You can add links, information, or resources by cloning the CoVariants repo, and making changes to the files in `covariants/content` for the Home, FAQ, and Per Cluster/Country pages, or `covariants/content/clusters` for the Variant pages.

Be sure to preview your changes locally by building the repository (see above).


## To add new variant:

To add a new variant, you'll need to generate the necessary files to plot the graphs and make the other figures.

### Add the cluster

1. Add the new variant to `covariants/scripts/clusters.py` following the format of the existing variants.

### Get the data

2. Ensure your clone of `CoVariants` is in a sister-repository to the Nextstrain `ncov` repository (get it [here](https://github.com/nextstrain/ncov)). You will need to follow the [guide](https://nextstrain.github.io/ncov/index) provided to set up your own build. First, download the `nextmeta` and `nextfasta` files as described in 'Contextualizing your data' [here](https://nextstrain.github.io/ncov/data-prep.html), and put in the `data` folder renamed as `metadata.tsv` and `sequences.fasta`. Then follow the remaining steps to run your own Nextstrain global build, until you have generated the file `results/sequence-diagnostics.tsv`. You can stop here, if you wish.

### Generate the files

3. From within the `ncov` directory (which again, should be a sister-directory to `covariants`), run `scripts/alClusterDynamics_faster.py`. To test just your variant, you can type in just the name of your variant, or you can re-run all the clusters.

### Add the protein structure

4. Copy the amino-acid sequence from the 'S' or 'Structural protein' (spike) sequence from [the reference genome of SARS-CoV-2](https://www.ncbi.nlm.nih.gov/nuccore/MN908947.3/).
5. In your favourite alignment editor, replace the amino acid which reflects the change you wish to show in the protein structure.
6. Navigate to [CoVsurver](https://corona.bii.a-star.edu.sg/) and paste in the modified AA sequence, and press 'submit'.
7. Use your favourite GIF tool to make a GIF of the picture. Try to adjust it to match the ones already on CoVariants. Copy this file into `covariants/web/public/proteins/gif` and ensure the file name matches the 'display name' in `clusters.py`.

### Convert the data

8. After generating all the required files, navigate back to `covariants` and run `make web-data` to convert all the files into the format needed for the website. This will also run scripts to download case data from Our World in Data and combine this with the variant data (for the 'Cases' page) and query mutations from CoV-Spectrum.

You can now try re-building the repository to check that the cluster has been added correctly.
