import endsWith from 'lodash/endsWith'
import {format} from 'react-pilot/routeParser'


export default (props, ...mods_) => {
  const modifiers = []

  for (let propName in props) {
    for (let mods of mods_) {
      if (mods.hasOwnProperty(propName) && props[propName] !== void 0) {
        const vals = Array.isArray(props[propName]) ?
                     props[propName] :
                     [props[propName]]
        for (let modVal of vals) {
          if (modVal === void 0 || String(modVal) === 'true')
            modVal = ''
          modifiers.push(format(mods[propName], {mod: modVal}))
        }
      }
    }
  }

  return modifiers
}
