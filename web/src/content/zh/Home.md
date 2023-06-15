import { HomeImages } from 'src/components/Home/HomeImages'
import { Link } from 'src/components/Link/Link'
import { LinkExternal } from 'src/components/Link/LinkExternal'
import { NameTable } from 'src/components/Common/NameTable'
import { CladeSchema } from 'src/components/Variants/CladeSchema.tsx'

**单击变体按钮开始探索！**

CoVariants 概述了感兴趣的 SARS-CoV-2 变体和突变。在这里，您可以找出哪些突变定义了变体、它们可能产生的影响（通过论文和资源的链接）、在哪里找到变体，并查看 Nextstrain 构建中的变体！

单击其中一个彩色按钮以查看特定的[变体1](/variants) - 以阅读信息、查看图表和蛋白质结构，并链接到重点Nextstrain构建。

要一次查看多个变体，请查看[按变体分布](/per-variant)和[按国家分布](/per-country)页面，你可以在同一位置查看大量数据并比较变体和国家！

<HomeImages/>

**这些名字是什么意思？**
CoVariants对变体使用Nextstrain命名系统（[阅读更多内容](https://nextstrain.org/blog/2021-01-06-updated-SARS-CoV-2-clade-naming/)）。然而，存在多个命名系统的事实令人困惑！请参阅下表以帮助找到你感兴趣的变体。

<NameTable/>

<!-- The variants featured are currently slightly biased towards circulation in Europe: this is simply a reflection that the primary maintainer (Emma Hodcroft) works mostly with European data. We hope to add more variants from other regions soon! -->

所有这些变体/进化枝如何相互关联？ CoVariants遵循Nextstrain进化枝架构，其中变体可以从其他变体派生。以下这张图表显示了Nextstrain进化枝的整体关系：

<CladeSchema/>

这个项目是免费且开源的。你可以在 GitHub 上找到内容、派生数据、用于生成数据的代码以及实现此 Web 应用程序的代码：[github.com/hodcroftlab/covariants](https://github.com/hodcroftlab/covariants/).

> **由于SARS-CoV-2 大流行及其相关研究正在进行中，** 我们将尽一切努力使这个存储库保持最新，但读者应该仔细检查信息是否是最新的。

## 下一步是什么？

- 浏览 [变体](/variants)
- 探索 [按国家分布](/per-country)
- 探索 [按变体分布](/per-variant)
- 查看 [共享突变](/shared-mutations)
- 查看 [常见问题](/faq)
