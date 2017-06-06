import {nodeProps, spacingProps, flexProps} from './props'
import ButtonGroup from './ButtonGroup'


class InputGroup extends ButtonGroup {
  static displayName = 'InputGroup'
  static flexName = 'input-group'
  static defaultProps = Object.assign(
    {},
    nodeProps,
    spacingProps,
    flexProps)
}


export default InputGroup
