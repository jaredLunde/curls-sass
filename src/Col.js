import React from 'react'
import Box from './Box'
import {node} from './PropTypes'
import {createFunctionalUINode, compose} from './utils'


export const Col = createFunctionalUINode('Col', node)


export default compose([Box, Col])
