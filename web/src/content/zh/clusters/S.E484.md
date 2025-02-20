import { Link } from 'src/components/Link/Link'

## Mutation Information

<AaMut mut="S:E484"/>在世界各地独立出现多次：每次都可能与不同的伴随突变相关联。
<br/>
<br/>

### S:E484
该突变位于受体结合域 (RBD)，对 ACE2 结合和抗体识别很重要。

- <AaMut mut="S:E484"/>突变可能会显着降低恢复期血清中和([Greaney等, Cell Host & Microbe](https://pubmed.ncbi.nlm.nih.gov/33592168/))
- 有一个与 <AaMut mut={'S:E484K'}/>相关的再感染案例：有一位之前感染过非<AaMut mut={'S:E484K'}/>SARS-CoV-2变体的女士之后再次感染了携带<AaMut mut={'S:E484K'}/>突变的病毒 ([Nonaka等, EID](https://wwwnc.cdc.gov/eid/article/27/5/21-0191_article))
- 在一项将 SARS-CoV-2 与恢复期血浆共同孵育的研究中，由于<AaMut mut={'S:E484K'}/>突变，在第 73 天完全逃脱了中和作用。([Andreano等, bioRxiv](https://www.biorxiv.org/content/10.1101/2020.12.28.424451v1))
- 在另一项将假型病毒与 SARS-CoV-2 刺突蛋白和单克隆抗体共同孵育的研究中，单克隆抗体和恢复期血清的中和作用在具有`S:E484`突变的病毒中显着降低。 ([Liu等, Cell Host & Microbe](https://www.sciencedirect.com/science/article/pii/S1931312821000445))
- 可能会增加 ACE2 结合，这可能会因<AaMut mut="S:N501Y"/>的存在而进一步增加，并因 <AaMut mut="S:K417N"/>的存在而稳定。([Nelson等, bioRxiv](https://www.biorxiv.org/content/10.1101/2021.01.13.426558v1))
- 对接种 Moderna 和 Pfizer-BioNTech 疫苗的人进行的测试分别表明 <AaMut mut={'S:E484K'}/>和<AaMut mut={'S:N501Y'}/>，两者结合<AaMut mut={'S:K417N'}/>，导致中和作用小而显着的减少。([Wang等, Nature](https://www.nature.com/articles/s41586-021-03324-6))
- 选择更多 ACE2 结合的 _体外_ 进化导致<AaMut mut={'S:E484K'}/>、<AaMut mut={'S:N501Y'}/>和<AaMut mut={'S:S477N'}/>成为首批选择的突变。 ([Zahradnik等, bioRxiv](https://doi.org/10.1101/2021.01.06.425392))。

---

2020年底/2021年初报告的4种变体（其中2个是受关注变体）种发现了特定突变<AaMut mut={'S:E484K'}/>，它们是：
- 南非(<VarOrLin name="20H (Beta, V2)" prefix=""/>)
- 巴西 (<VarOrLin name="20J (Gamma, V3)" prefix=""/>)
- 巴西 (20B/S:484K or `P.2`) (看下面)
- 印度 (<VarOrLin name="21B (Kappa)" prefix=""/>)

查看这些变体的<Link href="/shared-mutations">共享突变列表</Link>。点击上面或下面的20B/S.484K链接可以获得更多关于每一个变体的信息。

在少量的 20I（Alpha，V1）序列中也发现了<AaMut mut={'S:E484K'}/>，可在<VarOrLin name="20I (Alpha, V1)"/>阅读更多内容。

<br/><br/>

---

### 20B/S.484K
也称为`P.2`
2021 年 1 月宣布的新兴进化枝 20B/S.484K，也被认为起源于和/或最初在巴西扩展。([Voloch等, medRxiv](https://jvi.asm.org/content/early/2021/02/25/JVI.00119-21)).

与上面两个变体不同，它在刺突中*没有*携带<AaMut mut={'S:N501Y'}/>。<br/>
它确实有突变：在核衣壳中有<AaMut mut={'N:A119S'}/>和<AaMut mut={'N:M234I'}/>以及在<code>ORF1a</code>中有<AaMut mut={'ORF1a:L3458V'}/>和<AaMut mut={'ORF1a:L3930F'}/>。

查看[focal `S.E484` build filtered & zoomed to 20B/S.484K](https://nextstrain.org/groups/neherlab/ncov/S.E484?c=gt-S_484&f_clade_membership=20B/S.484K&label=clade:20B/S.484K&p=grid&r=country)

