import React from 'react'
import {Box} from './Box/Box'
import {node} from './PropTypes'
import {createUINode} from './utils'


export const Divider = createUINode('Divider', node)
Divider.defaultProps = {
  ...Divider.defaultProps,
  'aria-label': 'separator'
}


export default props => (
  <Box {...props}>
    <Divider/>
  </Box>
)
