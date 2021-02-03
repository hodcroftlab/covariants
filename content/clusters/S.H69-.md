import { Link } from 'src/components/Link/Link'
import { LinkExternal } from 'src/components/Link/LinkExternal'

## Mutation Information

- Nonsynonymous: <AaMut mut={'S:H69-'}/> (nucleotides: <NucMut mut={'C21767-'}/>, <NucMut mut={'A21768-'}/>, <NucMut mut={'T21769-'}/>)

### S:H69-
<AaMut mut={'S:H69-'}/> has arisen at 3 times in variants: <Var name="S:Y453F"/>, <Var name="S:N439K"/>, <Var name="S:N501"/> (<LinkExternal href="https://www.biorxiv.org/content/10.1101/2020.12.14.422555v3">Kemp et al. bioRxiv (21 Dec)</LinkExternal>); and has additionally arisen multiple times outside of these variants.<br/><br/>

- <AaMut mut={'S:H69-'}/> may alter the recognition by antibodies, possibly impacting some antibody-therapy treatments, or immunity (<LinkExternal href="https://www.medrxiv.org/content/10.1101/2020.12.05.20241927v2">Kemp et al. - medRxiv (19 Dec)</LinkExternal>).
- In particular, the deletion is predicted structurally to 'tuck in' the Spike N-terminal domain ([Kemp et al. bioRxiv (21 - Dec)](https://www.biorxiv.org/content/10.1101/2020.12.14.422555v3))
- In one study, was identified as a 'recurrent deletion region' (found multiple times in public sequences), but did not impact the 2 monoclonal antibodies tested ([McCarthey et al., bioRxiv](https://www.biorxiv.org/content/10.1101/2020.11.19.389916v1))
- Appeared in a chronicaly infected immunosuppressed patient treated with rituximab monoclonal antibodies (along with <Var name="S:Y453F"/>) ([Bazykin et al., Virological](https://virological.org/t/emergence-of-y453f-and-69-70hv-mutations-in-a-lymphoma-patient-with-long-term-covid-19/580))


Note: the protein figure shows deletions at both positions 69 & 70 (<AaMut mut={'S:H69-'}/>, <AaMut mut={'S:V70-'}/>).

**Important**: *Currently this build detects only the deletion at position 69 in spike, as due to alignment/calling differences, detecting the deletion at position 70 is less reliable. However, they seem to be highly associated.*
