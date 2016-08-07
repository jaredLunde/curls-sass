import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import assign from 'lodash/assign'
import ns from 'react-cake/namespace'

import removeDefaultProps from './removeDefaultProps'
import {flexProps, spacingProps, nodeProps} from './props'
import waitForImages from './waitForImages'
import Component from './Component'

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

class Popover extends Component {
  static displayName = 'Popover'
  static flexName = 'popover'
  static defaultProps = assign({
    open: true,
    right: false,
    left: false,
    top: false,
    bottom: false,
  }, nodeProps, spacingProps, flexProps)

  state = {style: {top: null, left: null, right: null, bottom: null}}

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
  /*
  _listener = null
  componentWillMount () {
    this._listener = this.setInitialPosition.bind(this)
    window.addEventListener('resize', this._listener)
    window.addEventListener('orientationchange', this._listener)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._listener)
    window.removeEventListener('orientationchange', this._listener)
  }
  */
  setInitialPosition () {
    const heightDiff = this._popover.offsetHeight -
                       this._popover.parentNode.offsetHeight

    this.setState({style: {top: `${-1 * (heightDiff / 2)}px`}})
  }

  setPositionState () {
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

  reposition () {
    waitForImages(this._popover).then(this.setInitialPosition.bind(this))
  }

  componentDidMount () {
    if (this.props.right || this.props.left)
      this.reposition()
  }

  componentDidUpdate () {
    if (this.props.right || this.props.left)
      this.setPositionState()
  }

  get className () {
    const modifiers = this.getModifiers()

    for (let propName of ['open', 'right', 'left', 'top', 'bottom'])
      if (this.props[propName])
        modifiers.push(ns.classes.mod(this, propName))

    return ns.classes.append(this, ...modifiers)
  }

  get renderProps () {
    const props = removeDefaultProps(this.constructor.defaultProps, this.props)
    delete props.children
    props.className = this.className

    if (this.props.open)
      props['aria-expanded'] = true

    props.ref = (el) => this._popover = el
    props.style = assign(props.style || {}, this.state.style)

    return props
  }
}


export default Popover
