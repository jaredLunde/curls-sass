import React from 'react'
import Box from './Box'
import {node} from './PropTypes'
import {createUINode, compose} from './utils'


export const Card = createUINode('Card', node)


export default compose([Box, Card])
