import React from 'react'
import {WithViewport, cloneIfElement} from 'react-cake'


class FillToViewportHeight extends React.PureComponent {
  state = {
    height: 'auto'
  }

  setRef = e => this.element = e
  element = null

  setHeight = () => {
    const {inViewY, getViewportSize} = this.props
    const {height} = getViewportSize()

    this.setState(
      prevState => {
        if (inViewY(this.element) && prevState.height !== height) {
          return {height}
        }

        return null
      }
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


export default ({children, ...props}) => (
  <WithViewport {...props}>
    <FillToViewportHeight>
      {children}
    </FillToViewportHeight>
  </WithViewport>
)
