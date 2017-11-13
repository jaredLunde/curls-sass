import React from 'react'
import {WillChange, cloneIfElement, compose} from 'react-cake'
import Box from '../Box'
import Slide from '../Slide'
import modifiers from './modifiers'
import propTypes from './propTypes'
import {createUINode} from '../utils'


/**
<Drawer
  fast
  fromRight
  p='x3 y4'
  content={
    ({isVisible, toggle, show, hide}) => <Type black>I'm a drawer</Type>
  }
>
  {
    ({drawer, isVisible, toggle, show, hide, willChangeRef}) => (
      <div className='pr m--b7'>
        {drawer}

        <a
          onMouseEnter={show}
          onMouseLeave={hide}
          ref={willChangeRef}
        >
          {isVisible ? 'Close Drawer' : 'Open Drawer'}
        </a>
      </div>
    )
  }
</Drawer>
*/
export const Drawer = createUINode('Drawer', propTypes, modifiers)
Drawer.defaultProps = {
  nodeType: 'div'
}


Drawer.prototype.render = function () {
  const {
    nodeType,
    absolute,
    drawerChildren,
    isVisible,
    toggle,
    slideIn,
    slideOut,
    willChangeRef,
    content,
    className,
    style,
    ...drawerProps
  } = this.props
  const show = slideIn, hide = slideOut
  const drawer = React.createElement(
    nodeType,
    {
      className: this.className,
      style: {...style, ...this.state},
      ...drawerProps
    },
    content({isVisible, toggle, show, hide})
  )

  return cloneIfElement(
    drawerChildren,
    {
      [this.constructor.displayName.toLowerCase()]: drawer,
      isVisible,
      toggle,
      show,
      hide,
      willChangeRef
    }
  )
}



const DrawerComponent = ({
  willChangeIsOn,
  willChange,
  ...props
}) => (
  <Slide defaultFrom='left' {...props}>
    {Drawer}
  </Slide>
)


const composedDrawer = compose([Box, WillChange, DrawerComponent])

export default ({children, ...props}) => composedDrawer({
  visibility: true,
  transform: true,
  whenClicked: true,
  whenMouseEnters: true,
  whenMouseLeaves: true,
  drawerChildren: children,
  ...props
})
