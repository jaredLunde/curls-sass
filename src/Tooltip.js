import React from 'react'

import {spacingProps, nodeProps} from './props'
import Popover from './Popover'


export default class Tooltip extends Popover {
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
    const props = super.renderProps

    if (this.props.open)
      props['aria-expanded'] = true

    props.role = "tooltip"
    props.ref = el => this._popover = el
    props.style = Object.assign({}, props.style || {}, this.state.style)

    return props
  }

  render () {
    let children = []
    children = children.concat(
      Array.isArray(this.props.children) ?
      this.props.children :
      [this.props.children]
    )

    if (this.props.text !== null) {
      children.push(this.props.text)
    }

    return React.createElement(this.props.nodeType,
                               this.renderProps,
                               ...children)
  }
}
