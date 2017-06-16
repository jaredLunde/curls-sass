import React from 'react'
import {namespace as ns} from 'react-cake'

import {flexProps, spacingProps, nodeProps} from './props'
import waitForImages from './waitForImages'
import PureComponent from './PureComponent'


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
    const props = super.renderProps

    if (this.props.open)
      props['aria-expanded'] = true

    props.ref = el => this._popover = el
    props.style = Object.assign({}, props.style || {}, this.state.style)

    return props
  }
}
