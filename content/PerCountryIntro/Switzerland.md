import RegionBreakdown from 'content/RegionBreakdownInfo.md'
import swissRegionMap from 'src/assets/images/swissRegionMap.png'

Graphs show for each multi-canton region, the proportion of total number of **sequences** (*not cases*), over time, that fall into defined variant groups. Regions are displayed if they have at least 20 sequences in any variant being tracked. They are ordered by total number of sequences in tracked variants.

The Swiss regions are the same as those used for the [Sentinella](https://www.sentinella.ch/) surveillance system:
- Region 1: Geneva, Neuchâtel, Vaud, Valais
- Region 2: Bern, Fribourg, Jura
- Region 3: Aargau, Basel-Land, Basel-Stadt, Solothurn
- Region 4: Lucerne, Nidwalden, Obwalden, Schwyz, Uri, Zug
- Region 5: Appenzell Innerrhoden, Appenzell Ausserrhoden, Glarus, Sankt Gallen, Schaffhausen, Thurgau, Zürich
- Region 6: Graubünden, Ticino

Swiss-focused builds for the major variants are available for [20I (Alpha, V1)](https://nextstrain.org/groups/neherlab/ncov/20I.Alpha.V1-swiss?c=division&f_clade_membership=20I%20%28Alpha,%20V1%29&f_country=Switzerland), [20H (Beta, V2)](https://nextstrain.org/groups/neherlab/ncov/20H.Beta.V2-swiss?c=division&f_clade_membership=20H%20%28Beta,%20V2%29&f_country=Switzerland), [20J (Gamma, V3)](https://nextstrain.org/groups/neherlab/ncov/20J.Gamma.V3-swiss?c=division&f_clade_membership=20J%20%28Gamma,%20V3%29&f_country=Switzerland), and [21A (Delta)](https://nextstrain.org/groups/neherlab/ncov/21A.Delta-swiss?c=division&f_clade_membership=21A%20%28Delta%29&f_country=Switzerland).

<figure className="text-center">
  <img src={swissRegionMap.src} alt="Regions in Switzerland" />
</figure>


<RegionBreakdown/>