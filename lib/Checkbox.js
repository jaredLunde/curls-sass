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


const _defaultCheckMark = (
  <i className='fa fa-check' aria-hidden={true}/>
)



@Toggle('checked')
class Checkbox extends Component {
  static displayName = 'Checkbox'

  static defaultProps = assign(
    {checked: false,
     label: null,
     checkMark: _defaultCheckMark,
     value: void 0,
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

    if (this.props.checked)
      modifiers.push('checked')

    return ns.classes.append(this, ...modifiers)
  }

  get checkMark () {
    /*
    let checkMark;
    if (this.props.checked) {
      checkMark = this.props.checkMark
    } else {
      checkMark = (<i className={ns.classes.el(this, 'unchecked')}/>)
    }*/
    return (
      <span className={ns.classes.el(this, 'box')}>
        <span className={ns.classes.el(this, 'checkmark')}>
          {this.props.checkMark}
        </span>
      </span>
    )
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
        {this.checkMark}
        <input type='checkbox'
               checked={this.props.checked}
               value={this.props.value}
               name={this.props.name}/>
        {this.label}
        {this.props.children}
      </span>
    )
  }
}


export default Checkbox
