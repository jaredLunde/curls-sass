import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import assign from 'lodash/assign'
import concat from 'lodash/concat'
import isArray from 'lodash/isArray'

import removeDefaultProps from './removeDefaultProps'
import {spacingProps, nodeProps} from './props'
import Component from './Component'
import Popover from './Popover'


class Tooltip extends Popover {
  static displayName = 'Tooltip'
  static flexName = null
  static defaultProps = assign({
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
    props.style = assign({}, props.style || {}, this.state.style)

    return props
  }

  render () {
    let children = concat([], this.props.children)
    children = isArray(children) ? children : [children]

    if (this.props.text !== null)
      children.push(this.props.text)

    return React.createElement(this.props.nodeType,
                               this.renderProps,
                               ...children)
  }
}


export default Tooltip
