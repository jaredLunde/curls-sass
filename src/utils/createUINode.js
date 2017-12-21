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

    get className () {
      return joinClassName(
        this.props,
        toKebabCaseTrimmed(this.constructor.displayName),
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
