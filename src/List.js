import React from 'react'
import {namespace as ns} from 'react-cake'

import {flexProps, spacingProps, nodeProps} from './props'
import PureComponent from './PureComponent'


class List extends PureComponent {
  static displayName = 'List'
  static flexName = 'list'
  static defaultProps = Object.assign(
    {},
    nodeProps, {
      nodeType: 'ul',
      menuItems: null
    },
    flexProps,
    spacingProps
  )

  isListItem (item) {
    if (item.type === void 0)
      return false
    if (item.type.toLowerCase === void 0)
      return false
    return item.type.toLowerCase() === 'li'
  }

  get menuItems () {
    const items = this.props.children || this.props.menuItems
    const menuItems = []

    for (let items_ of items) {
      items_ = Array.isArray(items_) ? items_ : [items_]
      for (let item of items_) {
        if (!this.isListItem(item)) {
          menuItems.push(<li>{item}</li>)
        } else {
          menuItems.push(item)
        }
      }
    }

    return menuItems
  }

  render () {
    return React.createElement(this.props.nodeType,
                               this.renderProps,
                               this.menuItems)
  }
}


export default List
