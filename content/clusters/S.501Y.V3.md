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

### 20J/501Y.V3
Also known as `P.1`
Announced in January 2021, 501Y.V3 originated and/or initially expanded in Brazil ([Faria et al., Virological](https://virological.org/t/genomic-characterisation-of-an-emergent-sars-cov-2-lineage-in-manaus-preliminary-findings/586)), and was particularly associated with Manaus, Amazonas.
It has also been identified in travellers arriving in Japan from Brazil ([English Translation of Japanese NIID report](https://translate.google.com/translate?sl=ja&tl=en&u=https://www.niid.go.jp/niid/ja/diseases/ka/corona-virus/2019-ncov/10107-covid19-33.html), [Naveca et al., Virological](https://virological.org/t/phylogenetic-relationship-of-sars-cov-2-sequences-from-amazonas-with-emerging-brazilian-variants-harboring-mutations-e484k-and-n501y-in-the-spike-protein/585)).

501Y.V3 is associated with multiple mutations in Spike. Notably: <AaMut mut={'S:N501Y'}/> (see <Mut name="S:N501"/>), <AaMut mut={'S:E484K'}/> (see <Var name="S:E484"/>).<br/>
But also <AaMut mut={'S:L18F'}/>, <AaMut mut={'S:K417N'}/> and <AaMut mut={'S:H655Y'}/>. <br/>

There is also a mutation in Nucleocapsid: <AaMut mut={'N:P80R'}/> and the deletion in <code>ORF1a</code>(<code>Nsp6</code>) at positions 3675-3677 (also seen in <Var name="20I/501Y.V1"/> and <Var name="20H/501Y.V2"/>).
It does _not_ have the deletion at 69/70.

- Convalescent plasma from individuals infected with non-501Y.V3 variants had 6-fold reduced neutralization of 501Y.V3 compared to non-501Y.V3 isolates. Additionally, plasma from CoronaVac (an inactivated vaccine) vaccinated patients appears to neutralise 501Y.V3 isolates less effectively than non-501Y.V3 (though sample size was small) ([de Souza et al., Lancet Preprints](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3793486))
- Modelling work estimates that 501Y.V3 may be 1.4-2.2 times more transmissible ([Faria et al., GitHub](https://github.com/CADDE-CENTRE/Novel-SARS-CoV-2-P1-Lineage-in-Brazil))

See a [focal `S.N501` build filtered & zoomed to 501Y.V3](https://nextstrain.org/groups/neherlab/ncov/S.N501?f_subclade_membership=20J/501Y.V3&label=clade:20J/501Y.V3&p=grid&r=country)

See a [focal `S.E484` build filtered & zoomed to 501Y.V3](https://nextstrain.org/groups/neherlab/ncov/S.E484?c=gt-S_484&f_clade_membership=20J/501Y.V3&label=clade:20J/501Y.V3&p=grid&r=country)

