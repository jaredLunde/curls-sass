import {toKebabCase} from 'react-cake'


export default {
  // margin
  m: mod => `m--${mod}`,
  // padding
  p: mod => `p--${mod}`,
  // background-color
  bg: mod => `bg--${toKebabCase(mod)}`,
  // border-width
  bw: mod => `bw--${mod}`,
  // border-radius
  br: mod => `br--${mod}`,
  // border-color
  bc: mod => `bc--${toKebabCase(mod)}`,
  // position relative
  pr: () => 'pr',
  // position absolute
  pa: () => 'pa',
  // position fixed
  pf: () => 'pf',
}
