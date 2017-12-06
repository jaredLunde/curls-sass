import React from 'react'
import {reduceProps, cloneIfElement, namespace as ns} from 'react-cake'
import joinClassName from './joinClassName'
import determineModifiers from './determineModifiers'


export default (componentName, propTypes, modifiers) => (
  class UINode extends React.PureComponent {
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
      const renderProps = reduceProps(this.props, propTypes || {})
      renderProps.className = this.className

      if (
        typeof this.props.nodeType !== 'function'
        || (
          this.props.nodeType.prototype
          && this.props.nodeType.isReactComponent
        )
      ) {
        renderProps.ref = this.props.withRef
        delete renderProps.withRef
      }

      return renderProps
    }

    render () {
      const {nodeType} = this.props
      return React.createElement(nodeType, this.renderProps)
    }
  }
)
