import React from 'react'
import {namespace as ns} from 'react-cake'

import {nodeProps, spacingProps, flexProps} from './props'
import PureComponent from './PureComponent'


class Avatar extends PureComponent {
  static displayName = 'Avatar'
  static flexName = 'avatar'
  static defaultProps = Object.assign(
    {},
    {size: 's', src: null},
    nodeProps,
    spacingProps,
    flexProps
  )

  get className () {
    const modifiers = this.getModifiers()

    if (this.props.size)
      modifiers.push(ns.classes.mod(this, this.props.size))

    return ns.classes.append(this, ...modifiers)
  }

  render () {
    let children = []
    children = children.concat(this.props.children)

    if (this.props.src) {
      children.push((<img key={this.props.src} src={this.props.src}/>))
    }

    return React.createElement(this.props.nodeType,
                               this.renderProps,
                               children)
  }
}


export default Avatar
