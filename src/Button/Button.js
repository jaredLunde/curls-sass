import React from 'react'
import {Box} from '../Box/Box'
import Flex from '../Flex'
import modifiers from './modifiers'
import propTypes from './propTypes'
import {createFunctionalUINode, compose} from '../utils'


/**
<Button md darkBlue m='t2' bw='4' align='top'>
  Get yours today
</Button>
*/
const defaultProps = {
  nodeType: 'button',
  type: 'button'
}


export const Button = createFunctionalUINode(
  'Btn',
  propTypes,
  defaultProps,
  modifiers
)


export default compose([Flex, Box, Button])
