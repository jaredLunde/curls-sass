import React from 'react'
import {reduceProps, createOptimized, toKebabCaseTrimmed} from 'react-cake'
import joinClassName from './joinClassName'
import {determineModifiers} from './determineModifiers'
import {getRenderProps} from './createFunctionalUINode'


const _defaultProps = {nodeType: 'div'}


export default function (componentName, propTypes, modifiers) {
  //return class UINode extends React.Component {
  return class UINode extends React.PureComponent {
    static displayName = componentName
    static propTypes = propTypes
    static curlsModifiers = modifiers
    static defaultProps = _defaultProps
    static baseClassName = toKebabCaseTrimmed(componentName)

    get className () {
      return joinClassName(
        this.props.className,
        this.constructor.baseClassName,
        determineModifiers(modifiers, this.props).join(' ')
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
