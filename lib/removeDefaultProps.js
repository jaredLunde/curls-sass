export default (defaultProps, props) => {
  const newProps = {}
  for (let propName in props)
    if (defaultProps.hasOwnProperty(propName) === false)
      newProps[propName] = props[propName]
  return newProps
}
