import React from 'react'
import {namespace as ns, Toggle} from 'react-cake'

import {flexProps, nodeProps, spacingProps} from './props'
import removeDefaultProps from './removeDefaultProps'
import PureComponent from './PureComponent'


class Toggler extends PureComponent {
  static displayName = 'Toggler'

  static defaultProps = Object.assign(
    {enabled: false,
     label: void 0,
     name: void 0},
    nodeProps,
    {nodeType: 'span'},
    flexProps,
    spacingProps
  )

  get className () {
    const modifiers = this.getModifiers()

    if (this.props.enabled)
      modifiers.push('enabled')

    return ns.classes.append(this, ...modifiers)
  }

  get label () {
    if (this.props.label) {
      return (
        <label>
          {this.props.label}
        </label>
      )
    }

    return null
  }

  get renderProps () {
    const props = removeDefaultProps(this.constructor.defaultProps, this.props)
    delete props.children
    delete props.Toggle
    return props
  }

  render () {
    return (
      <span className={this.className}
            {...this.props.Toggle}
            {...this.renderProps}>
        <span className={ns.classes.el(this, 'container')}>
          <input type='checkbox'
                 checked={this.props.enabled}
                 name={this.props.name}/>
          <span className={ns.classes.el(this, 'handle')}/>
        </span>
        {this.label}
        {this.props.children}
      </span>
    )
  }
}


export default props => {
  const Component = Toggle('enabled', props.enabled)(Toggler)
  return <Component {...props}/>
}
