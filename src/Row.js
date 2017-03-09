import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import Component from './Component'


class Row extends Component {
  static displayName = 'Row'
  static flexName = 'grid'

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }
}


export default Row
