import {toKebabCase} from 'react-cake'


export default {
  // speeds
  veryFast: () => 'transitionable--very-fast',
  fast: () => 'transitionable--fast',
  med: () => 'transitionable--med',
  slow: () => 'transitionable--slow',
  verySlow: () => 'transitionable--very-slow',
  speed: mod => `transitionable--${toKebabCase(mod)}`,
  // timing functions
  boomerang: () => 'transitionable--boomerang',
  bounce: () => 'transitionable--bounce',
  easeOut: () => 'transitionable--ease-out',
  easeIn: () => 'transitionable--ease-in',
  easeInOut: () => 'transitionable--ease-in-out',
  swiftMove: () => 'transitionable--swift-move',
  swifterMove: () => 'transitionable--swifter-move',
  heavyMove: () => 'transitionable--heavy-move',
  swiftIn: () => 'transitionable--swift-in',
  swiftOut: () => 'transitionable--swift-out',
  linear: () => 'transitionable--linear',
  easing: mod => `transitionable--${toKebabCase(mod)}`,
}
