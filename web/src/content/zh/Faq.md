## 目录

## 通用问题

### 我该如何引用或者让别人知道这个作品？

如果你使用了这个作品中的资源，请务必引用，并创建指向CoVariants.org的链接！ 

如果你使用了来自CoVariants.org的截图，请确认你为这个网站提供了背书，并提供一个指向CoVariants.org的链接。
截图是按照[CC-BY-4.0协议](https://creativecommons.org/licenses/by/4.0/)提供的。

如果你使用了来自CoVariants.org的数据，请阅读下面的"我该如何使用这个作品？"，来了解关于证书、引用、以及指向CoVariants.org和GISAID的链接。

引用:

```
Emma B. Hodcroft. 2021. "CoVariants: SARS-CoV-2 Mutations and Variants of Interest." https://covariants.org/
```

Emma Hodcroft, PhD, 是一位伯尔尼大学社会与预防医学学员的研究员。该大学坐落于瑞典伯尔尼，她也是瑞士生物信息研究所瑞典分所的成员。

Ivan Aksamentov是这个项目的主要贡献者，他任职于巴塞尔大学[内尔实验室](https://neherlab.org/)。

<!-- TODO:

- add citation
- add linking info
- add social media sharing info and links -->

### 我该如何使用这个作品？

CoVariants的版权归Emma Hodcroft所有，2020-2021

CoVariants的代码和作品已根据[GNU通用公共许可证(AGPL)](https://www.gnu.org/licenses/agpl-3.0.en.html)获得许可，你可以在[这里](https://github.com/hodcroftlab/covariants/blob/master/LICENSE.md)查阅该许可证。CoVariants的分发是希望它有用处，但不提供任何保证，甚至没有针对特定用途的适销性或适用性的默许保证。See the GNU Affero General Public License for more details.

该作品是由[GISAID](https://www.gisaid.org/)提供数据，想知道这些数据是如何使用的，可以查看 [GISAID使用规范](https://www.gisaid.org/registration/terms-of-use/)。注意，由于使用规范的要求，GISAID的数据不能再分发。

### 我从哪里获得数据？

这些图表的原始数据来自[GISAID](https://www.gisaid.org/)。想知道这些数据是如何使用的，可以查看 [GISAID使用规范](https://www.gisaid.org/registration/terms-of-use/)。注意，由于使用规范的要求，GISAID的数据不能再分发。

用于生成此处所示图的派生序列计数可用，你可以[在此Github目录](https://github.com/hodcroftlab/covariants/tree/master/cluster_tables)"按变体”找到相应的JSON或TSV文件。或者[在这里](https://github.com/hodcroftlab/covariants/blob/master/cluster_tables/EUClusters_data.json)以及[这里](https://github.com/hodcroftlab/covariants/blob/master/web/data/perCountryData.json)按国家找到对应的JSON文件 (其实数据是一样的，只是文件格式略有不同)。你可以在[这里](https://github.com/hodcroftlab/covariants/blob/master/web/data/perCountryDataCaseCounts.json)通过变体图表找到估计病例背后的数据。

**如果你正在使用该数据，请适当[相信这个资源](#how-should-i-cite-or-acknowledge-this-work)，包括链接回本网站。**

### 我该如何贡献给该作品（添加论文、修复错误、提出建议）？

**非常欢迎对此存储库提出 PR 请求，提供新的链接和信息!** 您可以在[PR](https://github.com/hodcroftlab/covariants/pulls)中包含的详细信息越多，我们审核它的速度就越快!

如果可能，提供一个添加/编辑适当链接 等的 PR，它可以更快地合并。如果你不能或不知道该怎么做，提出一个[问题](https://github.com/hodcroftlab/covariants/issues)也很好。（但可能合并得慢一点！）

您还可以使用“建议对此部分进行更改”链接，通常这个链接在网站每个页面的右上角。

<!-- TODO:

- TODO: Add link to discussion and twitter.

- TODO: Add link to issues and pull requests.

- TODO: Add content contributors guide. Where, how, what. How to add new content and data.

- TODO: Add software developers guide. -->


### 我想及时获得关于这个话题的更新，请问你有什么建议吗？

要了解 SARS-CoV-2 变体的最新信息，你可以在 Twitter 上关注 Emma Hodcroft([@firefoxx66](https://twitter.com/firefoxx66))，她经常发布有关网站更新和更改的推文。

你还应该关注Nextstrain ([@nextstrain](https://twitter.com/nextstrain))，每个工作日都会更新来自世界各地的最新序列。

你还可以查看 [CoV-Lineage全球报告](https://cov-lineages.org/global_report.html)，以阅读有关某些变体的更多信息。

## 关于病毒变体的问题

### 你如何更新CoVariants？

我将尝试一周更新CoVariants两次。然而，更新CoVariants这个活基本是一个女人完成的任务，如果忙或者有技术问题，更新可能会变慢。 我知道这可能让人沮丧，还是很感谢你的耐心。

### 既然数据已经更新了，为什么图表不是最新的？

一般来说，从“采集样本”到“测序并公开可用”至少需要两周的时间，这是CoVariants提取数据所必需的。对于许多地方或某些时间，可能需要更长时间才能获得序列生成和在线。因此，即使CoVariants刚刚用最新数据更新，“最新”数据点通常至少比当前日期早2周！

### 图表中用的是什么数据?

使用的日期始终是取样的日期。 CoVariants 中仅包含采样日期、月份和年份的样本，以确保准确性。

### 什么是"定义的突变“?

我认为“定义突变”（出现在变体页面的右侧）是定义变体系统发育根的突变。这意味着并非该变体中的每个序列都必须具有它们，或者应该期望具有它们（尽管很多都会！）。我是通过查看 Nextstrain 树上变体的根节点上存在的突变来确定定义突变。

你可以在[clusters.py](https://github.com/hodcroftlab/covariants/blob/master/scripts/clusters.py)中以机器可读的格式找到为每个变体定义突变的列表。

### 什么是'非定义突变计数'?

这个数据是由[CoV-Spectrum](https://cov-spectrum.org/)提供，这是个很棒的资源。 
“非定义突变计数”旨在概述变体中最常见的氨基酸 (AA) 突变，不包括定义变体的 AA 突变（因为我们预计这些会以高频率出现）。 这可以深入了解很常见或流行率上升的 AA 突变，这可能值得更仔细地研究。为了显示更多突变，我们显示了两个突变表，一个用于“基因 S”（刺突），另一个用于其他（非刺突）基因。

### 你使用的这些名字是什么意思？

在[Nextstrain 命名法](https://nextstrain.org/blog/2021-01-06-updated-SARS-CoV-2-clade-naming)中被识别为进化枝的变体使用此名称显示（例如：“21A”）。这通常伴随着[世界卫生组织的官方指定](https://www.who.int/en/activities/tracking-SARS-CoV-2-variants/) (例如：'Alpha', 'Beta').

没有正式名称的变体/突变按刺突蛋白 (`S:`) 中的突变位置列出。 `:` 后面的字母表示原始氨基酸，数字是氨基酸在刺突蛋白中的位置，最后一个字母是“新”氨基酸。对于这样命名的变体，它们通常以“父”进化枝名称开头（例如：20A/S:439K）。

许多突变构建，如“S:N501”和“S:E484”，没有最后一个字母，这是因为这些构建跟踪多个氨基酸改变。

一些变体有不同的名称，例如“20A.EU2”。这是因为它们的显着性——它们被赋予了“分支”和“子分支”的名称。定义突变通常列在名称后的括号中。

### 你是如何选择需要跟踪的病毒变体的？

一般来说，变体是根据以下标准添加的：
- 如果它们似乎占了一个地区或国家序列的很大一部分
- 如果它们在一个地区或国家迅速扩张
- 如果它们被认为值得关注或感兴趣的变体
- 如果它们的定义突变被认为值得关注或感兴趣

到目前为止，该网站的重点主要是在欧洲发现的变体，但正在努力将其扩展到更广泛的范围。

### 我在哪里可以看到所有信息和图表？

看看以下链接

[所有突变表和图表的概览](/per-variant)

[所有突变国家地区概览](/per-country)

---

## 下一步？

- 返回[首页](/)
- 阅读[变体](/variants)
- 阅读[共享突变](/shared-mutations)
