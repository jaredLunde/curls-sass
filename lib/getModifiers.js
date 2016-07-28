import endsWith from 'lodash/endsWith'

export default (props, ...mods_) => {
  const modifiers = []

  for (let propName in props) {
    for (let mods of mods_) {
      if (mods.hasOwnProperty(propName) && props[propName] !== void 0) {
        let modVal = props[propName]
        if (modVal === void 0 || String(modVal) === 'true')
          modVal = ''
        modifiers.push(mods[propName] + modVal)
      }
    }
  }

  return modifiers
}
