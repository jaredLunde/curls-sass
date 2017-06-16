import React from 'react'
import Box from './Box'
import {node} from './PropTypes'
import {createUINode} from './utils'


export const Card = createUINode('Card', node)


export default ({children, ...props}) => (
  <Box {...props}>
    <Card>{children}</Card>
  </Box>
)
