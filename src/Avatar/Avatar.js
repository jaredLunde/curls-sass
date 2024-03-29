import React from 'react'
import {ImageStat} from 'react-cake'
import {Box} from '../Box/Box'
import Flex from '../Flex'
import modifiers from './modifiers'
import propTypes from './propTypes'
import {createUINode, supportsCSS, compose} from '../utils'


/**
<Avatar
  xl
  m='y5'
  src="https://lh4.ggpht.com/DW_Tv3VoWysUtnM0GnOkSU4oTuFzeNpIq1yna7BAIPrw4sQxkFXb3hCXbV0YDW2hzqI=h900"
  defaultSrc="some-default.jpg"
/>
*/
const supportsObjectFit = supportsCSS('object-fit')

export const Avatar = createUINode('Avatar', propTypes, modifiers)
Avatar.defaultProps = {
  nodeType: 'div',
  orientation: 'square',
  getImage: ({src, defaultSrc, imageRef}) => <img
    key={src || defaultSrc}
    src={src || defaultSrc}
    onError={e => e.target.src = defaultSrc || ''}
    ref={imageRef}
  />
}

Avatar.prototype.render = function () {
  let {src, defaultSrc, children, orientation, getImage, nodeType} = this.props
  children = children && Array.isArray(children) ?
             children :
             (children ? [children] : [])

  children.push(getImage(this.props))

  const props = this.renderProps
  return React.createElement(nodeType, props, children)
}


const ComposedAvatarWithStat = compose([Flex, Box, ImageStat, Avatar])
const ComposedAvatar = compose([Flex, Box, Avatar])


export default function (props) {
  const Component = supportsObjectFit === false ? ComposedAvatarWithStat : ComposedAvatar
  return Component(props)
}
