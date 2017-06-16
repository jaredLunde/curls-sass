import React from 'react'
import Box from '../Box'
import modifiers from './modifiers'
import propTypes from './propTypes'
import {createUINode} from '../utils'


export const Navbar = createUINode('Navbar', propTypes, modifiers)
Navbar.defaultProps = {
  nodeType: 'nav'
}


export default ({children, ...props}) => (
  <Box {...props}>
    <Navbar>{children}</Navbar>
  </Box>
)
