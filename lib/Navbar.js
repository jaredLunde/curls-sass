import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import assign from 'lodash/assign'
import concat from 'lodash/concat'
import ns from 'react-cake/namespace'
import {Toggle} from 'react-cake/toggle'

import removeDefaultProps from './removeDefaultProps'
import {flexProps, nodeProps, spacingProps} from './props'
import {flexMods, nodeMods, spacingMods} from './modifiers'
import getModifiers from './getModifiers'
import getFlexModifiers from './getFlexModifiers'


class Navbar extends React.Component {
  static displayName = 'Navbar'
  static defaultProps = assign(
    nodeProps,
    {nodeName: 'nav', overflow: false},
    spacingProps,
    flexProps)

  get className() {
    const modifiers = concat(getModifiers(spacingMods, this.props),
                             getModifiers(nodeMods, this.props),
                             getFlexModifiers(this.props, 'navbar'))

    if (this.props.className)
      modifiers.push(this.props.className)

    if (this.props.overflow)
      modifiers.push(ns.classes.mod(this, 'overflow'))

    return ns.classes.append(this, ...modifiers)
  }

  get renderProps () {
    const props = removeDefaultProps(Navbar.defaultProps, this.props)
    delete props.children
    props.className = this.className
    return props
  }

  render () {
    return React.createElement(this.props.nodeName,
                               this.renderProps,
                               this.props.children)
  }
}


export default Navbar
