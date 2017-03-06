import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import * as ns from 'react-cake/namespace'
import {Toggle} from 'react-cake/toggle'
import {Hover} from 'react-cake/hover'


export default (Component) => {
  @Toggle('toggleIsEnabled')
  class DrawerComponent extends React.Component {
    static displayName = ns.name.get(Component) || 'DrawerComponent'

    get drawerProps () {
      return {
        onClick: this.props.Toggle.onClick,
        open: this.props.toggleIsEnabled
      }
    }

    shouldComponentUpdate (nextProps) {
      return shallowCompare(this, nextProps)
    }

    render () {
      const props = Object.assign({}, this.props)
      props.Drawer = this.drawerProps
      delete props.open

      return <Component {...props}/>
    }
  }

  return DrawerComponent
}
