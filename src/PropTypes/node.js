import PropTypes from 'prop-types'


export default {
  nodeType: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  withRef: PropTypes.func
}
