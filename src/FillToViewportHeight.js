import React from 'react'
import {
  WithViewport,
  createOptimized,
  compose
} from 'react-cake'


class FillToViewportHeight extends React.PureComponent {
  constructor (props) {
    super(props)
    const {subscribe} = props
    subscribe(this.setHeight)
  }

  componentDidMount () {
    this.setHeight()
  }

  element = null
  setRef = e => this.element = e
  prevHeight = 0

  setHeight = () => {
    const {height} = this.props.getViewportSize()
    if (this.prevHeight !== height) {
      this.forceUpdate()
    }
  }

  componentWillUnmount () {
    this.props.unsubscribe(this.setHeight)
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
      style,
      ...props
    } = this.props
    const {setRef} = this
    const {height} = getViewportSize()

    return createOptimized(
      children,
      {
        fillToVhRef: setRef,
        style: {...style, height},
        ...props
      })
  }
}


export default compose([WithViewport, FillToViewportHeight])
