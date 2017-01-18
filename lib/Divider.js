import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import * as ns from 'react-cake/namespace'
import assign from 'lodash/assign'


class Divider extends React.Component {
  static displayName = 'Divider'
  static defaultProps = {nodeType: 'div'}

  shouldComponentUpdate (nextProps) {
    return shallowCompare(this, nextProps)
  }

  get renderProps () {
    const props = assign({}, this.props)
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
