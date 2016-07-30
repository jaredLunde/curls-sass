import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import assign from 'lodash/assign'
import concat from 'lodash/concat'
import {Toggle} from 'react-cake/toggle'
import ns from 'react-cake/namespace'

import {flexProps, nodeProps, spacingProps} from './props'
import getModifiers from './getModifiers'
import getFlexModifiers from './getFlexModifiers'
import removeDefaultProps from './removeDefaultProps'
import Component from './Component'



@Toggle('enabled')
class Toggler extends Component {
  static displayName = 'Toggler'

  static defaultProps = assign(
    {enabled: false,
     label: void 0,
     name: void 0},
    nodeProps,
    {nodeName: 'span'},
    flexProps,
    spacingProps
  )

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  get className () {
    let modifiers = concat(
      getModifiers(this.props, ...this.constructor.modifiers),
      getFlexModifiers(this.props, this.constructor.flexName))

    if (this.props.className)
      modifiers.push(this.props.className)

    if (this.props.enabled)
      modifiers.push('enabled')

    return ns.classes.append(this, ...modifiers)
  }

  get label () {
    if (this.props.label) {
      return (
        <label {...this.props.Toggle}>
          {this.props.label}
        </label>
      )
    }

    return null
  }

  get renderProps () {
    const props = removeDefaultProps(this.constructor.defaultProps, this.props)
    delete props.children
    delete props.Toggle
    return props
  }

  render () {
    return (
      <span className={this.className}
            {...this.props.Toggle}
            {...this.renderProps}>
        <span className={ns.classes.el(this, 'container')}>
          <input type='checkbox'
                 checked={this.props.enabled}
                 name={this.props.name}/>
          <span className={ns.classes.el(this, 'handle')}/>
        </span>
        {this.label}
        {this.props.children}
      </span>
    )
  }
}


export default Toggler