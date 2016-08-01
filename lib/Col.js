import assign from 'lodash/assign'
import shallowCompare from 'react-addons-shallow-compare'

import {flexProps, nodeProps, spacingProps} from './props'
import {nodeMods, spacingMods} from './modifiers'
import Component from './Component'


class Col extends Component {
  static displayName = 'Col'
  static flexName = 'grid'

  static defaultProps = assign(
    {},
    flexProps,
    nodeProps,
    spacingProps
  )

  static modifiers = [nodeMods, spacingMods]

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
}


export default Col
