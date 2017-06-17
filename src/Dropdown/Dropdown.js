import React from 'react'
import {reduceProps, WillChange, namespace as ns} from 'react-cake'
import Box from '../Box'
import boxPropTypes from '../Box/propTypes'
import Button from '../Button'
import Drop from '../Drop'
import propTypes from './propTypes'
import {selectProps, createUINode} from '../utils'


export const DropdownToggle = ({
  label,
  isVisible,
  toggle,
  willChangeRef,
  ...props
}) => (
  <Button
    sm
    translucentLight
    key='button'
    className='dropdown__toggle'
    aria-expanded={String(isVisible)}
    aria-haspopup='true'
    onClick={toggle}
    withRef={willChangeRef}
    {...props}
  >
    <span className='dropdown__label'>
      {label}
    </span>
  </Button>
)

export const DropdownMenu = ({
  className,
  isVisible,
  menuItem,
  items,
  style,
  toggle,
  dropIn,
  dropOut,
  ...props
}) => (
  <ul
    key='menu'
    aria-label='submenu'
    className={`${className} dropdown__menu`}
    style={style}
    {...props}
  >
    {
      items.map(
        (item, n) => menuItem({
          item,
          dropIn,
          dropOut,
          toggle,
          n
        })
      )
    }
  </ul>
)

export const DropdownMenuItem = ({
  item,
  dropIn,
  dropOut,
  toggle,
  n,
  ...props
}) => (
  <li className='dropdown__menu-item' key={n} {...props}>
    {item}
  </li>
)

export const Dropdown = createUINode('Dropdown', propTypes)
Dropdown.defaultProps = {
  nodeType: 'div',
  button: DropdownToggle,
  menu: DropdownMenu,
  menuItem: DropdownMenuItem,
  label: 'Drop me'
}

Dropdown.prototype.render = function () {
  let {
    button,
    label,
    menu,
    menuItem,
    items,
    nodeType,
    isVisible,
    toggle,
    dropIn,
    dropOut,
    willChangeRef,
    boxClassName,
    ...props
  } = this.props
  props = reduceProps(props, propTypes)
  let {willChange, ...style} = props.style
  const dropClassName = props.className
  const openClass = isVisible ? ns.classes.mod(this, 'open') : ''

  return React.createElement(
    nodeType,
    {
      ...props,
      style,
      className: `
        ${boxClassName || ''}
        ${ns.classes.get(this)}
        ${openClass}
      `.trim()
    },
    [
      button({label, toggle, willChangeRef, isVisible}),
      menu({
        menuItem,
        items,
        isVisible,
        toggle,
        dropIn,
        dropOut,
        className: dropClassName,
        style: {willChange}
      })
    ]
  )
}


const DropComponent = ({
  willChangeIsOn,
  willChange,
  ...props
}) => (
  <Drop {...props}>
    {Dropdown}
  </Drop>
)

const WillChangeComponent = ({className, ...props}) => (
  <WillChange opacity visibility transform whenClicked {...props}>
    <DropComponent boxClassName={className}/>
  </WillChange>
)

export default props => (
  <Box {...props}>
    <WillChangeComponent/>
  </Box>
)
