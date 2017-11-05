import React from 'react'
import {Toggle, cloneIfElement, namespace as ns} from 'react-cake'
import {fromJS} from 'immutable'
import modifiers from './modifiers'
import propTypes from './propTypes'
import Box from '../Box'
import Transitionable from '../Transitionable'
import {createUINode} from '../utils'

/**
<Checkbox checked name='amIChecked' value='foobar'>
{
  ({toggle, check, unCheck, isChecked, ...props}) => (
    <Type bold darkGrey m='l2'>
      Checked?
      <Type light m='l1'>{JSON.stringify(isChecked)}</Type>
    </Type>
  )
}
</Checkbox>
*/
export const Checkmark = ({toggle, check, unCheck, isChecked}) => (
  <span className='checkbox__checkmark'>
    <svg
      key='checkMark'
      xmlns="http://www.w3.org/2000/svg"
      viewBox='0 0 25 25'
      style={{width: '100%', height: '100%'}}
    >
      <path d="M.557,12.35578a1.89945,1.89945,0,1,1,2.68645-2.686l6.45255,6.453,12.06145-12.061A1.89929,1.89929,0,1,1,24.443,6.74823L9.6969,21.49477Z"
        style={{fill: '#feefef'}}
      />
      <path d="M24.69186,4.30071a1.05135,1.05135,0,0,0-1.48724,0L9.47188,18.03345,1.79538,10.35694A1.05164,1.05164,0,0,0,.30814,11.84418l9.16324,9.16325.0005-.0005.0005.0005L24.69186,5.78795A1.05135,1.05135,0,0,0,24.69186,4.30071Z"
        style={{fill: '#feefef'}}
      />
    </svg>
  </span>
)

export const Checkbox = createUINode('Checkbox', propTypes, modifiers)
Checkbox.defaultProps = {
  nodeType: 'span',
  checkmark: Checkmark
}


Checkbox.prototype.render = function () {
  const {
    nodeType,
    checkboxChildren,
    name,
    value,
    toggle,
    check,
    unCheck,
    isChecked,
    checkmark,
    readOnly,
    ...props
  } = this.props
  const children = checkboxChildren
  const checkBox = (
    <span key='checkbox' className={ns.classes.el(this, 'box')}>
      {checkmark({toggle, check, unCheck, isChecked})}
    </span>
  )

  const input = <input
    key='checkbox__input'
    type='checkbox'
    name={name}
    value={value}
    checked={isChecked}
    readOnly
  />

  const checkboxLabel = cloneIfElement(
      children,
      {
        key: 'label',
        toggle,
        check,
        unCheck,
        isChecked
      }
    )

  return React.createElement(
    nodeType,
    {
      ...props,
      onClick: readOnly === true ? void 0 : toggle,
      className: this.className,
    },
    [
      checkBox,
      checkboxLabel,
      input
    ]
  )
}

const checkboxControls = fromJS([
  {name: 'check', value: true},
  {name: 'unCheck', value: false}
])

export default ({children, checked, onChange, ...props}) => (
  <Box {...props} checkboxChildren={children}>
    <Toggle
      propName='isChecked'
      initialValue={checked || false}
      controls={checkboxControls}
      onChange={onChange}
    >
      {Checkbox}
    </Toggle>
  </Box>
)
