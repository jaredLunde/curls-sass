import React from 'react'
import {Box} from '../Box/Box'
import Flex from '../Flex'
import modifiers from './modifiers'
import propTypes from './propTypes'
import {createUINode} from '../utils'


/**
<Button md darkBlue m='t2' bw='4' align='top'>
  Get yours today
</Button>
*/
export const Button = createUINode('Btn', propTypes, modifiers)
Button.defaultProps = {
  nodeType: 'button',
  type: 'button'
}


export default ({children, ...props}) => (
  <Flex {...props}>
    <Box>
      <Button>{children}</Button>
    </Box>
  </Flex>
)
