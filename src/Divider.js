import React from 'react'
import {Box} from './Box/Box'
import {node} from './PropTypes'
import {createUINode, compose} from './utils'


export const Divider = createUINode('Divider', node)
Divider.defaultProps = {
  ...Divider.defaultProps,
  'aria-label': 'separator'
}


export default compose([Box, Divider])
