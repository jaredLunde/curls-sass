import React from 'react'
import {namespace as ns, Toggle} from 'react-cake'

import {flexProps, spacingProps, nodeProps} from './props'
import Button from './Button'
import PureComponent from './PureComponent'


const _defaultCaret = (
  <i className='fa fa-angle-down dropdown__caret'  aria-hidden='true'/>
)


class Dropdown extends PureComponent {
  static displayName = 'Dropdown'
  static flexName = 'dropdown'

  static defaultProps = Object.assign({
    label: 'Drop',
    caret: _defaultCaret,
    size: 's',
    items: null
  }, nodeProps, spacingProps, flexProps)

  get className () {
    const modifiers = this.getModifiers()

    if (this.props.open)
       modifiers.push(ns.classes.mod(this, 'open'))

    return ns.classes.append(this, ...modifiers)
  }

  get items () {
    let items = this.props.children || this.props.items
    items = Array.isArray(items) || !items ? items : [items]
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
    const {nodeType} = this.props

    return (
      <div className={this.className} {...this.renderProps}>
        <Button className={ns.classes.el(this, 'toggler')}
                size={this.props.size}
                aria-expanded={String(this.props.open)}
                aria-haspopup='true'
                onClick={this.props.toggle}>
          <span className={ns.classes.el(this, 'label')}>
            {this.props.label}
          </span>
          {this.props.caret}
        </Button>

        {
          React.createElement(
            nodeType || 'ul',
            {
              className: ns.classes.el(this, 'menu'),
              'aria-label': 'submenu'
            },
            this.items
          )
        }
      </div>
    )
  }
}


export default ({open, ...props}) => (
  <Toggle propName='open' initialValue={open || false}>
    <Dropdown {...props}/>
  </Toggle>
)
