These are the recent updates on CoVariants in reverse chronological order. For live updates and other interesting content follow [@firefoxx66](https://twitter.com/firefoxx66)

## 2022-11-22
- Fix 'recombinants' category to be fully functional in plots & side-bar menus

## 2022-11-03
- Add a 22F (XBB) page and on plots
- Include 'recombinants' as a group on Per Country & Cases plots (side-bar not functional yet)

## 2022-10-21
- Add a 22E (BQ.1) page and on plots
- Remove Beta & Gamma from the 'important' (default view) buttons

## 2022-09-21
- Start using the newly refactored script cluster_analysis.py, replacing allClusterDynamics_faster.py - runtime is cut to less than 30 minutes and output is the same. This refactoring was done by Moira Zuber, to which CoV is very grateful!

## 2022-08-22
- Up the threshold for number of sequences for a country to be plotted in Per variant view from 1200 to 2000

## 2022-08-12
- Add proper links to the footer of the clades graph on the front page
- Add 'on demand' graph loading on Per Cluster, Cases, and Per Variant pages, thanks to Richard Goater!

## 2022-07-26
- Added 22D page and plots. Removed Iota from Shared Mutation page

## 2022-07-25
- Updated Delta shared mutations, defining mutations, & Delta pages to reflect S:G142D as being a defining mutation. WT is likely shown due to a sequencing issue with ARTIC v3 primers. Thanks to Paula Ruiz Rodriguez for spotting this!

## 2022-07-22
- Per Variants page now displays frequencies in 2 week intervals, unsmoothed (previously this was 1-week intervals with smoothing)
- In both Per Variants & Per Country the 'New Year bug' is fixed. This caused random days to be missed around New Year (due to inability to fit 2-week epi-week intervals neatly into every year). This can in some areas of low sequencing numbers alter how plots display slightly.

## 2022-05-04
- Added the 22A (BA.4), 22B (BA.5), and 22C (BA.2.12.1) variants, in line with updates to Nextstrain's recognised clades

## 2022-04-28
- Added lists of 10 most-frequent non-defining amino-acid mutations to each variant page (spike, and non-spike)

## 2022-04-21
- A new 'Cases' page now shows cases from Our World in Data, coloured by variant

## 2022-03-30
- All non-human samples are now filtered out from CoVariants graphs
- All samples with a quality control (QC) score of 'bad' or '' from NextClade are filtered out of CoVariants graphs

## 2022-03-07
- Add direct URL linking to user selection of variants & countries (or regions) on Per Country and Per Variant pages

## 2022-01-13
- Correct suspected origin date of 20A/S:126A to late 2020 (to reflect publication cited)
- Add '(Omicron)' to 21L in shared mutations table

## 2022-01-11

### Including 21L (Omicron) in plotting

- Include 21L (Omicron) in all plotting
- Create separate 21L (Omicron) page, add to name table, etc
- Separate out "VoC Header" from VoC pages to be an import - easier to update

### Bugfix: Double-dates appearing

- Bugfix for year-switch 'week 0' bug in 2-week datasets

## 2022-01-05

- Add plot of all Nextstrain clades to Variants page

## 2021-12-21

- Add 21M (parent of 21L and 21K) to 21K page
- Updates to the content on 21K page

## 2021-12-15

- Restructuring of the spacing of pages
- Graphs have more space around them and Y-axis is less squashed
- Plot tooltip on Per Variant page now sticks to top of page as you scroll
- Thanks to Richard Goater for these!

## 2021-12-13

- Add 21L section to the 21K page
- Add 21L to the shared mutations table

## 2021-11-19

- Update the Per Cluster plotting threshold to 500 sequences to reduce number of countries being plotted (we run out of colours)

## 2021-11-18

### Region Selection on Per Country page

- In the 'countries' menu on the left, one can now select a whole region (Europe, Asia) and just countries from selected regions will be displayed

## 2021-11-15

- Added new Nextstrain Delta clades 21I (Delta) & 21J (Delta). Both are part of the WHO Delta VoC
- Update pages for Delta, Kappa, and references to the four WHO VoC
- Update colors on the Per Country page

## 2021-11-10

### PDF plots removed

- Less well-done PDF plots of the same information as is on the website are no longer generated, and removed from the github
- Markdown versions of tables are also no longer generated, and removed from the github
- Many old files have been deleted from the github in a cleanup

## 2021-10-11

### Update of 'Per Variant' cluster threshold

- Countries now have to have at least 400 sequences to appear in Per Variant plots

### Removed

- 20A/S.126A (B.1.620) builds. There is very little showing up anymore, though a couple in Switzerland end of Aug. (Graphing will continue)
- 20B/S.732A (B.1.1.519) builds. A little bit of this continues in Mexico but it is expected to fade away. (Graphing will continue)


## 2021-09-16

### Added

- New data in from Brazil, Chile, Peru - all seem to match with continuing expansion of Delta

## 2021-09-02

### Removed

- P.2 from the mutation comparison
- Epsilon builds - no samples since end of July (Graphing will continue)
- 20A.EU2 builds - no samples since July (Graphing will continue)
- 20A/S:439K - no samples since June (Graphing will continue)
- 20A/S:98F - no samples since July (Graphing will continue)

## 2021-01-28

### Initial release

- Interactive graphs for per-country and per-variant
- 'Mutation badges' for AA & nucleotide mutations
- Variant buttons dynamically generated and ordered
- New FAQ & Home pages
- Mutation table with sortable mutation options
