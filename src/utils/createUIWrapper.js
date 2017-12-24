import React from 'react'
import {createOptimized, reduceProps} from 'react-cake'
import joinClassName from './joinClassName'
import {determineModifiers, whichConstructor} from './determineModifiers'


const _childrenObj = {children: null}

export default function (componentName, propTypes, modifiers) {
  const fn = function (props) {
    const renderProps = reduceProps(props, propTypes || {}, _childrenObj)

    renderProps.className = joinClassName(
      renderProps.className,
      determineModifiers(modifiers, props).join(' ')
    )

    return createOptimized(props.children, renderProps)
  }

  fn.displayName = componentName
  return fn
}
