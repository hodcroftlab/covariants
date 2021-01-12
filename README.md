# CoVariants: SARS-CoV-2 Mutations and Variants of Interest

Emma B. Hodcroft<sup>1</sup>

<sup>1</sup>Institute of Social and Preventive Medicine, University of Bern, Bern, Switzerland

<sub>Please cite and link back to this site if you use this resource - Thank you!</sub>

This repository is intended to provide an overview (not necessarily  complete) of SARS-CoV-2 mutations that are of interest.
It should be noted that these mutations are primarily of interest due to spread in Europe: this is simply a reflection that the primary maintainer/author (Emma Hodcroft) works mostly with European data.
<!-- I support and urge others to set up similar sites for non-European clusters/mutations - I will happily link them here if you get in touch. -->

The code used to generate these tables, graphs, and the sequences related to that mutation can be found in this repository.

**The SARS-CoV-2 pandemic & research surrounding it is ongoing.**
I will make every effort to try to keep this repository up-to-date, but readers should take care to double-check that the information is the latest available. <br/>
**I welcome PR requests to this repository providing new links and information!**
The more detail you can include in a pull request (PR) the faster I'll be able to review it.
If possible, provide a PR that adds/edits the appropriate links/etc, and I can merge it faster - if you can't do that, making an [issue](https://github.com/emmahodcroft/cluster_scripts/issues) is fine, but I might be slower incorporating it.


## Mutations

[Overview of all mutation tables & graphs](table_overview.md)

[Overview of all mutation country plots](country_overview.md)

### Index
Clusters/mutations are listed below by the location of a mutation in the spike protein (`S:`) - the letter after `:` indicates the original amino-acid, the number the position in the spike protein, and the last letter, the 'new' amino-acid.<br/>
As `S:N501` has multiple amino-acid mutations, there is no second letter.<br/>
20A.EU1 and 20A.EU2, because of their prominence, have been given 'subclade' names.
The mutation is listed in parentheses after the name.

