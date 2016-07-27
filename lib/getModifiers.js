import endsWith from 'lodash/endsWith'

export default (mods, props) => {
  const modifiers = []

  for (let propName in props)
    if (mods.hasOwnProperty(propName) && props[propName] !== void 0) {
      let modVal = props[propName]
      if (modVal === void 0 || String(modVal) === 'true')
        modVal = ''
      modifiers.push(mods[propName] + modVal)
    }

  return modifiers
}
