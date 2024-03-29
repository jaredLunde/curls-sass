import PropTypes from 'prop-types'
import {node, positional, droppable, toggleVisibility} from '../PropTypes'


export default {
  content: PropTypes.func.isRequired,
  ...droppable,
  ...toggleVisibility,
  ...positional,
  ...node
}
