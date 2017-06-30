import {colors} from '../Modifiers'


export default {
  // Sizes
  xxs: () => `type--xxs`,
  xs: () => `type--xs`,
  sm: () => `type--sm`,
  md: () => `type--md`,
  lg: () => `type--lg`,
  xl: () => `type--xl`,
  xxl: () => `type--xxl`,
  //Weights
  thin: () => `type--thin`,
  ultraLight: () => `type--ultra-light`,
  light: () => `type--light`,
  regular: () => `type--regular`,
  medium: () => `type--medium`,
  semiBold: () => `type--semi-bold`,
  bold: () => `type--bold`,
  heavy: () => `type--heavy`,

  //Colors
  ...colors('type'),
  // Alignment
  left: () => `type--left`,
  center: () => `type--center`,
  right: () => `type--right`,
  // Overflow
  ellipsis: () => `type--ellipsis`,
}
