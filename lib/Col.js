import assign from 'lodash/assign'
import shallowCompare from 'react-addons-shallow-compare'

import {flexProps, gridColProps, spacingProps} from './props'
import {gridColMods, spacingMods} from './modifiers'
import Component from './Component'


class Col extends Component {
  static displayName = 'Col'
  static flexName = 'grid'

  static defaultProps = assign(
    {},
    flexProps,
    gridColProps,
    spacingProps
  )

  static modifiers = [gridColMods, spacingMods]

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
}


export default Col
