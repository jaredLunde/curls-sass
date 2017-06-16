import React from 'react'
import Box from './Box'
import {Col} from './Col'


export class Row extends Col {
  static displayName = 'Row'
}


export default ({children, ...props}) => (
  <Box {...props}>
    <Row>{children}</Row>
  </Box>
)
