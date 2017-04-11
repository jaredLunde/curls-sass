import React from 'react'
import {namespace as ns} from 'react-cake'

import removeDefaultProps from './removeDefaultProps'
import {flexProps, nodeProps, spacingProps} from './props'
import {nodeMods, spacingMods} from './modifiers'
import getModifiers from './getModifiers'
import getFlexModifiers from './getFlexModifiers'


class PureComponent extends React.PureComponent {
  static displayName = 'CurlsComponent'

  static defaultProps = Object.assign(
    {},
    nodeProps,
    flexProps,
    spacingProps
  )

  static modifiers = [nodeMods, spacingMods]
  static flexName = 'flex'

  getModifiers () {
    let modifiers = getModifiers(this.props, ...this.constructor.modifiers)

    if (
      this.constructor.flexName !== void 0 &&
      this.constructor.flexName !== null
    ) {
      modifiers = modifiers.concat(getFlexModifiers(
        this.props,
        this.constructor.flexName
      ))
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


export default PureComponent
