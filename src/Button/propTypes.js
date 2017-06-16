import PropTypes from 'prop-types'
import {colors, node} from '../PropTypes'


export default {
  // Sizes
  sm: PropTypes.bool,
  md: PropTypes.bool,
  lg: PropTypes.bool,
  ...node,
  ...colors
}
