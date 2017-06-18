import React from 'react'
import {cloneIfElement, reduceProps} from 'react-cake'
import joinClassName from './joinClassName'
import determineModifiers from './determineModifiers'


export default (componentName, propTypes, modifiers) => (
  class UIWrapper extends React.PureComponent {
    static displayName = componentName
    static curlsModifiers = modifiers
    static propTypes = propTypes

    get className () {
      return joinClassName(this.props, determineModifiers(this).join(' '))
    }

    get renderProps () {
      const renderProps = reduceProps(this.props, propTypes || {}, ['children'])
      renderProps.className = this.className

      return renderProps
    }

    render () {
      const {children} = this.props
      return cloneIfElement(children, this.renderProps)
    }
  }
)