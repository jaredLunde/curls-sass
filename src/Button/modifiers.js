import {colors} from '../Modifiers'


export default {
  // Sizes
  sm: () => `btn--sm`,
  md: () => `btn--md`,
  lg: () => `btn--lg`,
  ...colors('btn')
}
