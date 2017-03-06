import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import concat from 'lodash/concat'

import removeDefaultProps from './removeDefaultProps'
import {spacingProps, nodeProps} from './props'
import Component from './Component'
import Popover from './Popover'


class Tooltip extends Popover {
  static displayName = 'Tooltip'
  static flexName = null
  static defaultProps = Object.assign({
    open: true,
    right: false,
    left: false,
    top: false,
    bottom: false,
    text: null
  }, nodeProps, spacingProps)

  get renderProps () {
    const props = removeDefaultProps(this.constructor.defaultProps, this.props)
    delete props.children
    props.className = this.className

    if (this.props.open)
      props['aria-expanded'] = true

    props['role'] = "tooltip"
    props.ref = el => this._popover = el
    props.style = Object.assign({}, props.style || {}, this.state.style)

    return props
  }

  render () {
    let children = concat([], this.props.children)
    children = Array.isArray(children) ? children : [children]

    if (this.props.text !== null)
      children.push(this.props.text)

    return React.createElement(this.props.nodeType,
                               this.renderProps,
                               ...children)
  }
}


export default Tooltip
