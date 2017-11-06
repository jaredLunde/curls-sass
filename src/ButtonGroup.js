import React from 'react'
import {Box} from './Box/Box'
import Flex from './Flex'
import propTypes from './Button/propTypes'
import modifiers from './Button/modifiers'
import {createUINode, compose} from './utils'


export const ButtonGroup = createUINode('BtnGroup', propTypes, modifiers)


export default compose([Flex, Box, ButtonGroup])
