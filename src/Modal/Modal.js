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

Modal.prototype._modalBg = null
Modal.prototype.closeModalFromBg = function (e) {
  if (e.target === this._modalBg || e.target === this._modalWindow) {
    this.props.dropOut()
  }
}

Modal.prototype.setWindowRef = function (e) {this._modalWindow = e}
Modal.prototype.setBgRef = function (e) {this._modalBg = e}

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
  const show = dropIn,
        hide = dropOut

  const modalContent = React.createElement(
    'div',
    {
      className: joinClassName(className, ns.classes.el(this, 'content')),
      style,
      ...modalProps
    },
    content({isVisible, toggle, show, hide, willChangeRef})
  )

  const modal = React.createElement(
    nodeType,
    {
      ref: this.setBgRef.bind(this),
      onClick: this.closeModalFromBg.bind(this),
      className: joinClassName(
        ns.classes.get(this),
        isVisible ? 'fade--visible' : '',
        'fade'
      )
    },
    React.createElement(
      'div',
      {
        ref: this.setWindowRef.bind(this),
        className: ns.classes.el(this, 'window')
      },
      modalContent
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


export default ({children, onChange, ...props}) => (
  <Box {...props}>
    <WillChange
      opacity
      visibility
      transform
      whenClicked
    >
      <ModalComponent onChange={onChange} modalChildren={children}/>
    </WillChange>
  </Box>
)
