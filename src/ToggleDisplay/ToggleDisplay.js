import React from 'react'
import {Toggle, compose} from 'react-cake'
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

const toggleControls = fromJS([
  {name: 'show', value: true},
  {name: 'hide', value: false}
])


const composedToggleDisplay = compose([Toggle, ToggleDisplayComponent])


export default ({children, visible, ...props}) => composedToggleDisplay({
  propName: 'isVisible',
  initialValue: visible || false,
  controls: toggleControls,
  toggleDisplayChildren: children,
  ...props
})
