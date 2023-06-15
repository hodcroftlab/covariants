import { Link } from 'src/components/Link/Link'
import { LinkExternal } from 'src/components/Link/LinkExternal'

## Mutation Information

- <AaMut mut="S:N501"/> has appeared multiple times independently: each can be associated with different accompanying mutations
- Amino-acid changes are <AaMut mut={'S:N501Y'}/> (nucleotide mutation <NucMut mut={'A23063T'}/>), <AaMut mut={'S:N501T'}/> (nucleotide mutation <NucMut mut={'A23064C'}/>), and <AaMut mut={'S:N501S'}/> (nucleotide mutation <NucMut mut={'A23064G'}/>)

### S:N501
This mutation is in the receptor binding domain (RDB), important to ACE2 binding and antibody recognition.

- May be associated with adaptation to rodents and mustelids: <AaMut mut={'S:N501T'}/> in ferrets (<LinkExternal href="https://www.nature.com/articles/s41467-020-17367-2">Richard et al., Nature Comm.</LinkExternal>), in mink (<LinkExternal href="https://academic.oup.com/ve/advance-article/doi/10.1093/ve/veaa094/6025194?searchresult=1">Welkers et al., Virus Evolution</LinkExternal>), <AaMut mut={'S:N501Y'}/> and in mice ([Gu et al. Science](https://science.sciencemag.org/content/369/6511/1603)). 
    - Some have speculated on the risk of a possible persistent reservoir in wild rodents/mustelids  
- May increase ACE2 binding ([Bloom Lab ACE2 binding website](https://jbloomlab.github.io/SARS-CoV-2-RBD_DMS/), [Nelson et al., bioRxiv](https://www.biorxiv.org/content/10.1101/2021.01.13.426558v1)) - in particular it is predicted to do this by increasing the time spent in the 'open' conformation ([Teruel et al., bioRxiv](https://www.biorxiv.org/content/10.1101/2020.12.16.423118v2))
- ACE2 binding may be further increased by the presence of <AaMut mut="S:E484K"/>, and stabilized by the presence of <AaMut mut="S:K417N"/> ([Nelson et al., bioRxiv](https://www.biorxiv.org/content/10.1101/2021.01.13.426558v1))
- <AaMut mut={'S:N501Y'}/> was found in longitudinally-collected samples from an immunocompromised patient (<LinkExternal href="https://www.nejm.org/doi/full/10.1056/NEJMc2031364?query=featured_coronavirus">Choi et al., NEJM</LinkExternal>)
- In one study, sera from previously infected patients neutralised viruses with <AaMut mut="S:501N"/> and <AaMut mut="S:501Y"/> equally ([Xie et al., bioRxiv](https://www.biorxiv.org/content/10.1101/2021.01.07.425740v1))
- Tests in people vaccinated with the Moderna and Pfizer-BioNTech vaccines suggest <AaMut mut={'S:N501Y'}/> and <AaMut mut={'S:E484K'}/> individually, and both together in combination with <AaMut mut={'S:K417N'}/>, cause a small but significant reduction in neutralization (<LinkExternal href="https://www.nature.com/articles/s41586-021-03324-6">Wang et al., Nature</LinkExternal>)
- _In vitro_ evolution to select for greater ACE2 binding resulted in mutations <AaMut mut={'S:N501Y'}/>, <AaMut mut={'S:E484K'}/> and <AaMut mut={'S:S477N'}/> to be among the first selected ([Zahradnik et al., bioRxiv](https://doi.org/10.1101/2021.01.06.425392)).

---

The specific mutation <AaMut mut="S:N501Y"/> is found in 3 "Variants of Concern" reported at the end of 2020/beginning of 2021, in:
- the UK (<Var name="20I (Alpha, V1)" prefix=""/> or `B.1.1.7`)
- South Africa (<Var name="20H (Beta, V2)" prefix=""/> or `B.1.351`)
- Brazil ( <Var name="20J (Gamma, V3)" prefix=""/> or `P.1`)

See a <Link href="/shared-mutations">list of shared mutations</Link> for these variants. More information on each of these variants can be found by visiting the links above. 

Smaller clusters of sequences with <AaMut mut="S:N501"/> mutations are also found in Wales, the USA, & Australia.
