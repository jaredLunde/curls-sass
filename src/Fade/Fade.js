import React from 'react'
import {Toggle, compose} from 'react-cake'
import {fromJS} from 'immutable'
import {createUIWrapper, joinClassName} from '../utils'
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


function FadeComponent ({
  isVisible,
  fadeChildren,
  className,
  ...props
}) {
  return Fade({
    visible: isVisible,
    isVisible,
    className: joinClassName(className, 'fade'),
    ...props,
    children: fadeChildren
  })
}


const fadeControls = fromJS([
  {name: 'fadeIn', value: true},
  {name: 'fadeOut', value: false}
])


const compostedFade = compose([Toggle, Transitionable, FadeComponent])


export default function ({children, visible, ...props}) {
  return composedFade({
    propName: 'isVisible',
    initialValue: visible || false,
    controls: fadeControls,
    fadeChildren: children,
    ...props
  })
}
