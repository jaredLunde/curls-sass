import React from 'react'
import {Toggle} from 'react-cake'
import {fromJS} from 'immutable'
import {createUIWrapper} from '../utils'
import modifiers from './modifiers'
import propTypes from './propTypes'
import Transitionable from '../Transitionable'


export const ToggleDisplay = createUIWrapper('ToggleDisplay', propTypes, modifiers)


const ToggleDisplayComponent = ({
  isVisible,
  toggleDisplayChildren,
  className,
  ...props
}) => (
  <ToggleDisplay
    hidden={!isVisible}
    isVisible={isVisible}
    className={`${className || ''} toggle-display`.trim()}
    {...props}
  >
    {toggleDisplayChildren}
  </ToggleDisplay>
)

export default ({children, visible, ...props}) => (
  <Toggle
    propName='isVisible'
    initialValue={visible || false}
    controls={fromJS([
      {name: 'show', value: true},
      {name: 'hide', value: false}
    ])}
    toggleDisplayChildren={children}
    {...props}
  >
    {ToggleDisplayComponent}
  </Toggle>
)
