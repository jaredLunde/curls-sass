import React from 'react'
import * as ns from 'react-cake/namespace'
import assign from 'lodash/assign'
import concat from 'lodash/concat'

import removeDefaultProps from './removeDefaultProps'
import {flexProps, nodeProps, spacingProps} from './props'
import {nodeMods, spacingMods} from './modifiers'
import getModifiers from './getModifiers'
import getFlexModifiers from './getFlexModifiers'


class Component extends React.Component {
  static displayName = 'CurlsComponent'

  static defaultProps = assign(
    {},
    nodeProps,
    flexProps,
    spacingProps
  )

  static modifiers = [nodeMods, spacingMods]
  static flexName = 'flex'

  getModifiers () {
    let modifiers = getModifiers(this.props, ...this.constructor.modifiers)

    if (this.constructor.flexName !== void 0 &&
        this.constructor.flexName !== null) {
      modifiers = concat(
        modifiers, getFlexModifiers(this.props, this.constructor.flexName))
    }

    if (this.props.className)
      modifiers.push(this.props.className)

    return modifiers
  }

  get className () {
    return ns.classes.append(this, ...this.getModifiers())
  }

  get renderProps () {
    const props = removeDefaultProps(this.constructor.defaultProps, this.props)
    delete props.children
    props.className = this.className
    return props
  }

  render () {
    return React.createElement(this.props.nodeType,
                               this.renderProps,
                               this.props.children)
  }
}


export default Component
