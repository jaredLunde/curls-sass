import React from 'react'
import Box from '../Box'
import modifiers from './modifiers'
import propTypes from './propTypes'
import {createFunctionalUINode, compose} from '../utils'


const defaultProps = {
  nodeType: 'div',
  n: 2
}


export const Cols = createFunctionalUINode(
  'Cols',
  propTypes,
  defaultProps,
  modifiers
)


export default compose([Box, Cols])
