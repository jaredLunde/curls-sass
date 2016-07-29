import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import assign from 'lodash/assign'
import concat from 'lodash/concat'
import ns from 'react-cake/namespace'

import removeDefaultProps from './removeDefaultProps'
import {nodeProps, spacingProps} from './props'
import {nodeMods, spacingMods} from './modifiers'
import getModifiers from './getModifiers'


class ButtonGroup extends React.Component {
  static displayName = 'Button-Group'
  static defaultProps = assign({}, nodeProps, spacingProps)

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  get className() {
    const modifiers = getModifiers(this.props, spacingMods, nodeMods)

    if (this.props.className)
      modifiers.push(this.props.className)

    return ns.classes.append(this, ...modifiers)
  }

  get renderProps () {
    const props = removeDefaultProps(ButtonGroup.defaultProps, this.props)
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


export default ButtonGroup
