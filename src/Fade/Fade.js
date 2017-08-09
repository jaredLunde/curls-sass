import React from 'react'
import {Toggle} from 'react-cake'
import {fromJS} from 'immutable'
import {createUIWrapper} from '../utils'
import modifiers from './modifiers'
import propTypes from './propTypes'
import Transitionable from '../Transitionable'

/**
<Fade med>
  {
    ({toggle, fadeIn, fadeOut, isVisible, ...props}) => (
      <div>
        <Box
          bg='black'
          p='x5 y4'
          br='2'
          bc='white'
          m='b2'
          style={{position: 'absolute', left: 0, right: 0, margin: '0 auto', width: 600, bottom: '20%'}}
          {...props}
        >
          <Type nodeType='div' lg bold white>
            Hello World! It's nice to meet you!
          </Type>
        </Box>

        <Button md bw='2' green m='t2' onClick={toggle}>
          <Type ultraHeavy xs>
            {isVisible ? 'FADE OUT' : 'FADE IN'}
          </Type>
        </Button>
      </div>
    )
  }
</Fade>
*/
export const Fade = createUIWrapper('Fade', propTypes, modifiers)


const FadeComponent = ({
  isVisible,
  fadeChildren,
  className,
  ...props
}) => (
  <Fade
    visible={isVisible}
    isVisible={isVisible}
    className={`${className || ''} fade`.trim()}
    {...props}
  >
    {fadeChildren}
  </Fade>
)

const fadeControls = fromJS([
  {name: 'fadeIn', value: true},
  {name: 'fadeOut', value: false}
])

export default ({children, visible, ...props}) => (
  <Toggle
    propName='isVisible'
    initialValue={visible || false}
    controls={fadeControls}
    fadeChildren={children}
    {...props}
  >
    <Transitionable>
      {FadeComponent}
    </Transitionable>
  </Toggle>
)
