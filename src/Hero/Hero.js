import React from 'react'
import {ViewportSize} from 'react-cake'
import Box from '../Box'
import propTypes from './propTypes'
import {createUINode} from '../utils'


const getExclusionSize = (exclusion, excludeFrom = 'width') => {
  if (!exclusion) {
    return
  }

  let exclusionPx = 0
  const excludeFromWidth = excludeFrom === 'width'

  switch (typeof exclusion) {
    case 'number':
    case 'string':
      exclusionPx = exclusion
      break;
    case 'object':
      // Assumes document element
      exclusionPx = excludeFromWidth
        ? exclusion.offsetWidth
        : exclusion.offsetHeight
      break;
    case 'function':
      exclusionPx = exclusion()
      break;
  }

  return `calc(${excludeFromWidth ? '100vw' : '100vh'} - ${exclusionPx}px)`
}

const getWidth = exclusion =>  getExclusionSize(exclusion)
const getHeight = exclusion =>  getExclusionSize(exclusion, 'height')


export const Hero = createUINode('Hero', propTypes)

Hero.prototype.getStyle = function () {
  const {excludeHeight, excludeWidth, style} = this.props
  const width = getWidth(excludeWidth)
  const height = getHeight(excludeHeight)

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
