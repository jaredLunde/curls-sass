import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {node} from '../PropTypes'


export default {
  overflow: PropTypes.bool,
  label: PropTypes.string.isRequired,
  button: PropTypes.func.isRequired,
  menu: PropTypes.func.isRequired,
  menuItem: PropTypes.func.isRequired,
  items: ImmutablePropTypes.list.isRequired,
  toggle: PropTypes.func.isRequired,
  dropIn: PropTypes.func.isRequired,
  dropOut: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  ...node
}