- [20A.EU1](#20aeu1) _(S:A222V)_
- [20A.EU2](#20aeu2) _(S:S477N)_
- [S:N501](#sn501)
- [S:H69-](#sh69-)
- [S:N439K](#sn439k)
- [S:Y453F](#sy453f)
- [S:S98F](#ss98f)
- [S:E484](#se484)
- [S:D80Y](#sd80y)
- [S:A626S](#sa626s)
- [S:V1122L](#sv1122l)


## 20A.EU1  _(S:A222V)_
![Figure of S:A222V](/other_figures/222.gif)

<sub>Figure made via [GISAID](https://gisaid.org)</sub>

[Dedicated 20A.EU1 Nextstrain build](https://nextstrain.org/groups/neherlab/ncov/20A.EU1?f_region=Europe)

[Table and charts of mutation distribution](cluster_tables/20A.EU1_table.md)

- Defining mutations:
  - Nonsynonymous: `S:A222V`; `ORF10:V30L`; `N:A220V` or `ORF14:L67F` (overlapping reading frame with `N`)
  - Synonymous: `T445C`, `C6286T`, `C26801G`
- `S:A222V`
  - Mutation in the non-terminal domain (NTD), which is not known to play a direct role in receptor binding or membrane fusion
  - Associated with a cluster that initially expanded in Spain and spread across Europe via holiday travel ([see Hodcroft et al preprint](https://www.medrxiv.org/content/10.1101/2020.10.25.20219063v2))

## 20A.EU2  _(S:S477N)_
![Figure of S:S477N](/other_figures/477.gif)

<sub>Figure made via [GISAID](https://gisaid.org)</sub>

[Dedicated 20A.EU2 Nextstrain build](https://nextstrain.org/groups/neherlab/ncov/20A.EU2?f_region=Europe)

[Table and charts of mutation distribution](cluster_tables/20A.EU2_table.md)

- _Note this cluster is only the European appearance of S:477N_
- Defining mutations:
  - Nonsynonymous: `S:S477N`; `N:M234I`, `A376T`; `ORF1b:A176S`, `V767L`, `K1141R`, `E1184D`
  - Synonymous: `C4543T`, `G5629T`, `C11497T`, `T26876C`
- `S:S477N`
  - Mutation is in the receptor binding domain (RDB), important to ACE2 binding and antibody recognition
  - Has arisen independently in Australia and was responsible for much of the summer 2020 outbreak ([Link to Nextstrain build](https://nextstrain.org/ncov/oceania/2020-11-16?c=gt-S_477))
  - May slightly increase ACE2 binding: [Chen et al. JMB](https://www.sciencedirect.com/science/article/pii/S0022283620304563); see also [Bloom Lab ACE2 binding website](https://jbloomlab.github.io/SARS-CoV-2-RBD_DMS/)
  - May confer resistance to multiple antibodies: ([Gaebler et al. bioRxiv](https://www.biorxiv.org/content/10.1101/2020.11.03.367391v1), [Liu et al. bioRxiv](https://www.biorxiv.org/content/10.1101/2020.11.06.372037v1))

## S:N501
![Figure of S:N501](/other_figures/501.gif)

<sub>Figure made via [GISAID](https://gisaid.org)</sub>

[Dedicated S:N501 Nextstrain build](https://nextstrain.org/groups/neherlab/ncov/S.N501)

[Table and charts of mutation distribution](cluster_tables/S.N501_table.md)

- Defining mutations:
  - Has appeared multiple times independently: each can be associated with different accompanying mutations
  - Amino-acid changes are `N501Y` (nucleotide mutation `A23063T`), `N501T` (nucleotide mutation `A23064C`), and `N501S` (nucleotide mutation `A23064G`)
- `S:N501`
  - Mutation is in the receptor binding domain (RDB), important to ACE2 binding and antibody recognition
  - N501Y is associated with recently reported 'new variants' in the UK and South Africa:
    - '20B/501Y.V1' (B.1.1.7) was announced in the South East of England on 14 Dec 2020 ([COG-UK Report](https://www.cogconsortium.uk/news_item/update-on-new-sars-cov-2-variant-and-how-cog-uk-tracks-emerging-mutations/), [Rambaut et al.](https://virological.org/t/preliminary-genomic-characterisation-of-an-emergent-sars-cov-2-lineage-in-the-uk-defined-by-a-novel-set-of-spike-mutations/563), [PHE report](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/947048/Technical_Briefing_VOC_SH_NJL2_SH2.pdf), [PHE Technical Report 2](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/949639/Technical_Briefing_VOC202012-2_Briefing_2_FINAL.pdf), [PHE Technical Report 3](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/950823/Variant_of_Concern_VOC_202012_01_Technical_Briefing_3_-_England.pdf))
      - This particular variant is associated with multiple mutations in Spike, including: `N501Y`, a deletion at 69/70 (as seen in `S:N439K` & `S:Y453F`) ([Kemp et al. bioRxiv (21 Dec)](https://www.biorxiv.org/content/10.1101/2020.12.14.422555v3)), `Y144` deletion, and `P681H` (adjacent to the furin cleavage site).
      - There is also a notable truncation of `ORF8`, with `Q27*` (becomes a stop codon) (deletion of `ORF8` was previously associated with reduced clinical severity ([Young et al. Lancet](https://www.thelancet.com/article/S0140-6736(20)31757-8/fulltext))), and mutations in `N`: `N:D3L` and `S235F`.
    - '20C/501Y.V2' (B.1.351) is found in South Africa and was also announced in December 2020 ([Tegally et al., medRxiv](https://www.medrxiv.org/content/10.1101/2020.12.21.20248640v1))
      - This variant is associated with multiple mutations in Spike, including: `N501Y`, `K417N`, and `D80A`.
      - There is also an `N` mutation: `T205I`.
      - It does _not_ have the deletion at 69/70.
  - Smaller clusters also seen in Wales, USA, & Australia
  - May be associated with adaptation to rodents and mustelids: `N501T` in ferrets ([Richard et al. Nature Comm.](https://www.nature.com/articles/s41467-020-17367-2)) and mink ([Welkers et al. Virus Evolution](https://academic.oup.com/ve/advance-article/doi/10.1093/ve/veaa094/6025194?searchresult=1)); `N501Y` in mice ([Gu et al. Science](https://science.sciencemag.org/content/369/6511/1603))
    - Some have speculated of risk of a persistent reservoir in wild rodents/mustelids
  - May increase ACE2 binding [Bloom Lab ACE2 binding website](https://jbloomlab.github.io/SARS-CoV-2-RBD_DMS/) - in particular it is predicted to do this by increasing the time spent in the 'open' conformation ([Teruel et al., bioRxiv](https://www.biorxiv.org/content/10.1101/2020.12.16.423118v2))
  - `N501Y` was found in longitudinally-collected samples from an immunocompromised patient ([Choi et al. NEJM](https://www.nejm.org/doi/full/10.1056/NEJMc2031364?query=featured_coronavirus))
  - In one study, sera from previously infected patients neutralised patients with `S:501N` and `S:501Y` equally ([Xie et al., bioRxiv](https://www.biorxiv.org/content/10.1101/2021.01.07.425740v1))

## S:H69-
![Figure of S:H69-](/other_figures/6970del.gif)

<sub>Figure made via [GISAID](https://gisaid.org)<br/>
Note this figure shows both the 69 & 70 deletion.</sub>

[Dedicated S:H69- Nextstrain build](https://nextstrain.org/groups/neherlab/ncov/S.H69-?c=gt-S_69,501,453)

[Table and charts of mutation distribution](cluster_tables/S.H69-_table.md)

- Defining mutations:
  - Nonsynonymous: `S:H69-` (nucleotides: `C21767-, A21768-, T21769-`)
- `S:H69-`
  - This deletion has arisen at 3 times in 'recognised clusters': in the `S:Y453F`, `S:N439K`, and `S:N501Y` clusters ([Kemp et al. bioRxiv (21 Dec)](https://www.biorxiv.org/content/10.1101/2020.12.14.422555v3)); and has additionally arisen more times outside of recognised clusters.
  - May alter the recognition by antibodies, possibly impacting some antibody-therapy treatments, or immunity ([Kemp et al. medRxiv (19 Dec)](https://www.medrxiv.org/content/10.1101/2020.12.05.20241927v2)).
  - In particular, the deletion is predicted structurally to 'tuck in' the Spike N-terminal domain ([Kemp et al. bioRxiv (21 Dec)](https://www.biorxiv.org/content/10.1101/2020.12.14.422555v3))
  - In one study, was identified as a 'recurrent deletion region' (found multiple times in public sequences), but did not impact the 2 monoclonal antibodies tested ([McCarthey et al., bioRxiv](https://www.biorxiv.org/content/10.1101/2020.11.19.389916v1))

**Important**: *Currently this build detects only the deletion at position 69 in spike, as due to alignment/calling differences, detecting the deletion at position 70 is less reliable.*
*However, they seem to be highly associated.*

## S:N439K
![Figure of S:N439K](/other_figures/439.gif)

<sub>Figure made via [GISAID](https://gisaid.org)</sub>

[Dedicated S:N439K Nextstrain build](https://nextstrain.org/groups/neherlab/ncov/S.N439K?c=gt-S_439&f_region=Europe)

[Table and charts of mutation distribution](cluster_tables/S.N439K_table.md)

- Defining mutations:
  - Nonsynonymous: `S:N439K`; `ORF1a:I2501T`
  - Synonymous: `C8047T`
- `S:N439K`
  - Mutation is in the receptor binding domain (RDB), important to ACE2 binding and antibody recognition
  - About 2/3 of the sequences in the cluster have deletions at Spike amino-acid positions 69/70 ([Nextstrain build with deletions in cluster highlighted](https://nextstrain.org/groups/neherlab/ncov/S.N439K?c=gt-S_69&label=clade:S.N439K))
  - Has emerged twice independently in Europe, but was exclusive to Scotland in the first wave and went extinct: [Thompson et al. bioRxiv](https://www.biorxiv.org/content/10.1101/2020.11.04.355842v1)
  - May increase ACE2 binding: [Thompson et al. bioRxiv](https://www.biorxiv.org/content/10.1101/2020.11.04.355842v1) & [Chen et al., JMB](https://www.sciencedirect.com/science/article/pii/S0022283620304563); see also [Bloom Lab ACE2 binding website](https://jbloomlab.github.io/SARS-CoV-2-RBD_DMS/)
  - Confers resistance to one of the two antibodies in the Regeneron cocktail (REGN10987); see [Starr et al. bioRxiv](https://www.biorxiv.org/content/10.1101/2020.11.30.405472v1.full) and [Thompson et al. bioRxiv](https://www.biorxiv.org/content/10.1101/2020.11.04.355842v1).
  - May confer resistance to antibodies: C135 ([Weisblum et al. eLife](https://elifesciences.org/articles/61312), [Barnes et al. Nature](https://www.nature.com/articles/s41586-020-2852-1)); a panel of antibodies ([Thompson et al. bioRxiv](https://www.biorxiv.org/content/10.1101/2020.11.04.355842v1))

## S:Y453F
![Figure of S:Y453F](/other_figures/453.gif)

<sub>Figure made via [GISAID](https://gisaid.org)</sub>

[Dedicated S:Y453F Nextstrain build](https://nextstrain.org/groups/neherlab/ncov/S.Y453F?c=gt-S_453&f_region=Europe)

[Table and charts of mutation distribution](cluster_tables/S.Y453F_table.md)

- Defining mutations:
  - Has appeared multiple times independently: each can be associated with different accompanying mutations
- `S:Y453F`
  - Mutation is in the receptor binding domain (RDB), important to ACE2 binding and antibody recognition
  - Associated with the 'cluster 5' 'mink' variant that led to some alarm in Denmark in autumn 2020
    - This variant has the following additional spike mutations: 60/70 deletion, `I692V` and `M1229I`
  - It is has also been seen previously in mink in the Netherlands ([example Nextstrain build](https://nextstrain.org/groups/neherlab/ncov/netherlands?c=gt-S_453&f_country=Netherlands&f_host=Mink))
  - May be a mink-specific adaptation, increasing binding to mink ACE2: ([Rodrigues et al. PloS Comp Bio](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008449) and [Welkers et al. Virus Evolution](https://academic.oup.com/ve/advance-article/doi/10.1093/ve/veaa094/6025194?searchresult=1)); and appearing multiple times ([van Dorp et al. bioRxiv](https://www.biorxiv.org/content/10.1101/2020.11.16.384743v1))
  - May also increase ACE2 binding in humans: [Bloom Lab ACE2 binding website](https://jbloomlab.github.io/SARS-CoV-2-RBD_DMS/)
  - Does confer resistance to an antibody in the Regeneron cocktail: REGN10933 ([Baum et al. Science](https://science.sciencemag.org/content/369/6506/1014/tab-pdf); [Starr et al. bioRxiv](https://www.biorxiv.org/content/10.1101/2020.11.30.405472v1.full))

## S:S98F
![Figure of S:S98F](/other_figures/98.gif)

<sub>Figure made via [GISAID](https://gisaid.org)</sub>

[Dedicated S:S98F Nextstrain build](https://nextstrain.org/groups/neherlab/ncov/S.S98F?c=gt-S_98&f_region=Europe)

[Table and charts of mutation distribution](cluster_tables/S.S98F_table.md)

- Defining mutations:
  - Nonsynonymous: `S:S98F`; `N:P199L` or `ORF14:Q46*` (overlapping reading frames); `ORF3a:Q38R`, `G172R`, `V202L`
  - Synonymous: `C28651T`
- `S:S98F`
  - Mostly found in Belgium and the Netherlands - predominantly Belgium
- Little else is known about this mutation. Please let me know if you have more information!

## S:E484
![Figure of S:E484](/other_figures/484.gif)

<sub>Figure made via [GISAID](https://gisaid.org)</sub> 

[Dedicated S:E484 Nextstrain build](https://nextstrain.org/groups/neherlab/ncov/S.E484?c=gt-S_484&f_region=Europe)

[Table and charts of mutation distribution](cluster_tables/S.E484_table.md)

- Defining mutations:
  - Has appeared multiple times independently: each can be associated with different accompanying mutations
- `S:E484`
  - Primarily associated with the 501Y.V2 variant that arose in South Africa in the winter of 2020([Tegally et al., medRxiv](https://www.medrxiv.org/content/10.1101/2020.12.21.20248640v1)), and a variant predominantly found in Brazil ([de Vasconcelos et al., medRxiv](https://www.medrxiv.org/content/10.1101/2020.12.23.20248598v1.article-info)), but has appeared independently numerous times around the world.
  - Mutations at S:E484 may significantly reduce convalescent serum neutralization ([Greaney et al., medRxiv](https://www.biorxiv.org/content/10.1101/2020.12.31.425021v1))
  - There has been a case of reinfection associated with `S:E484K`: a woman previously infected with a non-`S:E484K` variant of SARS-CoV-2 was later reinfected with a virus carrying the `S:E484K` mutation ([Nonaka et al., PrePrints](https://www.preprints.org/manuscript/202101.0132/v1))
  - In one study co-incubating SARS-CoV-2 with convalescent plasma, neutralization was completely escaped at day 73 due to an `S:E484K` mutation ([Andreano et al., bioRxiv](https://www.biorxiv.org/content/10.1101/2020.12.28.424451v1))

- Little else is known about this mutation. Please let me know if you have more information!

_More information coming soon!_

## S:D80Y
![Figure of S:D80Y](/other_figures/80.gif)

<sub>Figure made via [GISAID](https://gisaid.org)</sub>

[Dedicated S:D80Y Nextstrain build](https://nextstrain.org/groups/neherlab/ncov/S.D80Y?f_region=Europe)

[Table and charts of mutation distribution](cluster_tables/S.D80Y_table.md)

- Defining mutations:
  - Nonsynonymous: `S:D80Y`; `N:S186Y` or `ORF14:P33T` (overlapping reading frames), `D377Y`; `ORF1a:T945I`, `T1567I`, `Q3346K`, `V3475F`, `M3862I`; `ORF1b:P255T`; `ORF7a: R80I`
  - Synonymous:  `G4960T`, `C6070T`, `C7303T`, `C7564T`, `C10279T`, `C10525T`, `C10582T`, `C27804T` <!--Full list: C3099T, G4960T, C4965T, C6070T, C7303T, C7564T, C10279T, C10301A, C10525T, C10582T, G10688T, G11851T, C14230A, C21800T, G27632T, C27804T, C28830A, G29402T -->
  - Of full list of 18 nucleotide mutations, 15 are mutations to `T` (possibly related to APOBEC-like editing within host, see [Simmonds, bioRxiv](https://www.biorxiv.org/content/10.1101/2020.05.01.072330v1))
- `S:D80Y`
  - At the opposite end of the loop 'tucked in' by the 69/70 deletion (hypothetical association). See [S:H69-](#sh69-) for more detail on the impact of 69/70 deletion.
  - Found in at least 10 countries across Europe
- Little else is known about this mutation. Please let me know if you have more information!

## S:A626S
![Figure of S:A626S](/other_figures/626.gif)

<sub>Figure made via [GISAID](https://gisaid.org)</sub>

[Dedicated S:A626S Nextstrain build](https://nextstrain.org/groups/neherlab/ncov/S.A626S?f_region=Europe)

[Table and charts of mutation distribution](cluster_tables/S.A626S_table.md)

- Defining mutations:
  - Nonsynonymous: `S:A626S` (`G23438T`)
  - Synonymous: (none)
- `S:A626S`
  - Found widely across Europe, in at least 15 countries
- Little else is known about this mutation. Please let me know if you have more information!

## S:V1122L
![Figure of S:V1122L](/other_figures/1122.gif)

<sub>Figure made via [GISAID](https://gisaid.org)</sub> 

[Dedicated S:V1122L Nextstrain build](https://nextstrain.org/groups/neherlab/ncov/S.V1122L?c=gt-S_1122&f_region=Europe)

[Table and charts of mutation distribution](cluster_tables/S.V1122L_table.md)

- Defining mutations:
  - Nonsynonymous: `S:V1122L` (`G24926T`)
  - Synonymous: (none)
- `S:V1122L`
  - Found primarily in Sweden and northern European countries, including Norway and Denmark
- Little else is known about this mutation. Please let me know if you have more information!

