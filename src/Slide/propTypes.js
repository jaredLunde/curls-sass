import PropTypes from 'prop-types'
import {positional} from '../PropTypes'


export default {
  slid: PropTypes.bool,
  ...positional,
  defaultFrom: PropTypes.string
}
