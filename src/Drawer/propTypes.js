import PropTypes from 'prop-types'
import {node, positional, slidable, toggleVisibility} from '../PropTypes'


export default {
  content: PropTypes.func.isRequired,
  ...toggleVisibility,
  ...slidable,
  ...positional,
  ...node
}
