export default ({className}, ...classNames) => `${className ||''} ${classNames.join(' ')}`.trim() || void 0
