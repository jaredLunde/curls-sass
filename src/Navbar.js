import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import {namespace as ns, Toggle} from 'react-cake'

import {flexProps, nodeProps, spacingProps} from './props'
import Component from './Component'


class Navbar extends Component {
  static displayName = 'Navbar'
  static flexName = 'navbar'
  static defaultProps = Object.assign(
    {},
    nodeProps,
    {nodeType: 'nav', overflow: false},
    spacingProps,
    flexProps
  )

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  get className () {
    const modifiers = this.getModifiers()

    if (this.props.overflow)
      modifiers.push(ns.classes.mod(this, 'overflow'))

    return ns.classes.append(this, ...modifiers)
  }
}


export default Navbar