import {namespace as ns} from 'react-cake'

import {nodeProps, spacingProps, flexProps} from './props'
import Button from './Button'
import PureComponent from './PureComponent'


class ButtonGroup extends PureComponent {
  static displayName = 'BtnGroup'
  static flexName = 'btn-group'

  static defaultProps = Object.assign(
    {},
    nodeProps,
    {
      size: 's',
      color: null
    },
    spacingProps,
    flexProps
  )

  get className () {
    const modifiers = this.getModifiers()

    if (this.props.size) {
      modifiers.push(ns.classes.mod(Button, this.props.size))
    }

    if (this.props.color) {
      modifiers.push(ns.classes.mod(Button, this.props.color))
    }
    
    return ns.classes.append(this, ...modifiers)
  }
}


export default ButtonGroup
