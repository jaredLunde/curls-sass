import PropTypes from 'prop-types'
import {node} from '../PropTypes'


export default {
  path: PropTypes.string.isRequired,
  numDisplayed: PropTypes.number.isRequired,
  nextButton: PropTypes.func,
  prevButton: PropTypes.func,
  pageButton: PropTypes.func,
  ...node
}
