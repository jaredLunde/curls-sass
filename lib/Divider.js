import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import ns from 'react-cake/namespace'
import assign from 'lodash/assign'


class Divider extends React.Component {
  static displayName = 'divider'
  static defaultProps = {nodeName: 'div'}

  shouldComponentUpdate (...args) {
    return shallowCompare(this, ...args)
  }

  get renderProps () {
    const props = assign({}, this.props)
    delete props.nodeName
    delete props.children
    const cname = ns.classes.get(this)
    props.className = props.className ? `${cname} ${props.className}` :  cname
    props['aria-label'] = 'separator'
    return props
  }

  render () {
    return React.createElement(this.props.nodeName,
                               this.renderProps,
                               this.props.children)
  }
}


export default Divider
