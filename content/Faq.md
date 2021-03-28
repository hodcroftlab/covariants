## Table of contents

[comment]: <> Table of contents is generated automatically

## General questions

### How should I cite or acknowledge this work?

Please do cite and link back to CoVariants.org if you use this resource! 

If you use screenshots from CoVariants.org, please do ensure you credit the website and provide a link back to CoVariants.org.

Citation:

```
Emma B. Hodcroft. 2021. "CoVariants: SARS-CoV-2 Mutations and Variants of Interest." https://covariants.org/
```

Emma Hodcroft, PhD, is a researcher at the Institute of Social and Preventive Medicine, University of Bern in Bern, Switzerland and member of SIB Swiss Insitute of Bioinformatics, Switzerland.

Ivan Aksamentov is a major contributor to this project and is based in the [Neher Lab](https://neherlab.org/) at the University of Basel.

<!-- TODO:

- add citation
- add linking info
- add social media sharing info and links -->

### How can I use this work?

CoVariants is Copyright 2020-2021 Emma Hodcroft.

This CoVariants code and work is licensed under a [GNU Affero General Public License (AGPL)](https://www.gnu.org/licenses/agpl-3.0.en.html). You can view this license [here](https://github.com/hodcroftlab/covariants/blob/master/LICENSE.md). CoVariants is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

This work is enabled by data made available on [GISAID](https://www.gisaid.org/). See the [GISAID Terms of Use](https://www.gisaid.org/registration/terms-of-use/) for more information about how this data can be used. Note that under the terms of use, data on GISAID cannot be redistributed.

### Where can I get the data?

The raw data behind these charts comes from [GISAID](https://www.gisaid.org/). See the [GISAID Terms of Use](https://www.gisaid.org/registration/terms-of-use/) for more information about how this data can be used. Note that under the terms of use, data on GISAID cannot be redistributed.

The derived sequence counts used to generate the plots seen here are available. You can find them 'per variant' as JSON or TSV files [in this Github folder](https://github.com/hodcroftlab/covariants/tree/master/cluster_tables), or 'per country' as a JSON file [here](https://github.com/hodcroftlab/covariants/blob/master/cluster_tables/EUClusters_data.json). 

**If you use this data please [credit this resource](#how-should-i-cite-or-acknowledge-this-work) appropriately, including linking back to this website.**

### How can I contribute to this work (add a paper, fix an error, or make a suggestion)?

**PR requests to this repository providing new links and information are very welcome!** The more detail you can include in a [pull request (PR)](https://github.com/hodcroftlab/covariants/pulls) the faster we will be able to review it!

If possible, provide a PR that adds/edits the appropriate links/etc, and it can be merged faster - if you can't or don't know how to do that, making an [issue](https://github.com/hodcroftlab/covariants/issues) is fine! (But might be incorporated a little slower!)

You can also use the "Propose changes to this section" links that you will often see in the top-right of sections across the website.

<!-- TODO:

- TODO: Add link to discussion and twitter.

- TODO: Add link to issues and pull requests.

- TODO: Add content contributors guide. Where, how, what. How to add new content and data.

- TODO: Add software developers guide. -->


### I want to stay up-to-date on the topic. What you suggest?

To stay up-to-date on SARS-CoV-2 variants, you can follow Emma Hodcroft on Twitter ([@firefoxx66](https://twitter.com/firefoxx66)) - she often tweets about updates and changes to the website.

You should also follow Nextstrain ([@nextstrain](https://twitter.com/nextstrain)) - there is an update every weekday on the latest sequences available from around the world.

You can also check out the [CoV-Lineages Global Report](https://cov-lineages.org/global_report.html) to read more information on some of the variants.


## Questions about the Variants

### What do the names you use mean?

Variants/mutations are listed by the location of a mutation in the spike protein (`S:`). The letter after `:` indicates the original amino-acid, the number is the position of the amino-acid in the spike protein, and the last letter is the 'new' amino-acid.

For some builds, like `S:N501` and `S:E484`, there is no last letter. This is because the builds track multiple amino-acid changes.

Some variants have different names, like `20A.EU1` and `20A.EU2`. This is because of their prominence - they've been given 'clade' and 'subclade' names. A defining mutation is often listed in parentheses after the name.

### How do you choose what variants to track?

Generally, variants are added due to a few criteria:
- If they seem to account for a significant fraction of sequences in a region or a country
- If they have expanded quickly in a region or country
- If they are considered a variant of concern or interest
- If their defining mutations are considered of concern or interest

So far, the focus of this website has primarily been on variants found in Europe, but work is in motion to expand this to be more broad.

### Where can I see all the information & plots in one place?

Check out the links below:

[Overview of all mutation tables & graphs](/per-variant)

[Overview of all mutation country plots](/per-country)

---

## What's next?

- Go to [home page](/)
- View [variants](/variants)
- See [shared mutations](/shared-mutations)
