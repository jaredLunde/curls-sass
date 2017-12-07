import React from 'react'
import {reduceProps, createOptimized, toKebabCaseTrimmed} from 'react-cake'
import joinClassName from './joinClassName'
import determineModifiers from './determineModifiers'
import {getRenderProps} from './createFunctionalUINode'


export default function (componentName, propTypes, modifiers) {
  const baseClassName = toKebabCaseTrimmed(componentName)

  return class UINode extends React.PureComponent {
    static displayName = componentName
    static propTypes = propTypes
    static curlsModifiers = modifiers
    static defaultProps = {
      nodeType: 'div'
    }

    get className () {
      return joinClassName(
        this.props,
        baseClassName,
        determineModifiers(this).join(' ')
      )
    }

    get renderProps () {
      const {className} = this
      return getRenderProps({...this.props, className}, propTypes)
    }

    render () {
      return createOptimized(this.props.nodeType, this.renderProps)
    }
  }
}
