import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import concat from 'lodash/concat'
import * as ns from 'react-cake/namespace'

import {nodeProps, spacingProps, flexProps} from './props'
import Component from './Component'


class Avatar extends Component {
  static displayName = 'Avatar'
  static flexName = 'avatar'
  static defaultProps = Object.assign(
    {},
    {size: 's', src: null},
    nodeProps,
    spacingProps,
    flexProps)

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  get className () {
    const modifiers = this.getModifiers()

    if (this.props.size)
      modifiers.push(ns.classes.mod(this, this.props.size))

    return ns.classes.append(this, ...modifiers)
  }

  render () {
    const children = concat([], this.props.children)

    if (this.props.src)
      children.push((<img key={this.props.src} src={this.props.src}/>))

    return React.createElement(this.props.nodeType,
                               this.renderProps,
                               children)
  }
}


export default Avatar
