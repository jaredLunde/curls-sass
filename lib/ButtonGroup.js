import shallowCompare from 'react-addons-shallow-compare'
import assign from 'lodash/assign'
import * as ns from 'react-cake/namespace'

import {nodeProps, spacingProps, flexProps} from './props'
import Button from './Button'
import Component from './Component'


class ButtonGroup extends Component {
  static displayName = 'Btn-Group'
  static flexName = 'btn-group'

  static defaultProps = assign(
    {},
    nodeProps, {
      size: 's',
      color: null},
    spacingProps,
    flexProps)

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  get className () {
    const modifiers = this.getModifiers()

    if (this.props.size)
      modifiers.push(ns.classes.mod(Button, this.props.size))

    if (this.props.color)
      modifiers.push(ns.classes.mod(Button, this.props.color))

    return ns.classes.append(this, ...modifiers)
  }
}


export default ButtonGroup
