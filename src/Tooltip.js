import React from 'react'
import {WillChange} from 'react-cake'
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


const TooltipComponent = ({
  willChangeIsOn,
  willChange,
  ...props
}) => (
  <Drop defaultFrom='bottom' {...props}>
    {Tooltip}
  </Drop>
)


export default ({children, ...props}) => (
  <Box {...props}>
    <WillChange
      opacity
      visibility
      transform
      whenClicked
      whenMouseEnters
      whenMouseLeaves
    >
      <TooltipComponent popoverChildren={children}/>
    </WillChange>
  </Box>
)
