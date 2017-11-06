import React from 'react'
import {Box} from '../Box/Box'
import Flex from '../Flex'
import modifiers from './modifiers'
import propTypes from './propTypes'
import {createUINode, compose} from '../utils'


export const Type = createUINode('Type', propTypes, modifiers)
Type.defaultProps = {
  nodeType: 'span'
}


export default compose([Flex, Box, Type])
