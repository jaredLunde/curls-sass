import React from 'react'
import {ViewportSize} from 'react-cake'
import Box from '../Box'
import propTypes from './propTypes'
import FillToViewportHeight from '../FillToViewportHeight'
import {createUINode} from '../utils'


const getTrimmedPx = (trimmed, trimFrom = 'width') => {
  if (!trimmed) {
    return
  }

  let trimmedPx = 0

  switch (typeof trimmed) {
    case 'number':
    case 'string':
      trimmedPx = trimmed
      break;
    case 'object':
      // Assumes document element
      if (Array.isArray(trimmed)) {
        for (let item of trimmed) {
          trimmedPx += getTrimmedPx(item, trimFrom)
        }
      } else {
        trimmedPx = trimFrom === 'width'
          ? trimmed.offsetWidth
          : trimmed.offsetHeight
      }
      break;
    case 'function':
      trimmedPx = trimmed()
      break;
  }

  return trimmedPx
}

const getTrimmedSize = (val, trimmed, trimFrom = 'width') => {
  const trimmedPx = getTrimmedPx(trimmed, trimFrom)
  const trimFromWidth  = trimFrom === 'width'
  return trimFromWidth
    ? `calc(${val} - ${trimmedPx}px)`
    : val - trimmedPx
}

const getWidth = (val, trimmed) =>  getTrimmedSize(val, trimmed)
const getHeight = (val, trimmed) =>
  typeof val === 'string'
  ? val
  : getTrimmedSize(val, trimmed, 'height')


export const Hero = createUINode('Hero', propTypes)

Hero.prototype.getStyle = function () {
  const {trimHeight, trimWidth, style} = this.props
  const width = getWidth('100vw', trimWidth)
  const height = getHeight(style.height, trimHeight)

  return {...style, width, height}
}

Hero.prototype.render = function () {
  let {style, fillToVhRef, ...renderProps} = this.renderProps

  return React.createElement(
    this.props.nodeType,
    {
      ...renderProps,
      style: this.getStyle(),
      ref: fillToVhRef
    }
  )
}

export default ({children, ...props}) => (
  <FillToViewportHeight {...props}>
    <Box>
      <Hero>
        {children}
      </Hero>
    </Box>
  </FillToViewportHeight>
)
