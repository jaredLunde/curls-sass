import React from 'react'
import Box from '../Box'
import modifiers from './modifiers'
import propTypes from './propTypes'
import {createFunctionalUINode, compose} from '../utils'


const defaultProps = {
  nodeType: 'nav'
}


export const Navbar = createFunctionalUINode(
  'Navbar',
  propTypes,
  defaultProps,
  modifiers
)


export default compose([Box, Navbar])
