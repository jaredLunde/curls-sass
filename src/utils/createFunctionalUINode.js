import React from 'react'
import {createOptimized, reduceProps, toKebabCaseTrimmed} from 'react-cake'
import joinClassName from './joinClassName'
import {determineModifiers, whichConstructor} from './determineModifiers'


export function getRenderProps (props, propTypes) {
  const renderProps = reduceProps(props, propTypes || {})
  const nodeType = props.nodeType

  if (
    typeof nodeType !== 'function'
    || (nodeType.prototype && nodeType.isReactComponent)
  ) {
    renderProps.ref = props.withRef
    delete renderProps.withRef
  }

  return renderProps
}


const _defaultProps = {nodeType: 'div'}


export default function (
  componentName,
  propTypes = {},
  defaultProps = _defaultProps,
  modifiers
) {
  const {nodeType, ...otherDefaultProps} = defaultProps
  const baseClassName = toKebabCaseTrimmed(componentName)

  function Component (props) {
    props = {...otherDefaultProps, ...props}
    props.className = joinClassName(
      baseClassName,
      props.className,
      determineModifiers(modifiers, props).join(' ')
    )

    return createOptimized(
      props.nodeType || nodeType,
      getRenderProps(props, propTypes)
    )
  }

  Component.displayName = componentName
  Component.propTypes = propTypes

  return Component
}
