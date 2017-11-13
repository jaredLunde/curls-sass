import React from 'react'
import {
  WithViewport,
  cloneIfElement,
  requestAnimationFrame,
  cancelAnimationFrame,
  compose
} from 'react-cake'


/**
REDO this
*/
class FillToViewportHeight extends React.PureComponent {
  state = {
    height: 'auto'
  }

  setRef = e => this.element = e
  element = null

  ticking = false
  frame = null

  setHeight = () => {
    if (this.ticking) return;
    const {inViewY, getViewportSize} = this.props
    const {height} = getViewportSize()
    this.ticking = true

    this.frame = requestAnimationFrame(
      () => this.setState(
        prevState => {
          if (inViewY(this.element) && prevState.height !== height) {
            return {height}
          }

          return null
        },
        () => this.ticking = false
      )
    )
  }

  componentDidMount () {
    const {subscribe, getViewportSize} = this.props
    subscribe(this.setHeight)
    const {height} = getViewportSize()
    this.setState({height})
  }

  componentWillUnmount () {
    this.props.unsubscribe(this.setHeight)
    if (this.frame) {
      cancelAnimationFrame(this.frame)
    }
  }

  render () {
    const {
      children,
      getAspect,
      inView,
      inViewX,
      inViewY,
      inFullView,
      inFullViewX,
      inFullViewY,
      getViewportSize,
      getViewportScroll,
      subscribe,
      unsubscribe,
      orientation,
      screenOrientation,
      scrollTo,
      viewportHeight,
      viewportWidth,
      style,
      ...props
    } = this.props
    const {height} = this.state
    const {setRef} = this

    return cloneIfElement(
      children,
      {
        fillToVhRef: setRef,
        style: {...style, height},
        ...props
      })
  }
}


export default compose([WithViewport, FillToViewportHeight])
