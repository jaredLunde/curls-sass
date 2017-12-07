import React from 'react'
import {Box} from './Box/Box'
import {node} from './PropTypes'
import {createFunctionalUINode, compose} from './utils'


const defaultProps = {
  nodeType: 'div',
  'aria-label': 'separator'
}


export const Divider = createFunctionalUINode('Divider', node, defaultProps)


export default compose([Box, Divider])
