# SARS-CoV-2 Mutations of Interest

These collection of Github pages is intended to provide an overview (not neccessarily complete) of a collection of SARS-CoV-2 mutations that are of interest.
It should be noted that these mutations are primarily of interest due to spread in Europe: this is simply a reflection that the primary maintainer/author (Emma) is based in Europe and works mostly with European data.
I support and urge others to set up similar sites for non-European clusters/mutations - I will happily link them here if you get in touch.

**The SARS-CoV-2 pandemic & research surrounding it is ongoing.**
I will make every effort to try to keep this repository up-to-date, but readers should take care to double-check that the information is the latest available.
I welcome PR requests to this repository providing new links and information!
The more detail you can include an PR request the faster I'll be able to review it.

## Mutations

[Overview of all mutation tables & graphs](README.md)
[Overview of all mutation country plots](country_overview.md)


- [20A.EU1](#20aeu1) _(S:A222V)_
- [20A.EU2](#20aeu2) _(S:S477N)_
- [S:S98F](#ss98f)
- [S:D80Y](#sd80y)
- [S:N439K](#sn439k)
- [S:Y453F](#sy453f)
- [S:N501](#sn501)
- [S:A626S](#sa626s)

## 20A.EU1  _(S:A222V)_
(Insert picture)
- Defining mutations:
  - Nonsynonymous: `S:A222V`; `ORF10:V30L`; `N:A220V` or `ORF14:L67F` (overlapping reading frame with `N`)
  - Synonymous: `T445C`, `C6286T`, `C26801G`
- `S:A222V`
  - Mutation in the non-terminal domain (NTD), which is not known to play a direct role in receptor binding or membrane fusion
  - Associated with a cluster that initially expanded in Spain and spread across Europe via holiday travel ([see Hodcroft et al preprint](https://www.medrxiv.org/content/10.1101/2020.10.25.20219063v2))

## 20A.EU2  _(S:S477N)_
(Insert picture)
- _Note this cluster is only the European appearance of S:477N - see below_
- Defining mutations:
  - Nonsynonymous: `S:S477N`; `N:M234I`, `A376T`; `ORF1b:A176S`, `V767L`, `K1141R`, `E1184D`
  - Synonymous: `C4543T`, `G5629T`, `C11497T`, `T26876C`
- `S:S477N`
  - Mutation is in the receptor binding domain (RDB), important to ACE2 binding and antibody recognition
  - Has arisen independantly in Australia and was responsiblef or much of the summer 2020 outbreak ([Link to Nextstrain build](https://nextstrain.org/ncov/oceania/2020-11-16?c=gt-S_477))
  - May slightly increase ACE2 binding: [Chen et al. JMB](https://www.sciencedirect.com/science/article/pii/S0022283620304563); see also [Bloom Lab ACE2 binding website](https://jbloomlab.github.io/
  SARS-CoV-2-RBD_DMS/)
  - May confier resistance to antibodies: [Gaebler et al. bioRxiv](https://www.biorxiv.org/content/10.1101/2020.11.03.367391v1)

## S:N439K
![Figure of S:N439K](/other_figures/439.gif)
- Defining mutations:
  - Nonsynonymous: `S:N439K`; 
  - Synonymous: 
- `S:N439K`
  - Mutation is in the receptor binding domain (RDB), important to ACE2 binding and antibody recognition
  - About 2/3 of sequences in cluster have deletions at Spike amino-acid positions 69/70 ([Nextstrain build with deletions in cluster highlighted](https://nextstrain.org/groups/neherlab/ncov/S.N439K?c=gt-S_69&label=clade:S.N439K))
  - Has emerged twice independantly in Europe, but was exclusive to Scotland in the first wave and went extinct [Thompson et al. bioRxiv](https://www.biorxiv.org/content/10.1101/2020.11.04.355842v1)
  - May increase ACE2 binding: [Thompson et al. bioRxiv](https://www.biorxiv.org/content/10.1101/2020.11.04.355842v1); see also [Bloom Lab ACE2 binding website](https://jbloomlab.github.io/
  SARS-CoV-2-RBD_DMS/)
  - May confer resistance to antibodies: C135 [Weisblum et al. eLife](https://elifesciences.org/articles/61312), [Barnes et al. Nature](https://www.nature.com/articles/s41586-020-2852-1); a panel of antibodies [Thompson et al. bioRxiv](https://www.biorxiv.org/content/10.1101/2020.11.04.355842v1)



## S:Y453F

## S:S98F

## S:D80Y

## S.N501
![Figure of S:N501](/other_figures/501.gif)
- Defining mutations:
  - Has appeared multiple times independantly: each can be associated with different accompanying mutations
  - Amino-acid changes are `N501Y` (nucleotide mutation `A23063T`), `N501T` (nucleotide mutation `A23064C`), and `N501S` (nucleotide mutation `A23064G`)
- `S:N501`
  - Mutation is in the receptor binding domain (RDB), important to ACE2 binding and antibody recognition
  - Associated with a recently reported 'new variant' announced in the South East of England [COG-UK Report](https://www.cogconsortium.uk/news_item/update-on-new-sars-cov-2-variant-and-how-cog-uk-tracks-emerging-mutations/)
    - This particular variant is associated with multiple mutations in Spike, including: `N501Y`, a deletion at 69/70 (as seen in `S:N439K` & `S:Y453F`), and `P681H`
  - May be associated with adaptation to rodents and mustelids: `N501T` in ferrets [Richard et al. Nature Comm.](https://www.nature.com/articles/s41467-020-17367-2);`N501Y` in mice [Gu et al. Science](https://science.sciencemag.org/content/369/6511/1603) 
    - Some have speculated of risk of a persistant reservoir in wild rodents/mustelids
  - May increase ACE2 binding: [Bloom Lab ACE2 binding website](https://jbloomlab.github.io/
  - `N501Y` was found in logitudinally-collected samples from an immunocompromised patient [Choi et al. NEJM](https://www.nejm.org/doi/full/10.1056/NEJMc2031364?query=featured_coronavirus)


## S.A626S