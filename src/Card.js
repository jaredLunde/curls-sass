import React from 'react'
import Box from './Box'
import {node} from './PropTypes'
import {createFunctionalUINode, compose} from './utils'


export const Card = createFunctionalUINode('Card', node)


export default compose([Box, Card])
