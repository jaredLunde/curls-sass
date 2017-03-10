import {nodeProps, spacingProps, flexProps} from './props'
import ButtonGroup from './ButtonGroup'


class InputGroup extends ButtonGroup {
  static displayName = 'Input-Group'
  static flexName = 'input-group'
  static defaultProps = Object.assign(
    {},
    nodeProps,
    spacingProps,
    flexProps)
}


export default InputGroup