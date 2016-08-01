import endsWith from 'lodash/endsWith'
import {flexMods} from './modifiers'
import getModifiers from './getModifiers'
import {format} from 'react-pilot/routeParser'


export default (mods, flexName = 'flex') => {
  const modifiers = getModifiers(mods, flexMods)

  for (let x in modifiers)
    modifiers[x] = `${flexName}${modifiers[x]}`

  return modifiers
}
