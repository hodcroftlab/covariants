import { Link } from 'src/components/Link/Link'
import { LinkExternal } from 'src/components/Link/LinkExternal'

## Mutation Information

- <AaMut mut="S:N501"/>已独立出现多次：每次都可能与不同的伴随突变相关联。
- 氨基酸变化包括<AaMut mut={'S:N501Y'}/> (核苷酸突变<NucMut mut={'A23063T'}/>)、<AaMut mut={'S:N501T'}/> (核苷酸突变<NucMut mut={'A23064C'}/>)和<AaMut mut={'S:N501S'}/> (核苷酸突变<NucMut mut={'A23064G'}/>)。

### S:N501
该突变位于受体结合域 (RDB)，对 ACE2 结合和抗体识别很重要。

- 可能与适应啮齿动物和鼬科动物有关：在雪貂(<LinkExternal href="https://www.nature.com/articles/s41467-020-17367-2">Richard等, Nature Comm.</LinkExternal>)、貂(<LinkExternal href="https://academic.oup.com/ve/advance-article/doi/10.1093/ve/veaa094/6025194?searchresult=1">Welkers等, Virus Evolution</LinkExternal>)和老鼠(<LinkExternal href="https://science.sciencemag.org/content/369/6511/1603">Gu等, Science</LinkExternal>)的身体中发现<AaMut mut={'S:N501T'}/>、 <AaMut mut={'S:N501Y'}/>。 
    - 一些人推测野生啮齿动物/鼬科动物可能存在持久性宿主的风险。  
- 可能增强ACE2绑定 ([Bloom Lab ACE2 binding website](https://jbloomlab.github.io/SARS-CoV-2-RBD_DMS/), [Nelson等, bioRxiv](https://www.biorxiv.org/content/10.1101/2021.01.13.426558v1)) - 特别是预计通过增加在“开放”构象中花费的时间来做到这一点 ([Teruel等, bioRxiv](https://www.biorxiv.org/content/10.1101/2020.12.16.423118v2))
- 由于<AaMut mut="S:E484K"/>的出现，ACE2绑定可能进一步增强，并由<AaMut mut="S:K417N"/>变得更稳定。 ([Nelson等, bioRxiv](https://www.biorxiv.org/content/10.1101/2021.01.13.426558v1))
- 在免疫功能低下患者的纵向收集样本中发现了<AaMut mut={'S:N501Y'}/> (<LinkExternal href="https://www.nejm.org/doi/full/10.1056/NEJMc2031364?query=featured_coronavirus">Choi et al., NEJM</LinkExternal>)
- 在一项研究中，先前感染过的患者的血清中和包含<AaMut mut="S:501N"/>的病毒和包含<AaMut mut="S:501Y"/>的病毒的能力相同([Xie等, bioRxiv](https://www.biorxiv.org/content/10.1101/2021.01.07.425740v1))
- 对接种了 Moderna 和 Pfizer-BioNTech 疫苗的人进行的测试表明， <AaMut mut={'S:N501Y'}/>和<AaMut mut={'S:E484K'}/>单独出现，以及两者与<AaMut mut={'S:K417N'}/>一起出现会导致中和作用小幅但显着降低。(<LinkExternal href="https://www.nature.com/articles/s41586-021-03324-6">Wang et al., Nature</LinkExternal>)
- 选择更大的 ACE2 结合的_体外_ 进化导致突变<AaMut mut={'S:N501Y'}/>、<AaMut mut={'S:E484K'}/>和<AaMut mut={'S:S477N'}/>成为第一个被选择的。([Zahradnik等, bioRxiv](https://doi.org/10.1101/2021.01.06.425392)).

---

特殊突变<AaMut mut="S:N501Y"/>于2020年底/2021年初在3个受关注的变体中找到：
- 英国 (<VarOrLin name="20I (Alpha, V1)" prefix=""/>)
- 南非 (<VarOrLin name="20H (Beta, V2)" prefix=""/>)
- 巴西 ( <VarOrLin name="20J (Gamma, V3)" prefix=""/>)

查看这些变体的<Link href="/shared-mutations">共享突变列表</Link>。可以通过访问上面的链接找到有关这些变体的更多信息。

较少的包含<AaMut mut="S:N501"/>突变序列簇也可以在威尔士、美国和澳洲找到。
