function whichClassName (className) {
  return typeof className !== 'object'
    ? className
    : className.className
}


export default function (...classNames) {
  return (
    classNames.filter(className => className).map(whichClassName).join(' ')
    || void 0
  )
}
