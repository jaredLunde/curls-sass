import React from 'react'
import {Toggle, compose} from 'react-cake'
import {createUIWrapper, joinClassName} from '../utils'
import modifiers from './modifiers'
import propTypes from './propTypes'
import Transitionable from '../Transitionable'


export const ToggleDisplay = createUIWrapper('ToggleDisplay', propTypes, modifiers)


function ToggleDisplayComponent ({
  isVisible,
  toggleDisplayChildren,
  className,
  ...props
}) {
  return ToggleDisplay({
    hidden: !isVisible,
    isVisible,
    className: joinClassName(className, 'toggle-display'),
    ...props,
    children: toggleDisplayChildren
  })
}

const toggleControls = [
  {name: 'show', value: true},
  {name: 'hide', value: false}
]


const composedToggleDisplay = compose([Toggle, ToggleDisplayComponent])


export default function ({children, visible, ...props}) {
  return composedToggleDisplay({
    propName: 'isVisible',
    initialValue: visible || false,
    controls: toggleControls,
    toggleDisplayChildren: children,
    ...props
  })
}
