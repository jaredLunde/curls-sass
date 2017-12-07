import React from 'react'
import {createOptimized, reduceProps} from 'react-cake'
import joinClassName from './joinClassName'
import {determineModifiers, whichConstructor} from './determineModifiers'


export default function (componentName, propTypes, modifiers) {
  const fn = function ({children, ...props}) {
    const renderProps = reduceProps(props, propTypes || {})

    renderProps.className = joinClassName(
      renderProps,
      determineModifiers(modifiers, props).join(' ')
    )

    return createOptimized(children, renderProps)
  }

  Object.defineProperty(fn, 'name', {value: componentName})
  return fn
}
