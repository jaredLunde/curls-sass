import {flexMods} from './modifiers'
import getModifiers from './getModifiers'


export default (mods, flexName = 'flex') => {
  const modifiers = getModifiers(mods, flexMods)

  for (let x in modifiers) {
    modifiers[x] = `${flexName}${modifiers[x]}`
  }
  
  return modifiers
}
