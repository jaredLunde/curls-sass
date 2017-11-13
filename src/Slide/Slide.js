import React from 'react'
import {Toggle, compose} from 'react-cake'
import {fromJS} from 'immutable'
import {createUIWrapper} from '../utils'
import modifiers from './modifiers'
import propTypes from './propTypes'
import Transitionable from '../Transitionable'


/**
<Slide fromLeft slow>
  {
    ({toggle, slideIn, slideOut, isVisible, ...props}) => (
      <div>
        <Box
          bg='black'
          p='x5 y4'
          br='r2'
          bc='white'
          m='b2'
          style={{position: 'absolute', left: 0}}
          {...props}
        >
          <Type nodeType='div' lg bold white>
            Hello World! It's nice to meet you!
          </Type>
        </Box>

        <Button md bw='2' green m='t2' onClick={toggle}>
          <Type ultraHeavy xs>
            {isVisible ? 'SLIDE OUT' : 'SLIDE IN'}
          </Type>
        </Button>
      </div>
    )
  }
</Slide>
*/
export const Slide = createUIWrapper('Slide', propTypes, modifiers)


const SlideComponent = ({
  isVisible,
  slideChildren,
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
      ? `slide--${defaultFrom}`
      : ''

  return (
    <Slide
      slid={isVisible}
      isVisible={isVisible}
      fromTop={fromTop}
      fromRight={fromRight}
      fromBottom={fromBottom}
      fromLeft={fromLeft}
      className={`${className || ''} slide ${defaultClass}`.trim()}
      {...props}
    >
      {slideChildren}
    </Slide>
  )
}

const slideControls = fromJS([
  {name: 'slideIn', value: true},
  {name: 'slideOut', value: false}
])


const composedSlide = compose([Toggle, Transitionable, SlideComponent])


export default ({children, visible, ...props}) => composedSlide({
  propName: 'isVisible',
  initialValue: visible || false,
  controls: slideControls,
  slideChildren: children,
  ...props
})
