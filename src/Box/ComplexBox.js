import React from 'react'
import Flex from '../Flex'
import Grid from '../Grid'
import {Box} from './Box'


export class ComplexBox extends Box {
  shouldComponentUpdate () { return true }
}

export default ({children, ...props}) => (
  <Grid {...props}>
    <Flex>
      <Box>
        {children}
      </Box>
    </Flex>
  </Grid>
)
