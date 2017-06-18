export default {
  flex: mod => 'flex',
  fixed: mod => 'flex--fixed',
  fluid: mod => 'flex--fluid',
  first: mod => 'flex--first',
  last: mod => 'flex--last',
  grow: mod => 'flex--grow',
  shrink: mod => '-flex-shrink',
  row: mod => 'flex--x',
  column: mod => 'flex--y',
  reverseX: mod => 'flex--x-reverse',
  reverseY: mod => 'flex--y-reverse',
  wrapReverse: mod => 'flex--wrap-reverse',
  nowrap: mod => 'flex--nowrap',
  justify: mod => `flex--x-${mod}`,
  align: mod => `flex--y-${mod}`,
  alignContent: mod => `flex--content-${mod}`,
  alignSelf: mod => `flex--self-${mod}`
}