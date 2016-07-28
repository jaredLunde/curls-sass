import React from 'react'
import ns from 'react-cake/namespace'
import assign from 'lodash/assign'
import concat from 'lodash/concat'
import shallowCompare from 'react-addons-shallow-compare'

import removeDefaultProps from './removeDefaultProps'
import {flexProps, gridColProps, spacingProps} from './props'
import {gridColMods, spacingMods} from './modifiers'
import getModifiers from './getModifiers'
import getFlexModifiers from './getFlexModifiers'


class Col extends React.Component {
  static displayName = 'grid__col'

  static defaultProps = assign(
    {},
    flexProps,
    gridColProps,
    spacingProps
  )

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  get className () {
    const modifiers = concat(getModifiers(this.props, gridColMods, spacingMods),
                             getFlexModifiers(this.props))

    if (this.props.className)
      modifiers.push(this.props.className)

    return ns.classes.append(this, ...modifiers)
  }

  get renderProps () {
    const props = removeDefaultProps(Col.defaultProps, this.props)
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


export default Col
