import React from 'react'
import Box from './Box'
import {node} from './PropTypes'
import {createUINode, compose} from './utils'


export const Col = createUINode('Col', node)


export default compose([Box, Col])
