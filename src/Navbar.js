import React from 'react'
import {namespace as ns} from 'react-cake'

import {flexProps, nodeProps, spacingProps} from './props'
import PureComponent from './PureComponent'


class Navbar extends PureComponent {
  static displayName = 'Navbar'
  static flexName = 'navbar'
  static defaultProps = Object.assign(
    {},
    nodeProps,
    {nodeType: 'nav', overflow: false},
    spacingProps,
    flexProps
  )

  get className () {
    const modifiers = this.getModifiers()

    if (this.props.overflow)
      modifiers.push(ns.classes.mod(this, 'overflow'))

    return ns.classes.append(this, ...modifiers)
  }
}


export default Navbar
