import React from 'react'
import {
  reduceProps,
  WillChange,
  Choices,
  callIfExists,
  namespace as ns
} from 'react-cake'
import {OrderedSet} from 'immutable'
import Box from '../Box'
import boxPropTypes from '../Box/propTypes'
import Button from '../Button'
import Type from '../Type'
import Drop from '../Drop'
import propTypes from './propTypes'
import {selectProps, createUINode, joinClassName} from '../utils'


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
      {getOptionName(selection)}
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
    : selection
  )
)
const getOptionValue = selection => getOptionLike(selection, 'value')
const getOptionName = selection => getOptionLike(selection, 'name')

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
    {getOptionName(option)}
  </li>
)

export const Select = createUINode('Select', propTypes)
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
  props = reduceProps(props, propTypes)
  let {willChange, ...style} = props.style
  const dropClassName = props.className
  const openClass = isVisible ? ns.classes.mod(this, 'open') : ''
  const selection = selections.first()
  const htmlSelect = <select
    readOnly
    key='select__select'
    name={name}
    value={getOptionValue(selection)}
  />

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

const WillChangeComponent = ({className, ...props}) => (
  <WillChange opacity visibility transform whenClicked {...props}>
    <DropComponent boxClassName={className}/>
  </WillChange>
)

export default ({onChange, ...props}) => (
  <Box {...props} onSelect={onChange}>
    <WillChangeComponent/>
  </Box>
)
