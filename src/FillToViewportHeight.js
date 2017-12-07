import React from 'react'
import {
  ViewportSize,
  createOptimized,
  compose
} from 'react-cake'


function FillToViewportHeight (initialProps) {
  const {
    children,
    getAspect,
    getViewportSize,
    style,
    viewportWidth,
    viewportHeight,
    ...props
  } = initialProps

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
