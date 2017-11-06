import React from 'react'
import Box from '../Box'
import modifiers from './modifiers'
import propTypes from './propTypes'
import {createUINode, compose} from '../utils'


export const Cols = createUINode('Cols', propTypes, modifiers)
Cols.defaultProps = {
  ...Cols.defaultProps,
  n: 2
}


export default compose([Box, Cols])
