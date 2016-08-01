import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import assign from 'lodash/assign'
import concat from 'lodash/concat'
import ns from 'react-cake/namespace'

import {spacingProps} from './props'
import {spacingMods} from './modifiers'
import removeDefaultProps from './removeDefaultProps'
import Component from './Component'


class Button extends Component {
  static displayName = 'Btn'
  static modifiers = [spacingMods]

  static defaultProps = assign({
    nodeName: 'button',
    size: 's',
    hovering: false,
    active: false,
    activeClassName: 'active',
    hoveringClassName: 'hovering',
    color: null  // TODO!!!!!!
  }, spacingProps)

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

    return ns.classes.append(this, ...modifiers)
  }

  get renderProps () {
    const props = removeDefaultProps(Button.defaultProps, this.props)
    props.className = this.className
    delete props.children
    if (!props.type && props.nodeName === 'button')
      props.type = 'button'
    return props
  }
}


export default Button
