import React from 'react'
import {cloneIfElement, reduceProps} from 'react-cake'
import joinClassName from './joinClassName'
import {determineModifiers, whichConstructor} from './determineModifiers'


export default (componentName, propTypes, modifiers) =>
({children, ...props}) => {
  const renderProps = reduceProps(props, propTypes || {})

  renderProps.className = joinClassName(
    renderProps,
    determineModifiers(modifiers, props).join(' ')
  )

  return cloneIfElement(children, renderProps)
}
