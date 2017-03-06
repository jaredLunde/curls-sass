import shallowCompare from 'react-addons-shallow-compare'
import {flexProps, nodeProps, spacingProps} from './props'
import Component from './Component'


class Card extends Component {
  static displayName = 'Card'

  static defaultProps = Object.assign(
    {},
    nodeProps,
    {nodeType: 'article'},
    flexProps,
    spacingProps
  )

  flexName = 'card'

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
}


export default Card
