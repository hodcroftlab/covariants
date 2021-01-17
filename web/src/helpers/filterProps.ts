export function filterProps(props: string[]) {
  return { shouldForwardProp: (prop: string | number) => typeof prop === 'string' && !props.includes(prop) }
}
