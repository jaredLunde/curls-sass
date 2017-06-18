import PropTypes from 'prop-types'
import {node} from '../PropTypes'


const elsPropType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.number,
  PropTypes.string,
  PropTypes.object
])

export default {
  excludeHeight: elsPropType,
  excludeWidth: elsPropType,
  getAspect: PropTypes.func.isRequired,
  getViewportSize: PropTypes.func.isRequired,
  viewportWidth: PropTypes.number.isRequired,
  viewportHeight: PropTypes.number.isRequired,
  ...node
}
