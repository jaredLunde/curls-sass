import shallowCompare from 'react-addons-shallow-compare'

import Component from './Component'


class ButtonGroup extends Component {
  static displayName = 'Btn-Group'
  static flexName = 'btn-group'

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
}


export default ButtonGroup
