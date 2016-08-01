import shallowCompare from 'react-addons-shallow-compare'
import ns from 'react-cake/namespace'
import assign from 'lodash/assign'
import {nodeProps, spacingProps} from './props'
import Component from './Component'
import {nodeMods, spacingMods} from './modifiers'
import getModifiers from './getModifiers'


class Cols extends Component {
  static displayName = 'Cols'
  static flexName = null

  static defaultProps = assign(
    {},
    nodeProps,
    {x: 1},
    spacingProps
  )

  get className () {
    const props = assign({}, this.props)
    delete props.x
    const modifiers = getModifiers(props, spacingMods)

    if (this.props.className)
      modifiers.push(this.props.className)

    if (this.props.x)
      modifiers.push(ns.classes.mod(this, this.props.x))

    return ns.classes.append(this, ...modifiers)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
}


export default Cols
