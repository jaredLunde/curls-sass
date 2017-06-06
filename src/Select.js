import React from 'react'
import {namespace as ns, Toggle} from 'react-cake'

import {flexProps, spacingProps, nodeProps} from './props'
import Button from './Button'
import PureComponent from './PureComponent'


const _defaultCaret = (
  <i className='fa fa-angle-down select__caret'  aria-hidden='true'/>
)


class Select extends PureComponent {
  static displayName = 'Select'
  static flexName = 'select'
  static defaultProps = Object.assign({
    label: null,
    caret: _defaultCaret,
    size: 's',
    Toggle: null,
    onChange: null,
    name: null
  }, nodeProps, spacingProps, flexProps)

  state = {selection: null}

  componentWillMount () {
    const items = this.props.children
    let selection

    for (let x in items) {
      let items_ = items[x]
      items_ = Array.isArray(items_) ? items_ : [items_]
      for (let item of items_) {
        if ((item.props && item.props.selected) || x === '0')
          selection = item
      }
    }

    this.setState({selection})
  }

  get className () {
    const modifiers = this.getModifiers()

    if (this.props.open)
       modifiers.push(ns.classes.mod(this, 'open'))

    return ns.classes.append(this, ...modifiers)
  }

  handleSelect (item) {
    this.setState({selection: item})
    this.props.Toggle.onClick()
  }

  get items () {
    const items = this.props.children
    const menuItems = []
    let selection

    for (let x in items) {
      let items_ = items[x]
      items_ = Array.isArray(items_) ? items_ : [items_]
      for (let item of items_) {
        const key = item.props.value !== null && item.props.value !== void 0 ?
                    item.props.value : x;

        menuItems.push((
          <li key={key} onClick={() => this.handleSelect(item)}>
            {item.props.children}
          </li>
        ))
      }
    }

    return menuItems
  }

  get selectItems () {
    const items = this.props.children
    const menuItems = []

    for (let x in items) {
      let items_ = items[x]
      items_ = Array.isArray(items_) ? items_ : [items_]
      for (let item of items_) {
        menuItems.push(item)
        if (item.props && item.props.selected) {
          delete menuItems[x].props.selected
        }
      }
    }

    return menuItems
  }

  get selection () {
    if (this.state.selection)
      return this.state.selection.props.children

    return this.props.label
  }

  get value () {
    if (this.state.selection)
      return this.state.selection.props.value || ''
  }

  componentWillUpdate (nextProps, nextState) {
    this.props.onChange(nextState.selection.props.value, this)
  }

  render () {
    return (
      <div className={this.className} {...this.renderProps}>
        <Button className={ns.classes.el(this, 'toggler')}
                size={this.props.size}
                aria-expanded={String(this.props.open)}
                aria-haspopup='true'
                type='button'
                onClick={this.props.toggle}>
          <span className={ns.classes.el(this, 'label')}>
            {this.selection}
          </span>
          {this.props.caret}
        </Button>

        <ul className={ns.classes.el(this, 'menu')}
            aria-label='submenu'>
          {this.items}
        </ul>

        <select aria-hidden
                value={this.value}
                name={this.props.name}
                readOnly>
          {this.selectItems}
        </select>
      </div>
    )
  }
}


export default ({open, ...props}) => (
  <Toggle propName='open' initialValue={open}>
    <Select {...props}/>
  </Toggle>
)
