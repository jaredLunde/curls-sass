import React from 'react'
import {wrapDisplayName, displayName as getDisplayName} from 'react-cake'
import {createUIWrapper, /*compose*/} from '../utils'
import modifiers from './modifiers'
import propTypes from './propTypes'
import flexModifiers from '../Flex/modifiers'
import flexProps from '../Flex/propTypes'
import gridModifiers from '../Grid/modifiers'
import gridProps from '../Flex/propTypes'


/**
<Box className='slidable' bg='white' p='3' bc='lightestGrey' bw='1'>
  <div>
    Hello
  </div>
</Box>
*/
export const Box = createUIWrapper('Box', propTypes, modifiers)

export default createUIWrapper(
  'Box',
  {...gridProps, ...flexProps, ...propTypes},
  {...gridModifiers, ...flexModifiers, ...modifiers}
)
// export default compose([Grid, Flex, Box])
