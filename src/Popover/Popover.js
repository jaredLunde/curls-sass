import React from 'react'
import {
  WillChange,
  namespace as ns,
  createOptimized,
  requestAnimationFrame,
  cancelAnimationFrame,
  loadImages,
  compose
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
    ({popover, isVisible, toggle, show, hide}) => (
      <div className='pr m--b6'>
        {popover}

        <a
          onMouseEnter={show}
          onMouseLeave={hide}
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

    if (this._loader) {
      this._loader.cancel()
    }

    if (this._ticking !== null) {
      cancelAnimationFrame(this._ticking)
    }
  },

  componentDidMount: function () {
    this.reposition()
  },

  componentDidUpdate: function () {
    this.reposition()
  },

  _ticking: null,
  _loader: null,

  setPositionState: function () {
    if (this._ticking) return;

    const {className} = this.props
    const fromLeft = className.includes('drop--left')
    const fromRight = className.includes('drop--right')

    this._ticking = requestAnimationFrame(
      () => this.setState(
        fromLeft || fromRight
          ? centerInParentY(this._popover)
          : centerInParentX(this._popover),
        () => this._ticking = null
      )
    )
  },

  reposition: function () {
    this._loader = loadImages(this._popover)
    this._loader.then(
      (...args) => {
        this.setPositionState.bind(this)()
        this._loader = null
      }
    )
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
    createOptimized(
      content,
      {isVisible, toggle, show, hide, reposition: reposition.bind(this)}
    )
  )

  return createOptimized(
    popoverChildren,
    {
      [this.constructor.displayName.toLowerCase()]: popover,
      isVisible,
      toggle,
      show,
      hide
    }
  )
}


function PopoverComponent (props) {
  return Drop({defaultFrom: 'top', ...props, children: Popover})
}


const composedPopover = compose([Box, PopoverComponent])

export default function ({children, ...props}) {
  return composedPopover({
    popoverChildren: children,
    ...props
  })
}
