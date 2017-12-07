import React from 'react'
import {Box} from './Box/Box'
import Flex from './Flex'
import propTypes from './Button/propTypes'
import modifiers from './Button/modifiers'
import {createFunctionalUINode, compose} from './utils'


const defaultProps = {nodeType: 'div'}


export const ButtonGroup = createFunctionalUINode(
  'BtnGroup',
  propTypes,
  defaultProps,
  modifiers
)


export default compose([Flex, Box, ButtonGroup])
