import React from 'react'
import {namespace as ns} from 'react-cake'

import removeDefaultProps from './removeDefaultProps'
import {flexProps, spacingProps, nodeProps} from './props'
import waitForImages from './waitForImages'
import PureComponent from './PureComponent'

/*
function bound(el, pad = 8) {
  const newStyles = {top: null, bottom: null, left: null, right: null}
  const rect = el.getBoundingClientRect()

  const clientWidth = document.documentElement.clientWidth
  const clientHeight = document.documentElement.clientHeight

  const isOffTop = rect.top < 0
  const isOffLeft = rect.left < 0
  const isOffRight = (clientWidth - rect.left) <= rect.width
  const isOffBottom = rect.height - (clientHeight - rect.top)

  if (isOffTop)
    newStyles.top = (parseInt(el.style.top, 10) +
                    Math.abs(rect.top) + pad) + 'px'

  if (isOffLeft)
    newStyles.left = (parseInt(el.style.left, 10) +
                     Math.abs(rect.left) + pad) + 'px'

  if (isOffRight) {
    newStyles.right = (parseInt(clientWidth - rect.left, 10) +
                      Math.abs(rect.top) + pad) + 'px'
  }

  if (isOffBottom) {
    newStyles.bottom = (parseInt(el.style.top, 10) + Math.abs(rect.top) + pad) + 'px'
  }

  return newStyles
}
*/

export default class Popover extends PureComponent {
  static displayName = 'Popover'
  static flexName = 'popover'
  static defaultProps = Object.assign({
    open: true,
    right: false,
    left: false,
    top: false,
    bottom: false,
  }, nodeProps, spacingProps, flexProps)

  state = {style: {top: null, left: null, right: null, bottom: null}}
  _listener = null

  componentWillMount () {
    this._listener = this.setPositionState.bind(this)
    window.addEventListener('resize', this._listener)
    window.addEventListener('orientationchange', this._listener)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._listener)
    window.removeEventListener('orientationchange', this._listener)
  }

  setPositionState () {
    if (this.props.right || this.props.left) {
      const heightDiff = this._popover.offsetHeight -
                         this._popover.parentNode.offsetHeight
      const bounds = {top: `${-1 * (heightDiff / 2)}px`}

      const newStyle = {}
      for (let pos in bounds)
        if (bounds[pos] !== this.state.style[pos])
          newStyle[pos] = bounds[pos]

      if (Object.keys(newStyle).length)
        this.setState({style: newStyle})
    }
  }

  reposition () {
    waitForImages(this._popover).then(this.setPositionState.bind(this))
  }

  componentDidMount () {
    this.reposition()
  }

  componentDidUpdate () {
    this.reposition()
  }

  get className () {
    const modifiers = this.getModifiers()

    for (let propName of ['open', 'right', 'left', 'top', 'bottom']) {
      if (this.props[propName])
        modifiers.push(ns.classes.mod(this, propName))
    }

    return ns.classes.append(this, ...modifiers)
  }

  get renderProps () {
    const props = removeDefaultProps(this.constructor.defaultProps, this.props)
    delete props.children
    props.className = this.className

    if (this.props.open)
      props['aria-expanded'] = true

    props.ref = el => this._popover = el
    props.style = Object.assign({}, props.style || {}, this.state.style)

    return props
  }
}
