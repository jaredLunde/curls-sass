import React from 'react'
import {namespace as ns, Toggle, Hover} from 'react-cake'


export default Component => {
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

    render () {
      const props = Object.assign({}, this.props)
      props.Tooltip = this.tooltipProps
      delete props.open

      return <Component {...props}/>
    }
  }

  return TooltipComponent
}
