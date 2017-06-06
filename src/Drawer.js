import {namespace as ns, Toggle} from 'react-cake'

import {flexProps, nodeProps, spacingProps} from './props'
import {nodeMods, spacingMods} from './modifiers'
import removeDefaultProps from './removeDefaultProps'
import PureComponent from './PureComponent'


export default class Drawer extends PureComponent {
  static displayName = 'Drawer'
  static flexName = 'drawer'
  static defaultProps = Object.assign(
    {open: true,
     absolute: false,
     top: false,
     right: false,
     bottom: false,
     left: false},
    flexProps,
    nodeProps,
    spacingProps
  )

  state = {style: {}}

  get className () {
    const modifiers = this.getModifiers()

    for (let propName of ['open', 'absolute', 'top', 'right', 'bottom', 'left']) {
      if (this.props[propName])
        modifiers.push(ns.classes.mod(this, propName))
    }

    return ns.classes.append(this, ...modifiers)
  }

  setPositionState () {
    if (this.props.absolute &&
        ((this.props.right || this.props.left) ||
         (!this.props.top && !this.props.right && !this.props.bottom &&
          !this.props.left))) {
      const parentHeight = this._drawer.parentNode.offsetHeight
      if (parentHeight !== this.state.style.height) {
        this.setState({style: {height: parentHeight}})
      }
    }
  }

  componentDidMount () {
    this.setPositionState()
  }

  componentDidUpdate () {
    this.setPositionState()
  }

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

  get renderProps () {
    const props = removeDefaultProps(this.constructor.defaultProps, this.props)
    delete props.children
    props.className = this.className

    props.ref = el => this._drawer = el
    props.style = Object.assign({}, props.style, this.state.style)

    return props
  }
}
