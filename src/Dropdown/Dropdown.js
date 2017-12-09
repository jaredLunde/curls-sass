import React from 'react'
import {reduceProps, WillChange, compose, namespace as ns} from 'react-cake'
import Box from '../Box'
import boxPropTypes from '../Box/propTypes'
import Button from '../Button'
import Drop from '../Drop'
import propTypes from './propTypes'
import {selectProps, createUINode} from '../utils'


/**
<Dropdown
  fast
  label='Jump to...'
  items={
    List([
      (
        <a>
          <Type p='x3 y2' grey style={{display: 'block'}}>
            Foo
          </Type>
        </a>
      ),
      (
        <a>
          <Type p='x3 y2' grey style={{display: 'block'}}>
            Bar
          </Type>
        </a>
      ),
      (
        <a>
          <Type p='x3 y2' grey style={{display: 'block'}}>
            Baz
          </Type>
        </a>
      ),
    ])
  }
  m='t2 b3'
/>
**/
export function DropdownToggle ({
  label,
  isVisible,
  toggle,
  willChangeRef,
  ...props
}) {
  return (
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
}

export function DropdownMenu ({
  className,
  isVisible,
  menuItem,
  items,
  style,
  toggle,
  dropIn,
  dropOut,
  ...props
}) {
  return (
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
}

export function DropdownMenuItem ({
  item,
  dropIn,
  dropOut,
  toggle,
  n,
  ...props
}) {
  return (
    <li className='dropdown__menu-item' key={n} {...props}>
      {item}
    </li>
  )
}


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


function DropComponent ({willChangeIsOn, willChange, ...props}) {
  return Drop({...props, children: Dropdown})
}


const composedDropdown = compose([Box, WillChange, DropComponent])


export default function ({className, ...props}) {
  return composedDropdown({
    opacity: true,
    visibility: true,
    transform: true,
    whenClicked: true,
    boxClassName: className,
    ...props
  })
}
