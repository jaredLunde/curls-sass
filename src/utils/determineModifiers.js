export const whichConstructor = Component => Component.constructor ? Component.constructor : (Component.type ? Component.type : Component)


export function determineModifiers (curlsModifiers, props) {
  const mods = []

  if (curlsModifiers === void 0) {
    return mods
  }

  const propKeys = Object.keys(props)

  for (let x = 0; x < propKeys.length; x++) {
    const propName = propKeys[x]
    const mod = curlsModifiers[propName]

    if (mod !== void 0) {
      const propVal = props[propName]
      const typeOfVal = typeof propVal
      const valIsString = typeOfVal === 'string'
      const propVals = valIsString ? propVal.split(' ') : [propVal]

      for (let y = 0; y < propVals.length; y++) {
        const val = propVals[y]

        if (val || (valIsString && val) || typeOfVal === 'number') {
          mods.push(mod(val))
        }
      }
    }
  }

  return mods
}


export default function (Component) {
  const Constructor = whichConstructor(Component)
  return determineModifiers(Constructor.curlsModifiers, Component.props)
}
