import PropTypes from 'prop-types'
import {colors, node} from '../PropTypes'


export default {
  // Sizes
  xxs: PropTypes.bool,
  xs: PropTypes.bool,
  sm: PropTypes.bool,
  md: PropTypes.bool,
  lg: PropTypes.bool,
  xl: PropTypes.bool,
  xxl: PropTypes.bool,
  // Weights
  thin: PropTypes.bool,
  ultraLight: PropTypes.bool,
  light: PropTypes.bool,
  regular: PropTypes.bool,
  medium: PropTypes.bool,
  semiBold: PropTypes.bool,
  bold: PropTypes.bool,
  heavy: PropTypes.bool,
  ultraHeavy: PropTypes.bool,
  // Colors
  ...colors,
  // Alignment
  left: PropTypes.bool,
  center: PropTypes.bool,
  right: PropTypes.bool,
  ellipsis: PropTypes.bool,
  ...node
}
