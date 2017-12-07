import React from 'react'
import {Box} from '../Box/Box'
import Flex from '../Flex'
import modifiers from './modifiers'
import propTypes from './propTypes'
import {createFunctionalUINode, compose} from '../utils'


const defaultProps = {
  nodeType: 'span'
}


export const Type = createFunctionalUINode(
  'Type',
  propTypes,
  defaultProps,
  modifiers
)


export default compose([Flex, Box, Type])
