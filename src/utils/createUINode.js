import React from 'react'
import {reduceProps, createOptimized, namespace as ns} from 'react-cake'
import joinClassName from './joinClassName'
import determineModifiers from './determineModifiers'
import {getRenderProps} from './createFunctionalUINode'


export default function (componentName, propTypes, modifiers) {
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
        ns.classes.get(this),
        determineModifiers(this).join(' ')
      )
    }

    get renderProps () {
      const {nodeType, ...props} = this.props
      const {className} = this
      return getRenderProps({...props, className}, propTypes)
    }

    render () {
      return createOptimized(this.props.nodeType, this.renderProps)
    }
  }
}
