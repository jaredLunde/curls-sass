import endsWith from 'lodash/endsWith'
import {flexMods} from './modifiers'

export default (props, flexName = 'flex') => {
  const modifiers = []

  for (let propName in props) {
    if (flexMods.hasOwnProperty(propName) && props[propName] !== void 0) {
      let modName = flexMods[propName]
      if (endsWith(modName, '-'))
        modName = modName + props[propName]
      modifiers.push(`${flexName}${modName}`)
    }
  }

  return modifiers
}
