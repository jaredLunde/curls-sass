import React from 'react'
import Box from './Box'
import {node} from './PropTypes'
import {createUINode} from './utils'


export const InputGroup = createUINode('InputGroup', node)


export default ({children, ...props}) => (
  <Box {...props}>
    <InputGroup>{children}</InputGroup>
  </Box>
)
