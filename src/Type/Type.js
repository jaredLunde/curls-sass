import React from 'react'
import {Box} from '../Box/Box'
import Flex from '../Flex'
import modifiers from './modifiers'
import propTypes from './propTypes'
import {createUINode} from '../utils'


export const Type = createUINode('Type', propTypes, modifiers)
Type.defaultProps = {
  nodeType: 'span'
}


export default ({children, ...props}) => (
  <Flex {...props}>
    <Box>
      <Type>{children}</Type>
    </Box>
  </Flex>
)
