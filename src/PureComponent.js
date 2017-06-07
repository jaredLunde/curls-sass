import React from 'react'
import {namespace as ns, reduceProps} from 'react-cake'

import {flexProps, nodeProps, spacingProps} from './props'
import {nodeMods, spacingMods} from './modifiers'
import getModifiers from './getModifiers'
import getFlexModifiers from './getFlexModifiers'


class PureComponent extends React.PureComponent {
  static displayName = 'CurlsComponent'

  static defaultProps = Object.assign(
    {passThroughRef: void 0},
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
    const props = reduceProps(
      this.props,
      this.constructor.defaultProps,
      ['children']
    )

    props.className = this.className

    if (this.props.passThroughRef) {
      props.ref = this.props.passThroughRef
    }

    return props
  }

  render () {
    const {nodeType, children} = this.props

    return React.createElement(nodeType, this.renderProps, children)
  }
}


export default PureComponent
