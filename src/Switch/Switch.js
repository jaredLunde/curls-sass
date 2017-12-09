import React from 'react'
import {Toggle, WillChange, createOptimized, namespace as ns} from 'react-cake'
import {fromJS} from 'immutable'
import modifiers from './modifiers'
import propTypes from './propTypes'
import Box from '../Box'
import Transitionable from '../Transitionable'
import {createUINode} from '../utils'

/**
<Switch on name='amIChecked' value='foobar'>
  {
    ({toggle, check, unCheck, isOn, ...props}) => (
      <Type bold darkGrey m='l2'>
        On?
        <Type light m='l1'>{JSON.stringify(isOn)}</Type>
      </Type>
    )
  }
</Switch>
*/
export const Switch = createUINode('Switch', propTypes, modifiers)
Switch.defaultProps = {
  nodeType: 'span'
}


Switch.prototype.render = function () {
  const {
    nodeType,
    switchChildren,
    name,
    value,
    toggle,
    turnOn,
    turnOff,
    isOn,
    readOnly,
    style,
    switchStyle,
    willChange,
    willChangeRef,
    willChangeIsOn,
    ...props
  } = this.props
  const children = switchChildren
  const switchToggle = (
    <span key='switch__control' className={ns.classes.el(this, 'control')}>
      <span className={ns.classes.el(this, 'toggle')} style={style}/>
    </span>
  )

  const input = <input
    key='switch__input'
    type='checkbox'
    name={name}
    value={value}
    checked={isOn}
    readOnly
  />

  const switchLabel = typeof children === 'function'
    ? createOptimized(
        children,
        {
          key: 'label',
          toggle,
          turnOn,
          turnOff,
          isOn
        }
      )
    : children

  return React.createElement(
    nodeType,
    {
      ...props,
      onClick: readOnly === true ? void 0 : toggle,
      className: this.className,
      ref: willChangeRef,
      style: switchStyle
    },
    [
      switchToggle,
      switchLabel,
      input
    ]
  )
}


const switchControls = fromJS([
  {name: 'turnOn', value: true},
  {name: 'turnOff', value: false}
])


export default ({children, on, onChange, style, ...props}) => (
  <Box {...props} switchChildren={children} switchStyle={style}>
    <WillChange transform backgroundColor whenClicked>
      <Toggle
        propName='isOn'
        initialValue={on || false}
        controls={switchControls}
        onChange={onChange}
      >
        {Switch}
      </Toggle>
    </WillChange>
  </Box>
)
