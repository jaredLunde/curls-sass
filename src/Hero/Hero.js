import React from 'react'
import {ViewportSize} from 'react-cake'
import Box from '../Box'
import propTypes from './propTypes'
import {createUINode} from '../utils'


const getTrimmedSize = (trimmed, trimFrom = 'width') => {
  if (!trimmed) {
    return
  }

  let trimmedPx = 0
  const trimFromWidth = trimFrom === 'width'

  switch (typeof trimmed) {
    case 'number':
    case 'string':
      trimmedPx = trimmed
      break;
    case 'object':
      // Assumes document element
      trimmedPx = trimFromWidth
        ? trimmed.offsetWidth
        : trimmed.offsetHeight
      break;
    case 'function':
      trimmedPx = trimmed()
      break;
  }

  return `calc(${trimFromWidth ? '100vw' : '100vh'} - ${trimmedPx}px)`
}

const getWidth = trimmed =>  getTrimmedSize(trimmed)
const getHeight = trimmed =>  getTrimmedSize(trimmed, 'height')


export const Hero = createUINode('Hero', propTypes)

Hero.prototype.getStyle = function () {
  const {trimHeight, trimWidth, style} = this.props
  const width = getWidth(trimWidth)
  const height = getHeight(trimHeight)

  return {...style, width, height}
}

Hero.prototype.render = function () {
  let {style, ...renderProps} = this.renderProps

  return React.createElement(
    this.props.nodeType,
    {
      style: this.getStyle(),
      ...renderProps
    }
  )
}

export default ({children, ...props}) => (
  <ViewportSize>
    <Box {...props}>
      <Hero>
        {children}
      </Hero>
    </Box>
  </ViewportSize>
)
