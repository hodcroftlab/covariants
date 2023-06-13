
import swissRegionMap from 'src/assets/images/swissRegionMap.png'

图表显示了每个多州区域，随着时间的推移，属于定义的变体组的**序列**（*不是病例*）总数的比例。如果区域在被跟踪的任何变体中至少有20个序列，则会显示这些区域。它们按跟踪变体中的序列总数排序。

瑞士地区与 [Sentinella](https://www.sentinella.ch/) 监控系统使用的地区相同：
- 区域 1：日内瓦、纳沙泰尔、沃州、瓦莱州
- 区域 2：伯尔尼、弗里堡、汝拉
- 区域 3: Aargau, Basel-Land, Basel-Stadt, Solothurn
- 区域 4: 卢塞恩、下瓦尔登、上瓦尔登、施维茨、乌里、楚格
- 区域 5: Appenzell Innerrhoden, Appenzell Ausserrhoden, Glarus, Sankt Gallen, Schaffhausen, Thurgau, Zürich
- 区域 6: 格劳宾登州，提契诺州

<figure className="text-center">
  <img src={swissRegionMap.src} alt="Regions in Switzerland" />
</figure>


<MdxContent filepath="RegionBreakdownInfo.md" />
