import PropTypes from 'prop-types'
import {node} from '../PropTypes'


export default {
  // Sizes
  xs: PropTypes.bool,
  sm: PropTypes.bool,
  md: PropTypes.bool,
  lg: PropTypes.bool,
  xl: PropTypes.bool,
  // src
  src: PropTypes.string,
  defaultSrc: PropTypes.string,
  orientation: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  naturalWidth: PropTypes.number,
  naturalHeight: PropTypes.number,
  complete: PropTypes.bool,
  getImage: PropTypes.func.isRequired,
  imageRef: PropTypes.func,
  ...node
}
