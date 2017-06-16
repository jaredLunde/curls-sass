import PropTypes from 'prop-types'
import {positional} from '../PropTypes'

export default {
  dropped: PropTypes.bool,
  defaultFrom: PropTypes.string,
  ...positional
}
