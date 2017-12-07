import React from 'react'
import {wrapDisplayName, displayName as getDisplayName} from 'react-cake'
import {createUIWrapper, compose} from '../utils'
import modifiers from './modifiers'
import propTypes from './propTypes'
import Flex from '../Flex'
import Grid from '../Grid'


/**
<Box className='slidable' bg='white' p='3' bc='lightestGrey' bw='1'>
  <div>
    Hello
  </div>
</Box>
*/
export const Box = createUIWrapper('Box', propTypes, modifiers)
export default compose([Grid, Flex, Box])
