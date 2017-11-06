const whichClassName = className => typeof className === 'object'
  ? className.className
  : className


export default (...classNames) => (
  classNames.filter(className => className).map(whichClassName).join(' ')
  || void 0
)
