import shallowCompare from 'react-addons-shallow-compare'
import * as ns from 'react-cake/namespace'
import {nodeProps, spacingProps} from './props'
import Component from './Component'
import {nodeMods, spacingMods} from './modifiers'
import getModifiers from './getModifiers'


class Cols extends Component {
  static displayName = 'Cols'
  static flexName = null

  static defaultProps = Object.assign(
    {},
    nodeProps,
    {n: 1},
    spacingProps
  )

  get className () {
    const props = Object.assign({}, this.props)
    const modifiers = getModifiers(props, spacingMods)

    if (this.props.className)
      modifiers.push(this.props.className)

    if (this.props.n)
      modifiers.push(ns.classes.mod(this, this.props.n))

    return ns.classes.append(this, ...modifiers)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
}


export default Cols
