import React from 'react'
import {
  reduceProps,
  WillChange,
  Choices,
  callIfExists,
  cloneIfElement,
  namespace as ns,
  compose
} from 'react-cake'
import {OrderedSet} from 'immutable'
import Box from './Box'
import Button from './Button'
import Type from './Type'
import Drop from './Drop'
import {selectProps, createUINode, joinClassName} from './utils'


export const SelectToggle = ({
  selection,
  isVisible,
  toggle,
  willChangeRef,
  ...props
}) => (
  <Button
    sm
    translucentWhite
    key='button'
    className='select__toggle'
    aria-expanded={String(isVisible)}
    aria-haspopup='true'
    onClick={toggle}
    withRef={willChangeRef}
    {...props}
  >
    <Type semiBold darkestGrey className='select__value'>
      {cloneIfElement(getOptionLabel(selection))}
    </Type>

    <Type
      md
      heavy
      darkestGrey
      m='l3'
      className='select__caret'
      aria-hidden='true'
    >
      ⌄
    </Type>
  </Button>
)

export const SelectMenu = ({
  className,
  isVisible,
  isSelected,
  option,
  options,
  style,
  select,
  ...props
}) => (
  <ul
    key='menu'
    aria-label='submenu'
    className={joinClassName({className}, 'select__menu')}
    style={style}
    {...props}
  >
    {
      options.map(
        (o, n) => option({
          option: o,
          select,
          isSelected,
          n
        })
      )
    }
  </ul>
)

const getOptionLike = (selection, key) => (
  typeof selection.get === 'function'
  ? selection.get(key)
  : (
    selection[key] !== void 0
    ? selection[key]
    : (
      selection === null
      ? ''
      : selection
    )
  )
)
const getOptionValue = selection => getOptionLike(selection, 'value')
const getOptionName = selection => getOptionLike(selection, 'name')
const getOptionLabel = selection => getOptionLike(selection, 'label') || getOptionName(selection)

export const SelectOption = ({
  option,
  select,
  isSelected,
  n,
  className = 'select__option',
  ...props
}) => (
  <li
    onClick={() => select(option)}
    className={
      isSelected(option)
      ? joinClassName({className}, 'type--semi-bold')
      : className
    }
    key={n}
    {...props}
  >
    {cloneIfElement(getOptionLabel(option))}
  </li>
)

export const Select = createUINode('Select')
Select.defaultProps = {
  nodeType: 'div',
  button: SelectToggle,
  menu: SelectMenu,
  option: SelectOption
}

Select.prototype.makeSelection = function (option) {
  const {select, deselect, selections, toggleDrop} = this.props
  select(option);
  deselect(selections.first())
  toggleDrop()
}

Select.prototype.render = function () {
  let {
    name,
    button,
    menu,
    option,
    options,
    nodeType,
    isVisible,
    toggleDrop,
    dropIn,
    dropOut,
    willChangeRef,
    boxClassName,
    select,
    deselect,
    setSelections,
    setChoices,
    clearChoices,
    deleteChoice,
    isSelected,
    clearSelections,
    addChoice,
    isChoice,
    selections,
    toggle,
    ...props
  } = this.props

  let {willChange, ...style} = props.style
  const dropClassName = props.className
  const openClass = isVisible ? ns.classes.mod(this, 'open') : ''
  const selection = selections.first()
  const htmlSelect = (
    <select
      readOnly
      key='select__select'
      name={name}
      value={getOptionValue(selection) || void 0}
    >
      <option value={getOptionValue(selection) || void 0}/>
    </select>
  )

  return React.createElement(
    nodeType,
    {
      ...props,
      style,
      className: `
        ${boxClassName || ''}
        ${ns.classes.get(this)}
        ${openClass}
      `.trim()
    },
    [
      button({
        selection,
        toggle: toggleDrop,
        willChangeRef,
        isVisible
      }),
      menu({
        option,
        options,
        isVisible,
        isSelected,
        select: this.makeSelection.bind(this),
        className: dropClassName,
        style: {willChange}
      }),
      htmlSelect
    ]
  )
}

const ChoicesComponent = ({
  options,
  initialSelection,
  onSelect,
  toggle,
  ...props
}) => (
  <Choices
    choicesPropName='options'
    initialChoices={options}
    initialSelections={OrderedSet([initialSelection || options.first()])}
    minChoices={1}
    minSelections={1}
    maxSelections={2}
    onSelect={selections => callIfExists(onSelect, selections.first())}
    toggleDrop={toggle}
    {...props}
  >
    {Select}
  </Choices>
)

const DropComponent = ({willChangeIsOn, willChange, ...props}) => (
  <Drop {...props}>
    {ChoicesComponent}
  </Drop>
)


const composedDropdown = compose([Box, WillChange, DropComponent])


export default ({className, onChange, ...props}) => composedDropdown({
  opacity: true,
  visibility: true,
  transform: true,
  whenClicked: true,
  boxClassName: className,
  onSelect: onChange,
  ...props
})
