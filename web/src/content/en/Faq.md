## Table of contents

[comment]: Table of contents is generated automatically

## General questions

### How should I cite or acknowledge this work?

Please do cite and link back to CoVariants.org if you use this resource! 

If you use screenshots from CoVariants.org, please do ensure you credit the website and provide a link back to CoVariants.org.
Screenshots are provided under a [CC-BY-4.0 license](https://creativecommons.org/licenses/by/4.0/).

If you use data from CoVariants.org, please check the "How can I use this work?" question below for information on licensing, and cite and link back to both CoVariants.org and GISAID.

Citation:

```
Emma B. Hodcroft. 2021. "CoVariants: SARS-CoV-2 Mutations and Variants of Interest." https://covariants.org/
```

Emma Hodcroft, PhD, is a researcher at the Institute of Social and Preventive Medicine, University of Bern in Bern, Switzerland and member of SIB Swiss Institute of Bioinformatics, Switzerland.

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

The derived sequence counts used to generate the plots seen here are available. You can find them 'per variant' as JSON or TSV files [in this GitHub folder](https://github.com/hodcroftlab/covariants/tree/master/cluster_tables), or 'per country' as a JSON file [here](https://github.com/hodcroftlab/covariants/blob/master/cluster_tables/EUClusters_data.json), or [here](https://github.com/hodcroftlab/covariants/blob/master/web/public/data/perCountryData.json) (data is the same, file format differs slightly). You can find the data behind the estimated cases by variant plots [here](https://github.com/hodcroftlab/covariants/blob/master/web/public/data/perCountryDataCaseCounts.json).

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

### When do you update CoVariants?

I try to update CoVariants about twice a week. However, updating CoVariants is essentially a one-woman project, so if things get busy or technical issues arise, updates can sometimes be less frequent. I really appreciate your patience when this happens - I know it can be frustrating!

### The data has just been updated -- why don't the graphs go up to 'today'?

In general, it takes at least 2 weeks to go from 'sample taken' to 'sequenced and publicly available' which is necessary for CoVariants to pull the data in. For many places, or at certain times, it can take even longer to get sequences generated and online. Thus, even when CoVariants has just been updated with the latest data, the 'newest' data points are usually at least 2 weeks prior to the current date!

### What date is used on the graphs?

The dates used are always the dates a sample was taken. Only samples with a sampling day, month, and year are included in CoVariants, to ensure accuracy. 

### What are 'defining mutations'?

I consider 'defining mutations' (appears on the right side of Variant pages) to be the mutations that define the phylogenetic root of a variant. This means that not every sequence in that variant must have them, or should be expected to have them (though many will!). I determine the defining mutations by looking at the mutations present at the root node of a variant on a Nextstrain tree. 
You can find the list of defining mutations for each variant in a machine-readable format in [clusters.py](https://github.com/hodcroftlab/covariants/blob/master/scripts/clusters.py).

### What are 'non-defining mutation counts'?

This data is provided by [CoV-Spectrum](https://cov-spectrum.org/), a fantastic resource. 
'Non-defining mutation counts' are intended to give an overview of that most common amino-acid (AA) mutations seen in a variant, excluding the AA mutations that define the variant (as we'd expect these to be present at high frequencies). 
This can give insight into AA mutations that may be common or rising in prevalence, and that may be worth looking into more closely.
To show more mutations, we show two mutation tables, one for 'Gene S' (Spike) and another for other (non-S) genes.

### What do the names you use mean?

Variants that are recognised as clades in the [Nextstrain nomenclature](https://nextstrain.org/blog/2021-01-06-updated-SARS-CoV-2-clade-naming) are shown with this name (ex: '21A'). This is often accompanied by an official [WHO designation](https://www.who.int/en/activities/tracking-SARS-CoV-2-variants/) (ex: 'Alpha', 'Beta'). Additionally, we provide the corresponding [Pango lineage](https://cov-lineages.org/) for each variant, when available. You can toggle between Nextstrain and Pango nomenclature using the toggle in the top-right. An overview table of the nomenclature relationships can be found on the [home](/) and [variants](/variants) page. 

Variants/mutations without official names are listed by the location of a mutation in the spike protein (`S:`). The letter after `:` indicates the original amino-acid, the number is the position of the amino-acid in the spike protein, and the last letter is the 'new' amino-acid. For Variants named like this, they are often preceded by the 'parent' clade name (ex: 20A/S:439K).

For many nutation builds, like `S:N501` and `S:E484`, there is no last letter. This is because the builds track multiple amino-acid changes.

Some variants have different names, like `20A.EU2`. This is because of their prominence - they've been given 'clade' and 'subclade' names. A defining mutation is often listed in parentheses after the name.

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
