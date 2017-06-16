export default el => prevState => {
  const {offsetWidth, parentNode} = el
  const widthDiff = offsetWidth - parentNode.offsetWidth
  const left =`${Math.floor(-1 * (widthDiff / 2))}px`

  return left !== prevState.left ? {left, top: void 0} : void 0
}
