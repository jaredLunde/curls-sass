export default (className, ...classNames) => {
  if (typeof className === 'object') {
    className = className.className
  }

  return `${className ||''} ${classNames.join(' ')}`.trim() || void 0
}
