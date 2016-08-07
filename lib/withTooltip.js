import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import assign from 'lodash/assign'
import ns from 'react-cake/namespace'
import {Toggle} from 'react-cake/toggle'
import {Hover} from 'react-cake/hover'
import getComponentName from 'react-cake/hover'


export default (Component) => {
  @Toggle('toggleIsEnabled')
  @Hover('hoverIsEnabled')
  class TooltipComponent extends React.Component {
    static displayName = ns.name.get(Component) || 'TooltipComponent'

    get tooltipProps () {
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
      props.Tooltip = this.tooltipProps
      delete props.open

      return <Component {...props}/>
    }
  }

  return TooltipComponent
}
