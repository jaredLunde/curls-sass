import shallowCompare from 'react-addons-shallow-compare'
import assign from 'lodash/assign'
import {flexProps, nodeProps, spacingProps} from './props'
import Component from './Component'


class Card extends Component {
  static displayName = 'Card'

  static defaultProps = assign(
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
