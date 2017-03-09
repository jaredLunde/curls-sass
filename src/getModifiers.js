import endsWith from 'lodash/endsWith'
import {format} from 'react-pilot/es/routeParser'


export default (props, ...mods_) => {
  const modifiers = []

  for (let propName in props) {
    for (let i = 0; i < mods_.length; i++) {
      const mods = mods_[i]

      if (mods.hasOwnProperty(propName) && props[propName] !== void 0) {
        const vals = Array.isArray(props[propName]) ?
                     props[propName] :
                     [props[propName]]

        for (let j = 0; j < vals.length; j++) {
          let modVal = vals[j]

          if (modVal === void 0 || String(modVal) === 'true') {
            modVal = ''
          }

          modifiers.push(format(mods[propName], {mod: modVal}))
        }
      }
    }
  }

  return modifiers
}
