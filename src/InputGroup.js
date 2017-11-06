import React from 'react'
import Box from './Box'
import {node} from './PropTypes'
import {createUINode, compose} from './utils'


export const InputGroup = createUINode('InputGroup', node)


export default compose([Box, InputGroup])
