const whichConstructor = Component => Component.constructor ? Component.constructor : (Component.type ? Component.type : Component)


export default Component => {
  const mods = []
  const propKeys = Object.keys(Component.props)
  const Constructor = whichConstructor(Component)

  if (Constructor.curlsModifiers === void 0) {
    return mods
  }

  const modKeys = Object.keys(Constructor.curlsModifiers)

  for (let x = 0; x < propKeys.length; x++) {
    const propName = propKeys[x]
    const mod = Constructor.curlsModifiers[propName]

    if (mod !== void 0) {
      const propVal = Component.props[propName]
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
