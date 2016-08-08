import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import assign from 'lodash/assign'
import ns from 'react-cake/namespace'
import {Toggle} from 'react-cake/toggle'
import {Hover} from 'react-cake/hover'


export default (Component) => {
  @Toggle('toggleIsEnabled')
  @Hover('hoverIsEnabled')
  class PopoverComponent extends React.Component {
    static displayName = ns.name.get(Component) || 'PopoverComponent'

    get popoverProps () {
      return {
        clickable: {
          onClick: this.props.Toggle.onClick
        },
        hoverable: {
          onMouseEnter: this.props.Hover.onMouseEnter,
          onMouseLeave: this.props.Hover.onMouseLeave
        },
        open: this.props.toggleIsEnabled || this.props.hoverIsEnabled
      }
    }

    shouldComponentUpdate (nextProps) {
      return shallowCompare(this, nextProps)
    }

    render () {
      const props = assign({}, this.props)
      props.Popover = this.popoverProps
      delete props.open

      return <Component {...props}/>
    }
  }

  return PopoverComponent
}
