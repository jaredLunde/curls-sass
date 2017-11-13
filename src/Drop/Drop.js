import React from 'react'
import {Toggle, compose} from 'react-cake'
import {fromJS} from 'immutable'
import {createUIWrapper} from '../utils'
import modifiers from './modifiers'
import propTypes from './propTypes'
import Transitionable from '../Transitionable'


/**
<Drop boomerang>
  {
    ({toggle, dropIn, dropOut, isVisible, ...props}) => (
      <div>
        <Box bg='white' p='4' br='2' bc='white' bw='1' {...props}>
          <Type nodeType='div' lg darkGrey>
            Hello
          </Type>
        </Box>

        <Button md green onClick={toggle}>
          {isVisible ? 'Drop Out' : 'Drop In'}
        </Button>
      </div>
    )
  }
</Drop>
*/
export const Drop = createUIWrapper('Drop', propTypes, modifiers)


const DropComponent = ({
  isVisible,
  dropChildren,
  className,
  fromTop,
  fromRight,
  fromBottom,
  fromLeft,
  defaultFrom,
  ...props
}) => {
  const defaultClass = defaultFrom &&
    !(fromTop || fromRight || fromBottom || fromLeft)
      ? `drop--${defaultFrom}`
      : ''

  return <Drop
    dropped={isVisible}
    isVisible={isVisible}
    fromTop={fromTop}
    fromRight={fromRight}
    fromBottom={fromBottom}
    fromLeft={fromLeft}
    className={`${className || ''} drop ${defaultClass}`.trim()}
    {...props}
  >
    {dropChildren}
  </Drop>
}


const dropControls = fromJS([
  {name: 'dropIn', value: true},
  {name: 'dropOut', value: false}
])


const composedDrop = compose([Toggle, Transitionable, DropComponent])


export default ({children, visible, ...props}) => composedDrop({
  propName: 'isVisible',
  initialValue: visible || false,
  controls: dropControls,
  dropChildren: children,
  ...props
})
