import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import Component_ from './Component'


export default Component => {
  return class CurlsComponent extends Component_ {
    static displayName = Component.displayName ||
                         Component.constructor.displayName

    shouldComponentUpdate (nextProps) {
      return shallowCompare(this, nextProps)
    }

    render () {
      return (
        <Component {...this.renderProps}>
          {this.props.children}
        </Component>
      )
    }
  }
}
