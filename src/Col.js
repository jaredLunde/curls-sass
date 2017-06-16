import React from 'react'
import Box from './Box'
import {node} from './PropTypes'
import {createUINode} from './utils'


export const Col = createUINode('Col', node)


export default ({children, ...props}) => (
  <Box {...props}>
    <Col>{children}</Col>
  </Box>
)
