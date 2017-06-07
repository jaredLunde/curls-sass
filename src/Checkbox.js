import React from 'react'
import {namespace as ns, Toggle, WillChange} from 'react-cake'

import {flexProps, nodeProps, spacingProps} from './props'
import PureComponent from './PureComponent'


const _defaultCheckMark = (
  <i className='fa fa-check' aria-hidden={true}/>
)


class Checkbox extends PureComponent {
  static displayName = 'Checkbox'

  static defaultProps = Object.assign(
    {
      checked: false,
      label: null,
      checkMark: _defaultCheckMark,
      name: void 0,
      onChange: null,
      readOnly: false,
      on: void 0,
      off: void 0,
      toggle: void 0,
      willChange: void 0,
      willChangeRef: void 0,
      willChangeIsOn: void 0
    },
    nodeProps,
    {nodeType: 'span'},
    flexProps,
    spacingProps
  )

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

  getCheckMark (willChange) {
    return (
      <span
        className={ns.classes.el(this, 'box')}
        style={willChange ? {willChange} : {}}
      >
        <span className={ns.classes.el(this, 'checkmark')}>
          {this.props.checkMark}
        </span>
      </span>
    )
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
    let {willChangeRef} = this.props
    let {style, ...renderProps} = this.renderProps
    let {willChange, ...renderStyle} = style

    return (
      <span
        className={this.className}
        ref={willChangeRef}
        onClick={
          (e) => {
            if (!this.props.readOnly) {
              return this.props.toggle(e)
            }
          }
        }
        style={renderStyle}
        {...renderProps}
      >
        {this.getCheckMark(willChange)}
        <input
          type='checkbox'
          ref={el => this._checkbox = el}
          checked={this.props.checked}
          name={this.props.name}
          onChange={()=>{}}
          value={this.props.value}
          readOnly={this.props.readOnly}
        />
        {this.label}
        {this.props.children}
      </span>
    )
  }
}


export default ({checked, ...props}) => (
  <WillChange backgroundColor whenClicked>
    <Toggle propName='checked' initialValue={checked || false}>
      <Checkbox {...props}/>
    </Toggle>
  </WillChange>
)
