import {flexProps, nodeProps, spacingProps} from './props'
import PureComponent from './PureComponent'


class Card extends PureComponent {
  static displayName = 'Card'

  static defaultProps = Object.assign(
    {},
    nodeProps,
    {nodeType: 'article'},
    flexProps,
    spacingProps
  )

  flexName = 'card'
}


export default Card
