import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import assign from 'lodash/assign'
import concat from 'lodash/concat'
import ns from 'react-cake/namespace'
import {Toggle} from 'react-cake/toggle'

import {flexProps, spacingProps} from './props'
import {spacingMods} from './modifiers'
import getModifiers from './getModifiers'
import getFlexModifiers from './getFlexModifiers'


@Toggle('dropped')
class Dropdown extends React.Component {
  static displayName = 'Dropdown'

  static defaultProps = assign({
    label: 'Drop',
    withCaret: true,
    caretClassName: 'fa fa-chevron-down dropdown__caret',
    buttonSize: 's',
    menuItems: null
  }, spacingProps, flexProps)

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  get className () {
    const modifiers = concat(getModifiers(this.props, spacingMods),
                             getFlexModifiers(this.props))

    if (this.props.className)
      modifiers.push(this.props.className)

    if (this.props.dropped)
       modifiers.push('dropped')

    return ns.classes.append(this, ...modifiers)
  }

  get buttonClassName() {
    let baseName = ns.classes.el(this, 'toggler')
    baseName += ` button--${this.props.buttonSize}`
    return baseName
  }

  get menuItems () {
    const items = this.props.children || this.props.menuItems

    return items.map((item) => {
      if (item.type.toLowerCase !== void 0 && item.type.toLowerCase() !== 'li')
        return <li>{item}</li>
      return item
    })
  }

  get caret () {
    if (this.props.withCaret)
      return <span className={this.props.caretClassName} aria-hidden='true'/>
  }

  render () {
    return (
      <div className={this.className}>
        <button className={this.buttonClassName}
                type='button'
                aria-expanded={String(this.props.dropped)}
                aria-haspopup='true'
                {...this.props.Toggle}>
          {this.props.label}
          {this.caret}
        </button>
        <ul className={ns.classes.el(this, 'menu')}
            aria-label='submenu'>
          {this.menuItems}
        </ul>
      </div>
    )
  }
}


export default Dropdown
