import React from 'react'
import {namespace as ns} from 'react-cake'


class Divider extends React.PureComponent {
  static displayName = 'Divider'
  static defaultProps = {nodeType: 'div'}

  get renderProps () {
    const props = Object.assign({}, this.props)
    delete props.nodeType
    delete props.children
    const cname = ns.classes.get(this)
    props.className = props.className ? `${cname} ${props.className}` :  cname
    props['aria-label'] = 'separator'
    return props
  }

  render () {
    return React.createElement(this.props.nodeType,
                               this.renderProps,
                               this.props.children)
  }
}


export default Divider
