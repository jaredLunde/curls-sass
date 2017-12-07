import React from 'react'
import {createOptimized, reduceProps} from 'react-cake'
import joinClassName from './joinClassName'
import {determineModifiers, whichConstructor} from './determineModifiers'


export default function (componentName, propTypes, modifiers) {
  return function ({children, ...props}) {
    const renderProps = reduceProps(props, propTypes || {})

    renderProps.className = joinClassName(
      renderProps,
      determineModifiers(modifiers, props).join(' ')
    )

    return createOptimized(children, renderProps)
  }
}
