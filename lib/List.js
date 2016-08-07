import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import assign from 'lodash/assign'
import isArray from 'lodash/isArray'
import ns from 'react-cake/namespace'

import {flexProps, spacingProps, nodeProps} from './props'
import Component from './Component'


class List extends Component {
  static displayName = 'List'
  static flexName = 'list'
  static defaultProps = assign(
    {},
    nodeProps, {
      nodeType: 'ul',
      menuItems: null
    },
    flexProps,
    spacingProps)

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

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
      items_ = isArray(items_) ? items_ : [items_]
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
