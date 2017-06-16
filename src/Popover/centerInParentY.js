export default el => prevState => {
  const {offsetHeight, parentNode} = el
  const heightDiff = offsetHeight - parentNode.offsetHeight
  const top =`${Math.floor(-1 * (heightDiff / 2))}px`

  return top !== prevState.top ? {top, left: void 0} : void 0
}
