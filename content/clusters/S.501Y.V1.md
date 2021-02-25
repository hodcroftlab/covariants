import { Link } from 'src/components/Link/Link'
import { LinkExternal } from 'src/components/Link/LinkExternal'

## Mutation Information

- <AaMut mut="S:N501"/> has appeared multiple times independently: each can be associated with different accompanying mutations
- Amino-acid changes are <AaMut mut={'S:N501Y'}/> (nucleotide mutation <NucMut mut={'A23063T'}/>), <AaMut mut={'S:N501T'}/> (nucleotide mutation <NucMut mut={'A23064C'}/>), and <AaMut mut={'S:N501S'}/> (nucleotide mutation <NucMut mut={'A23064G'}/>)

---

This variant is one of three 3 "Variants of Concern" reported at the end of 2020/beginning of 2021, in:
- the UK (20I/501Y.V1) <Var name="20I/501Y.V1"/>
- South Africa (20H/501Y.V2)  <Var name="20H/501Y.V2"/>
- Brazil (20J/501Y.V3)   <Var name="20J/501Y.V3"/>

See a <Link href="/shared-mutations">list of shared mutations</Link> for these variants. More information on each of these variants can be found by visiting the links above.

---

### 20I/501Y.V1
Also known as `B.1.1.7`
Announced on the 14 Dec 2020, appears to have arisen and/or initially expanded in the South East of England.

501Y.V1 is associated with multiple mutations in Spike, including: <AaMut mut={'S:N501Y'}/>, a deletion at 69/70 (as seen in <Var name="20A/S:439K"/> and <Var name="S:Y453F"/> (<LinkExternal href="https://www.biorxiv.org/content/10.1101/2020.12.14.422555v3">Kemp et al., bioRxiv</LinkExternal>) (<Link href="/variants/S.H69-">see <Var name="S:H69-"/> page</Link>)), as well as <AaMut mut={'S:Y144-'}/> (deletion), and <AaMut mut={'S:P681H'}/> (adjacent to the furin cleavage site).
There is also a notable truncation of <code>ORF8</code>, with <AaMut mut={'ORF8:Q27*'}/> (becomes a stop codon) (deletion of <code>ORF8</code> was previously associated with reduced clinical severity (<LinkExternal href="https://www.thelancet.com/article/S0140-6736(20)31757-8/fulltext">Young et al., Lancet</LinkExternal>)), and mutations in Nucleocapsid: <AaMut mut={'N:D3L'}/> and <AaMut mut={'N:S235F'}/>, as well as a deletion in <code>ORF1a</code>(<code>Nsp6</code>) 3675-3677  (also seen in 501Y.V2 and 501Y.V3).

The 69/70 deletion in this variant causes the S-assay within TaqPath tests to give a negative result, which can provide a useful proxy for prevalence of this variant (a phenomenon referred to as S-gene target failure or SGTF). 

A [small number](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/957504/Variant_of_Concern_VOC_202012_01_Technical_Briefing_5_England.pdf) of 501Y.V1 genomes have been observed in the UK featuring the <AaMut mut={'S:E484K'}/> mutation (see these on the focal <Var name="S:E484"/> Nextstrain build [here](https://nextstrain.org/groups/neherlab/ncov/S.E484?c=gt-S_484&gt=S.484K&label=clade:20I/501Y.V1)). 

Links to papers and reports on 501Y.V1:
- Sera from individuals vaccined with the Moderna vaccine showed no significant reduction of neutralization against 501Y.V1 and a 6-fold reduction in 501Y.V2, but titers remained above levels expected to be protective [Moderna website](https://investors.modernatx.com/news-releases/news-release-details/moderna-covid-19-vaccine-retains-neutralizing-activity-against)
- 40 participants vaccinated with the mRNA BTN162b2 vaccine had "slightly reduced but overall largely preserved neutralizing titers" against 501Y.V1 ([Muik et al., Science](https://science.sciencemag.org/content/early/2021/01/28/science.abg6105.full))
- 501Y.V1 has little reduced neutralization by mAbs and a small reduction to convalescent sera ([Wang et al., bioRxiv](https://www.biorxiv.org/content/10.1101/2021.01.25.428137v2))
- [COG-UK Report](https://www.cogconsortium.uk/news_item/update-on-new-sars-cov-2-variant-and-how-cog-uk-tracks-emerging-mutations/), [Rambaut et al.](https://virological.org/t/preliminary-genomic-characterisation-of-an-emergent-sars-cov-2-lineage-in-the-uk-defined-by-a-novel-set-of-spike-mutations/563), [PHE Technical Briefings 1-5](https://www.gov.uk/government/publications/investigation-of-novel-sars-cov-2-variant-variant-of-concern-20201201)
- Early work suggests a possible increase risk of death with the 501Y.V1 variant ([SAGE Meeting paper 2021/01/21](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/955239/NERVTAG_paper_on_variant_of_concern__VOC__B.1.1.7.pdf))

See a [focal `S.N501` build filtered & zoomed to 501Y.V1](https://nextstrain.org/groups/neherlab/ncov/S.N501?c=gt-S_501&f_clade_membership=20I/501Y.V1&label=clade:20I/501Y.V1&p=grid&r=country)
