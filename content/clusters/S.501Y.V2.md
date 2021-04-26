import { Link } from 'src/components/Link/Link'
import { LinkExternal } from 'src/components/Link/LinkExternal'

<!-- ## Mutation Information

- <AaMut mut="S:N501"/> has appeared multiple times independently: each can be associated with different accompanying mutations
- Amino-acid changes are <AaMut mut={'S:N501Y'}/> (nucleotide mutation <NucMut mut={'A23063T'}/>), <AaMut mut={'S:N501T'}/> (nucleotide mutation <NucMut mut={'A23064C'}/>), and <AaMut mut={'S:N501S'}/> (nucleotide mutation <NucMut mut={'A23064G'}/>) -->

This variant is one of three 3 "Variants of Concern" reported at the end of 2020/beginning of 2021, in:
- the UK (<Var name="20I/501Y.V1" prefix=""/> or `B.1.1.7`)
- South Africa (<Var name="20H/501Y.V2" prefix=""/> or `B.1.351`)
- Brazil ( <Var name="20J/501Y.V3" prefix=""/> or `P.1`)

See a <Link href="/shared-mutations">list of shared mutations</Link> for these variants. More information on each of these variants can be found by visiting the links above.

---

### 20H/501Y.V2
Also known as `B.1.351`
Announced in December 2020, 501Y.V2 originated and/or initially expanded in South Africa ([Tegally et al., Nature](https://www.nature.com/articles/s41586-021-03402-9)).

501Y.V2 is associated with multiple mutations in Spike. Most notably: <AaMut mut={'S:N501Y'}/> (see <Mut name="S:N501"/>) and <AaMut mut={'S:E484K'}/> (see <Mut name="S:E484"/>). <br/>
But also <AaMut mut={'S:L18F'}/>, <AaMut mut={'S:K417N'}/>, and <AaMut mut={'S:D80A'}/>.
Additionally, there is a deletion at Spike positions 241-243. This is sometimes reported as a mutation at positions 242-244. However, the location of the deletion is ambiguous and the resulting amino-acid sequence is identical either way ([Tegally et al., Nature](https://www.nature.com/articles/s41586-021-03402-9)).
<br/><br/>
There is also a mutation in Nucleocapsid: <AaMut mut={'N:T205I'}/> and a deletion in <code>ORF1a</code>(<code>Nsp6</code>) at positions 3675-3677 (also seen in <Var name="20I/501Y.V1" prefix=""/> and <Var name="20J/501Y.V3" prefix=""/>).
It does _not_ have the deletion at 69/70.

- Sera from individuals vaccined with the Moderna vaccine showed no significant reduction of neutralization against <Var name="20I/501Y.V1" prefix=""/> and a 6-fold reduction in 20H/501Y.V2, but titers remained above levels expected to be protective ([Moderna website](https://investors.modernatx.com/news-releases/news-release-details/moderna-covid-19-vaccine-retains-neutralizing-activity-against))
- 20H/501Y.V2 is reported to have resistance to monoclonal antibodies and convalescent plasma, with one study finding 93% of 44 plasma samples showed a reduction in titer and 48% had no detectable neutralization activity ([Wibmer et al., Nature Medicine](https://www.nature.com/articles/s41591-021-01285-x)). A further study also detected reduction in neutralization by convalescent plasma ([Cele et al., Nature](https://www.nature.com/articles/s41586-021-03471-w)).
- 20H/501Y.V2 has larger reduction to both mAbs and convalescent sera than 501Y.V1 ([Wang et al., Nature](https://www.nature.com/articles/s41586-021-03398-2))

See a [focal `S.N501` build filtered & zoomed to 501Y.V2](https://nextstrain.org/groups/neherlab/ncov/S.N501?c=gt-S_501&f_clade_membership=20H/501Y.V2&label=mlabel:20C/C23664T&p=grid&r=country)

See a [focal `S.E484` build filtered & zoomed to 501Y.V2](https://nextstrain.org/groups/neherlab/ncov/S.E484?c=gt-S_484&f_clade_membership=20H/501Y.V2&label=clade:20H/501Y.V2&p=grid&r=country)
