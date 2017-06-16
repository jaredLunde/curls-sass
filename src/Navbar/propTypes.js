import PropTypes from 'prop-types'
import {node} from '../PropTypes'


export default {
  // Sizes
  overflow: PropTypes.bool,
  sticky: PropTypes.bool,
  fixedTop: PropTypes.bool,
  fixedBottom: PropTypes.bool,
  ...node
}
