import {flexProps, nodeProps, spacingProps} from './props'
import {nodeMods, spacingMods} from './modifiers'
import PureComponent from './PureComponent'


class Col extends PureComponent {
  static displayName = 'Col'
  static flexName = 'grid'

  static defaultProps = Object.assign(
    {},
    flexProps,
    nodeProps,
    spacingProps
  )

  static modifiers = [nodeMods, spacingMods]
}


export default Col
