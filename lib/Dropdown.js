import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import * as ns from 'react-cake/namespace'
import {Toggle} from 'react-cake/toggle'

import {flexProps, spacingProps, nodeProps} from './props'
import Button from './Button'
import Component from './Component'


const _defaultCaret = (
  <i className='fa fa-angle-down dropdown__caret'  aria-hidden='true'/>
)


@Toggle('open')
class Dropdown extends Component {
  static displayName = 'Dropdown'
  static flexName = 'dropdown'

  static defaultProps = Object.assign({
    label: 'Drop',
    caret: _defaultCaret,
    size: 's',
    items: null,
    Toggle: null
  }, nodeProps, spacingProps, flexProps)

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  get className () {
    const modifiers = this.getModifiers()

    if (this.props.open)
       modifiers.push(ns.classes.mod(this, 'open'))

    return ns.classes.append(this, ...modifiers)
  }

  get items () {
    const items = this.props.children || this.props.items
    const menuItems = []

    for (let items_ of items) {
      items_ = Array.isArray(items_) ? items_ : [items_]
      for (let item of items_) {
        if (item.type !== void 0 && item.type.toLowerCase !== void 0 &&
            item.type.toLowerCase() !== 'li') {
          menuItems.push(<li>{item}</li>)
        } else {
          menuItems.push(item)
        }
      }
    }

    return menuItems
  }

  render () {
    return (
      <div className={this.className} {...this.renderProps}>
        <Button className={ns.classes.el(this, 'toggler')}
                size={this.props.size}
                aria-expanded={String(this.props.open)}
                aria-haspopup='true'
                {...this.props.Toggle}>
          <span className={ns.classes.el(this, 'label')}>
            {this.props.label}
          </span>
          {this.props.caret}
        </Button>

        <ul className={ns.classes.el(this, 'menu')}
            aria-label='submenu'>
          {this.items}
        </ul>
      </div>
    )
  }
}


export default Dropdown
