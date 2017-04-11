import React from 'react'
import Component_ from './Component'


export default Component => {
  return class CurlsComponent extends Component_ {
    static displayName = Component.displayName ||
                         Component.constructor.displayName

    render () {
      return (
        <Component {...this.renderProps}>
          {this.props.children}
        </Component>
      )
    }
  }
}
