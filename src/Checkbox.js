import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import {namespace as ns, Toggle} from 'react-cake'

import {flexProps, nodeProps, spacingProps} from './props'
import removeDefaultProps from './removeDefaultProps'
import Component from './Component'


const _defaultCheckMark = (
  <i className='fa fa-check' aria-hidden={true}/>
)



@Toggle('checked')
class Checkbox extends Component {
  static displayName = 'Checkbox'

  static defaultProps = Object.assign(
    {checked: false,
     label: null,
     checkMark: _defaultCheckMark,
     name: void 0,
     Toggle: null,
     onChange: null,
     readOnly: false},
    nodeProps,
    {nodeType: 'span'},
    flexProps,
    spacingProps
  )

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  get className () {
    const modifiers = this.getModifiers()

    if (this.props.checked)
      modifiers.push('checked')

    return ns.classes.append(this, ...modifiers)
  }

  get onChange () {
    if (this.props.onChange)
      return () => this.props.onChange(this._checkbox)
    return () => {}
  }

  get checkMark () {
    return (
      <span className={ns.classes.el(this, 'box')}>
        <span className={ns.classes.el(this, 'checkmark')}>
          {this.props.checkMark}
        </span>
      </span>
    )
  }

  get label () {
    if (this.props.label) {
      return (
        <label onClick={(e) => {
          if (!this.props.readOnly)
            return this.props.Toggle.onClick(e)
        }}>
          {this.props.label}
        </label>
      )
    }

    return null
  }

  _prevChecked = false

  componentWillMount () {
    this._prevChecked = this.props.checked
  }

  componentWillUpdate (nextProps) {
    this._prevChecked = this.props.checked
  }

  componentDidUpdate () {
    if (this._prevChecked !== this.props.checked)
      this.onChange()
  }

  render () {
    return (
      <span className={this.className}
            onClick={(e) => {
              if (!this.props.readOnly)
                return this.props.Toggle.onClick(e)
            }}
            {...this.renderProps}>
        {this.checkMark}
        <input type='checkbox'
               ref={el => this._checkbox = el}
               checked={this.props.checked}
               name={this.props.name}
               onChange={()=>{}}
               value={this.props.value}
               readOnly={this.props.readOnly}/>
        {this.label}
        {this.props.children}
      </span>
    )
  }
}


export default Checkbox
