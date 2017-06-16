import React from 'react'
import {
  WillChange,
  namespace as ns,
  cloneIfElement,
  requestAnimationFrame,
  loadImages
} from 'react-cake'
import Box from '../Box'
import Drop from '../Drop'
import propTypes from './propTypes'
import centerInParentX from './centerInParentX'
import centerInParentY from './centerInParentY'
import {createUINode} from '../utils'


/**
<Popover
  fromBottom
  p='y2 x3'
  content={
    ({isVisible, toggle, show, hide}) => `I'm a popover`
  }
>
  {
    ({popover, isVisible, toggle, show, hide, willChangeRef}) => (
      <div className='pr m--b6'>
        {popover}

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
</Popover>
*/

export const Popover = createUINode('Popover', propTypes)
Popover.defaultProps = {
  nodeType: 'div'
}

const popoverMethods = {
  state: {},
  _popover: null,
  setRef: function (e) {
    this._popover = e
  },

  componentWillMount: function () {
    this._listener = this.reposition.bind(this)
    window.addEventListener('resize', this._listener)
    window.addEventListener('orientationchange', this._listener)
  },

  componentWillUnmount: function () {
    if (this._listener) {
      window.removeEventListener('resize', this._listener)
      window.removeEventListener('orientationchange', this._listener)
    }
  },

  componentDidMount: function () {
    this.reposition()
  },

  componentDidUpdate: function () {
    this.reposition()
  },

  setPositionState: function () {
    const {className} = this.props
    const fromLeft = className.includes('drop--left')
    const fromRight = className.includes('drop--right')

    requestAnimationFrame(
      () => this.setState(
        fromLeft || fromRight
        ? centerInParentY(this._popover)
        : centerInParentX(this._popover)
      )
    )
  },

  reposition: function () {
    loadImages(this._popover).then(this.setPositionState.bind(this))
  }
}

Object.assign(Popover.prototype, popoverMethods)


Popover.prototype.render = function () {
  const {
    nodeType,
    popoverChildren,
    isVisible,
    toggle,
    dropIn,
    dropOut,
    willChangeRef,
    content,
    className,
    style,
    ...popoverProps
  } = this.props
  const {reposition} = this
  const show = dropIn, hide = dropOut
  const popover = React.createElement(
    nodeType,
    {
      className: this.className,
      style: {...style, ...this.state},
      ref: this.setRef.bind(this),
      ...popoverProps
    },
    content({isVisible, toggle, show, hide, reposition: reposition.bind(this)})
  )

  return cloneIfElement(
    popoverChildren,
    {
      [this.constructor.displayName.toLowerCase()]: popover,
      isVisible,
      toggle,
      show,
      hide,
      willChangeRef
    }
  )
}


const PopoverComponent = ({
  willChangeIsOn,
  willChange,
  ...props
}) => (
  <Drop defaultFrom='top' {...props}>
    {Popover}
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
      <PopoverComponent popoverChildren={children}/>
    </WillChange>
  </Box>
)
