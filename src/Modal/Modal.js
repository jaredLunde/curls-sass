import React from 'react'
import {
  WillChange,
  namespace as ns,
  cloneIfElement,
  loadImages
} from 'react-cake'
import Box from '../Box'
import Drop from '../Drop'
import propTypes from './propTypes'
import centerInParentX from './centerInParentX'
import centerInParentY from './centerInParentY'
import {createUINode, joinClassName} from '../utils'


/**
<Modal
  content={
    ({hide, willChangeRef}) => (
      <Type black>
        Im a modal</br>
        <a onClick={hide} ref={willChangeRef}>
          Close
        </a>
      </Type>
    )
  }
  bg='white'
  p='6'
>
  {
    ({modal, toggle, willChangeRef}) => (
      <Hero bg='black'>
        {modal}

        <Button
          withRef={willChangeRef}
          onClick={toggle}
          md
          translucentDark
        >
          Get yours today
        </Button>
      </Hero>
    )
  }
</Modal>
**/
export const Modal = createUINode('Modal', propTypes)
Modal.defaultProps = {
  nodeType: 'div'
}

Modal.prototype.render = function () {
  const {
    nodeType,
    modalChildren,
    isVisible,
    toggle,
    dropIn,
    dropOut,
    willChangeRef,
    content,
    className,
    style,
    ...modalProps
  } = this.props
  const {reposition} = this
  const show = dropIn, hide = dropOut

  const modal = React.createElement(
    nodeType,
    {
      className: joinClassName(
        {className: ns.classes.get(this)},
        'fade',
        isVisible
        ? 'fade--visible'
        : ''
      )
    },
    React.createElement(
      'div',
      {
        className: joinClassName({className}, ns.classes.el(this, 'content')),
        style,
        ...modalProps
      },
      content({isVisible, toggle, show, hide, willChangeRef})
    )
  )

  return cloneIfElement(
    modalChildren,
    {
      modal,
      isVisible,
      toggle,
      show,
      hide,
      willChangeRef
    }
  )
}


const ModalComponent = ({
  willChangeIsOn,
  willChange,
  ...props
}) => (
  <Drop defaultFrom='bottom' {...props}>
    {Modal}
  </Drop>
)


export default ({children, ...props}) => (
  <Box {...props}>
    <WillChange
      opacity
      visibility
      transform
      whenClicked
    >
      <ModalComponent modalChildren={children}/>
    </WillChange>
  </Box>
)
