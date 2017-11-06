import React from 'react'
import Box from './Box'
import {Col} from './Col'
import {compose} from './utils'


export class Row extends Col {
  static displayName = 'Row'
}


export default compose([Box, Row])
