import React from 'react'
import { styled } from '../stitches.config'
import { ArrowDropDown } from '@styled-icons/remix-line'

const SelectContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  border: '1px solid $borderPrimary',
  borderRadius: '6px',
  padding: '0.25em 0.5em 0.25em 1em',

  '&:hover': {
    backgroundColor: '$bgSecondary',
    borderColor: '$borderSecondary',
  },

  '> svg': {
    width: '24px',
    color: '$textPrimary',
  },
})

const CustomSelect = styled('select', {
  appearance: 'none',
  background: 'unset',
  border: 'unset',
  fontSize: '12px',
  color: '$textPrimary',

  '&:focus': {
    outline: 'unset',
  },
})

export default function Select(props) {
  const { options, defaultSelected, callback } = props

  return (
    <SelectContainer>
      <CustomSelect
        onChange={(e) => callback(e.target.value)}
        value={defaultSelected}
      >
        {options.map((option) => {
          return (
            <option key={option.name} value={option.name}>
              {option.label}
            </option>
          )
        })}
      </CustomSelect>
      <ArrowDropDown />
    </SelectContainer>
  )
}
