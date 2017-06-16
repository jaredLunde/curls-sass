import React from 'react'
import {Box} from './Box/Box'
import Flex from './Flex'
import propTypes from './Button/propTypes'
import modifiers from './Button/modifiers'
import {createUINode} from './utils'


export const ButtonGroup = createUINode('BtnGroup', propTypes, modifiers)


export default ({children, ...props}) => (
  <Flex {...props}>
    <Box>
      <ButtonGroup>{children}</ButtonGroup>
    </Box>
  </Flex>
)
