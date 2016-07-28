import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import assign from 'lodash/assign'
import ns from 'react-cake/namespace'

import {spacingProps} from './props'
import {spacingMods} from './modifiers'
import getModifiers from './getModifiers'
import removeDefaultProps from './removeDefaultProps'


class Button extends React.Component {
  static displayName = 'Button'
  static defaultProps = assign({
    nodeName: 'button',
    size: 's',
    hovering: false,
    active: false,
    activeClassName: 'active',
    hoveringClassName: 'hovering'
  }, spacingProps)

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  get className () {
    const modifiers = getModifiers(this.props, spacingMods)

    if (this.props.className)
      modifiers.push(this.props.className)

    if (this.props.active)
       modifiers.push(this.props.activeClassName)

    if (this.props.hovering)
      modifiers.push(this.props.hoveringClassName)

    if (this.props.size)
      modifiers.push(ns.classes.mod(this, this.props.size))

    return ns.classes.append(this, ...modifiers)
  }

  get renderProps () {
    const props = removeDefaultProps(Button.defaultProps, this.props)
    props.className = this.className
    delete props.children
    if (!props.type)
      props.type = 'button'
    return props
  }

  render () {
    return React.createElement(this.props.nodeName,
                               this.renderProps,
                               this.props.children)
  }
}


export default Button
