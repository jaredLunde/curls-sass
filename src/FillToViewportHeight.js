import React from 'react'
import {
  ViewportSize,
  createOptimized,
  compose,
  reduceProps
} from 'react-cake'
import {viewport} from './PropTypes'


function FillToViewportHeight (initialProps) {
  let {
    children,
    style,
    viewportHeight,
    ...props
  } = initialProps
  props = reduceProps(props, viewport)

  return createOptimized(
    children,
    {
      style: {
        ...style,
        height: isNaN(viewportHeight) ? '100vh' : viewportHeight
      },
      ...props
    }
  )
}


export default compose([ViewportSize, FillToViewportHeight])
