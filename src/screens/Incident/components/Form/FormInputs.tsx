import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { Box, IInputProps } from 'native-base'

import { FormInput } from '@/components'

export type FormInputsProps = {
  data: {
    [key: string]: string
  }
} & IInputProps

export type FormInputsHandle = {
  values: {
    [key: string]: string
  }
  setValues: (values: { [key: string]: string }) => void
  isEmpty: () => boolean
  getHeight: () => number
}

export const FormInputs = forwardRef<FormInputsHandle, FormInputsProps>(
  ({ data, ...props }, ref) => {
    const [state, setState] = useState(initState(data))
    const height = 44

    useImperativeHandle(ref, () => ({
      values: state,
      setValues: (values) => {
        setState(values)
      },
      isEmpty: () => {
        const regex = /^\s*$/
        for (const key in state) {
          if (regex.test(state[key])) {
            return true
          }
        }
        return false
      },
      // 根据state长度来乘以高度，获取总高
      getHeight: () => {
        return Object.keys(state).length * height
      },
    }))

    return (
      <Box>
        {Object.keys(data).map((key, index) => (
          <FormInput
            title={data[key]}
            key={key}
            height={`${height}px` as any}
            variant={index === Object.keys(data).length - 1 ? 'unstyled' : 'underlined'}
            placeholder={`请输入${data[key].replace(/\s/g, '')}`}
            value={state[key]}
            onChangeText={(text) => {
              setState({
                ...state,
                [key]: text,
              })
            }}
            {...props}
          />
        ))}
      </Box>
    )
  }
)

function initState(data: { [key: string]: string }) {
  const emptyData: { [key: string]: string } = {}

  for (const key in data) {
    emptyData[key] = ''
  }

  return emptyData
}
