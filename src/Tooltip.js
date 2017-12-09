import React from 'react'
import {WillChange, compose} from 'react-cake'
import Box from './Box'
import Drop from './Drop'
import {Popover} from './Popover/Popover'


/**
<Tooltip
  fast
  p='x3 y2'
  content={
    ({isVisible, toggle, show, hide}) => `I'm a tooltip`
  }
>
  {
    ({tooltip, isVisible, toggle, show, hide, willChangeRef}) => (
      <div className='pr m--b6'>
        {tooltip}

        <a
          onMouseEnter={show}
          onMouseLeave={hide}
          ref={willChangeRef}
        >
          {isVisible ? 'Learn less' : 'Learn more'}
        </a>
      </div>
    )
  }
</Tooltip>
*/
export class Tooltip extends Popover {
  static displayName = 'Tooltip'
  static defaultProps = {
    nodeType: 'span'
  }
}


function TooltipComponent ({willChangeIsOn, willChange, ...props}) {
  return Drop({
    defaultFrom: 'bottom',
    ...props,
    children: Tooltip
  })
}

const composedTooltip = compose([Box, WillChange, TooltipComponent])

export default function ({children, ...props}) {
  return composedTooltip({
    opacity: true,
    visibility: true,
    transform: true,
    whenClicked: true,
    whenMouseEnters: true,
    whenMouseLeaves: true,
    popoverChildren: children,
    ...props
  })
}
