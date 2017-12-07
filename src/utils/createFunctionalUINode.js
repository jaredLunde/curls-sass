import React from 'react'
import {createOptimized, reduceProps, toKebabCaseTrimmed} from 'react-cake'
import joinClassName from './joinClassName'
import {determineModifiers, whichConstructor} from './determineModifiers'


export function getRenderProps (props, propTypes) {
  const renderProps = reduceProps(props, propTypes || {})

  if (
    typeof props.nodeType !== 'function'
    || (
      props.nodeType.prototype
      && nodeType.isReactComponent
    )
  ) {
    renderProps.ref = props.withRef
    delete renderProps.withRef
  }

  return renderProps
}


export default function (
  componentName,
  propTypes = {},
  defaultProps = {nodeType: 'div'},
  modifiers
) {
  const {nodeType, ...otherDefaultProps} = defaultProps

  return function ({children, ...props}) {
    props = {...otherDefaultProps, ...props}

    const className = joinClassName(
      props,
      toKebabCaseTrimmed(componentName),
      determineModifiers(modifiers, props).join(' ')
    )

    const renderProps = getRenderProps({...props, className}, propTypes)

    return createOptimized(nodeType, {children, ...renderProps})
  }
}
