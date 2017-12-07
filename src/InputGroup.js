import React from 'react'
import Box from './Box'
import {node} from './PropTypes'
import {createFunctionalUINode, compose} from './utils'


export const InputGroup = createFunctionalUINode('InputGroup', node)


export default compose([Box, InputGroup])
