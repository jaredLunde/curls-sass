import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import assign from 'lodash/assign'
import ns from 'react-cake/namespace'

import {nodeProps, spacingProps, flexProps} from './props'
import removeDefaultProps from './removeDefaultProps'
import Component from './Component'


class Button extends Component {
  static displayName = 'Btn'

  static defaultProps = assign(
    {},
    nodeProps, {
      nodeType: 'button',
      size: 's',
      hovering: false,
      active: false,
      activeClassName: 'active',
      hoveringClassName: 'hovering',
      color: null},
    spacingProps,
    flexProps)

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  get className () {
    const modifiers = this.getModifiers()

    if (this.props.active)
       modifiers.push(this.props.activeClassName)

    if (this.props.hovering)
      modifiers.push(this.props.hoveringClassName)

    if (this.props.size)
      modifiers.push(ns.classes.mod(this, this.props.size))

    if (this.props.color)
      modifiers.push(ns.classes.mod(this, this.props.color))

    return ns.classes.append(this, ...modifiers)
  }

  get renderProps () {
    const props = removeDefaultProps(Button.defaultProps, this.props)
    props.className = this.className
    delete props.children
    if (!props.type && props.nodeType === 'button')
      props.type = 'button'
    return props
  }
}


export default Button
