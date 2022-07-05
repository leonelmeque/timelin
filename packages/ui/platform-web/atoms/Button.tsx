import React, { ComponentPropsWithoutRef } from 'react'
import styled from 'styled-components'
import { _sizes, _variants } from '../../shared/commonStyles/button'
import { CommonButtonProps } from '../../shared/types'

type Props = CommonButtonProps<typeof _variants, typeof _sizes> &
  ComponentPropsWithoutRef<'button'>

const _Button = ({ className, label, ...rest }: Props) => (
  <button type="button" className={className} {...rest}>
    {label}
  </button>
)

const Button = styled(_Button)<Omit<Props, 'label'>>`
  all: unset;
  ${(props) => _variants[props.variant]};
  ${(props) => _sizes[props.size]};
  color: white;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background: #ba7da2dd;
  }
`

export default Button
