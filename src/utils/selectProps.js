export default (initialProps, ...selectedPropObjects) => {
  const props = {}
  let selectedProps = []

  for (let x = 0; x < selectedPropObjects.length; x++) {
    const obj = selectedPropObjects[x]

    if (Array.isArray(obj)) {
      selectedProps = selectedProps.concat(obj)
    } else {
      selectedProps = selectedProps.concat(Object.keys(obj))
    }
  }

  const initialKeys = Object.keys(initialProps)
  for (let x = 0; x < initialKeys.length; x++) {
    const propName = initialKeys[x]
    if (
      selectedProps.indexOf(propName) > -1 &&
      initialProps[propName] !== void 0
    ) {
      props[propName] = initialProps[propName]
    }
  }

  return props
}
