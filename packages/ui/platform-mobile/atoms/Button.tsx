import React from 'react'
import { Pressable, PressableProps, Text } from 'react-native'
import styled from 'styled-components/native'
import { _sizes, _variants } from '../../shared/commonStyles/button'
import { CommonButtonProps } from '../../shared/types'

type Props = CommonButtonProps<typeof _variants, typeof _sizes> & PressableProps

const Label = styled(Text)`
  color: white;
  font-weight: bold;
`

function StyledButton({ label, style, ...rest }: Props) {
  return (
    <Pressable style={style} {...rest}>
      <Label>{label}</Label>
    </Pressable>
  )
}

const Button = styled(StyledButton)<Omit<Props, 'label'>>`
  all: unset;
  ${(props) => _variants[props.variant]};
  ${(props) => _sizes[props.size]};
  cursor: pointer;
  &:hover {
    background: #ba7da2dd;
  }
`

export default Button
