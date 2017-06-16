import centerInParentX from './centerInParentX'
import centerInParentY from './centerInParentY'


export default el => prevState => {
  const posX = centerInParentX(el)(prevState)
  const posY = centerInParentY(el)(prevState)
  const pos = {}

  if (posX !== void 0) {
    pos.left = posX.left
  }

  if (posY !== void 0) {
    pos.top = posY.top
  }

  return Object.keys(pos).length ? pos : void 0
}
