import { Link } from 'src/components/Link/Link'
import { LinkExternal } from 'src/components/Link/LinkExternal'

## Mutation Information

- <AaMut mut={'S:H69-'}/> (nucleotides: <NucMut mut={'C21767-'}/>, <NucMut mut={'A21768-'}/>, <NucMut mut={'T21769-'}/>)

### S:H69-
<AaMut mut={'S:H69-'}/> has arisen 3 times in association with other mutations and variants: <Mut name="S:Y453F"/>, <Var name="20A/S:439K"/>, <Var name="20I (Alpha, V1)"/> (<LinkExternal href="https://www.biorxiv.org/content/10.1101/2020.12.14.422555v6">Kemp et al. bioRxiv</LinkExternal>); and has additionally arisen multiple times outside of these variants.<br/><br/>

- <AaMut mut={'S:H69-'}/> may alter the recognition by antibodies, possibly impacting some antibody-therapy treatments, or immunity (<LinkExternal href="https://www.nature.com/articles/s41586-021-03291-y">Kemp et al. - Nature</LinkExternal>).
- In particular, the deletion is predicted structurally to 'tuck in' the Spike N-terminal domain )(<LinkExternal href="https://www.biorxiv.org/content/10.1101/2020.12.14.422555v6">Kemp et al. bioRxiv</LinkExternal>)
- In one study, was identified as a 'recurrent deletion region' (found multiple times in public sequences), but did not impact the 2 monoclonal antibodies tested ([McCarthey et al., Science](https://science.sciencemag.org/content/371/6534/1139))
- Appeared in a chronically infected immunosuppressed patient treated with rituximab monoclonal antibodies (along with <Var name="S:Y453F"/>) ([Bazykin et al., Virological](https://virological.org/t/emergence-of-y453f-and-69-70hv-mutations-in-a-lymphoma-patient-with-long-term-covid-19/580))


Note: the protein figure shows deletions at both positions 69 & 70 (<AaMut mut={'S:H69-'}/>, <AaMut mut={'S:V70-'}/>).

**Important**: *Currently this build detects only the deletion at position 69 in spike, as due to alignment/calling differences, detecting the deletion at position 70 is less reliable. However, they seem to be highly associated.*
