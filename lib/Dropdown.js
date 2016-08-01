import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import assign from 'lodash/assign'
import concat from 'lodash/concat'
import ns from 'react-cake/namespace'
import {Toggle} from 'react-cake/toggle'

import {flexProps, spacingProps, nodeProps} from './props'
import Button from './Button'
import Component from './Component'


const _defaultCaret = (
  <i className='fa fa-angle-down dropdown__caret'  aria-hidden='true'/>
)


@Toggle('dropped')
class Dropdown extends Component {
  static displayName = 'Dropdown'
  static flexName = 'dropdown'
  
  static defaultProps = assign({
    label: 'Drop',
    caret: _defaultCaret,
    size: 's',
    menuItems: null
  }, nodeProps, spacingProps, flexProps)

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  get className () {
    const modifiers = this.getModifiers()

    if (this.props.dropped)
       modifiers.push('dropped')

    return ns.classes.append(this, ...modifiers)
  }

  get menuItems () {
    const items = this.props.children || this.props.menuItems

    return items.map((item) => {
      if (item.type.toLowerCase !== void 0 && item.type.toLowerCase() !== 'li')
        return <li>{item}</li>
      return item
    })
  }

  render () {
    return (
      <div className={this.className}>
        <Button className={ns.classes.el(this, 'toggler')}
                size={this.props.size}
                aria-expanded={String(this.props.dropped)}
                aria-haspopup='true'
                {...this.props.Toggle}>
          <span className={ns.classes.el(this, 'label')}>
            {this.props.label}
          </span>
          {this.props.caret}
        </Button>
        <ul className={ns.classes.el(this, 'menu')}
            aria-label='submenu'>
          {this.menuItems}
        </ul>
      </div>
    )
  }
}


export default Dropdown
