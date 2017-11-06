export const whichConstructor = Component => Component.constructor ? Component.constructor : (Component.type ? Component.type : Component)


export const determineModifiers = (curlsModifiers, props) => {
  const mods = []
  const propKeys = Object.keys(props)

  if (curlsModifiers === void 0) {
    return mods
  }

  const modKeys = Object.keys(curlsModifiers)

  for (let x = 0; x < propKeys.length; x++) {
    const propName = propKeys[x]
    const mod = curlsModifiers[propName]

    if (mod !== void 0) {
      const propVal = props[propName]
      const valIsString = typeof propVal === 'string'
      const propVals = valIsString ? propVal.split(' ') : [propVal]

      for (let x = 0; x < propVals.length; x++) {
        const val = propVals[x]

        if (
          (valIsString && val) ||
          (
            val !== void 0  &&
            val !== null &&
            val !== false
          )
        ) {
          mods.push(mod(propVals[x]))
        }
      }
    }
  }

  return mods
}


export default Component => {
  const Constructor = whichConstructor(Component)
  return determineModifiers(Constructor.curlsModifiers, Component.props)
}
