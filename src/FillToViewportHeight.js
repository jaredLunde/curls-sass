import React from 'react'
import {
  WithViewport,
  cloneIfElement,
  compose,
  throttle
} from 'react-cake'


class FillToViewportHeight extends React.PureComponent {
  state = {
    height: 'auto'
  }

  constructor (props) {
    super(props)
    const {subscribe, getViewportSize} = props
    subscribe(this.setHeight)
    const {height} = getViewportSize()
    this.state = {height}
  }

  componentDidMount () {
    this.setHeight()
  }

  setRef = e => this.element = e
  element = null

  setHeight = throttle(
    () => {
      this.setState(
        prevState => {
          const {inViewY, getViewportSize} = this.props
          const {height} = getViewportSize()

          if (inViewY(this.element) && prevState.height !== height) {
            return {height}
          }

          return null
        }
      )
    }
  )

  componentWillUnmount () {
    this.props.unsubscribe(this.setHeight)
    this.setHeight.cancel()
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
