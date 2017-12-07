import React from 'react'
import Box from './Box'
import {node} from './PropTypes'
import {createFunctionalUINode, compose} from './utils'


export const Row = createFunctionalUINode('Row', node)


export default compose([Box, Row])
