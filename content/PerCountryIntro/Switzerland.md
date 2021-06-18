import RegionBreakdown from 'content/RegionBreakdownInfo.md'
import imageUrl from 'src/assets/images/swissRegionMap.png'

Graphs show for each multi-canton region, the proportion of total number of **sequences** (*not cases*), over time, that fall into defined variant groups. Regions are displayed if they have at least 20 sequences in any variant being tracked. They are ordered by total number of sequences in tracked variants.

The Swiss regions are the same as those used for the [Sentinella](https://www.sentinella.ch/) surveillance system:
- Region 1: Geneva, Neuchâtel, Vaud, Valais
- Region 2: Bern, Fribourg, Jura
- Region 3: Aargau, Basel-Land, Basel-Stadt, Solothurn
- Region 4: Lucerne, Nidwalden, Obwalden, Schwyz, Uri, Zug
- Region 5: Appenzell Innerrhoden, Appenzell Ausserrhoden, Glarus, Sankt Gallen, Schaffhausen, Thurgau, Zürich
- Region 6: Graubünden, Ticino

<figure className="text-center">
  <img src={imageUrl} alt="Regions in Switzerland"/>
</figure>


<RegionBreakdown/>