import React, { useState, useImperativeHandle } from 'react'
import { Box, TextArea, ITextAreaProps } from 'native-base'

export type FormTextAreaHandle = {
  getValues: () => string
}

export const FormTextArea = React.forwardRef(({ ...props }: ITextAreaProps, ref) => {
  const [text, setText] = useState('')

  useImperativeHandle(ref, () => ({
    getValues: () => {
      return text
    },
  }))

  return (
    <Box>
      <TextArea
        h={100}
        bg={'#F6F7F9'}
        placeholder="请输入"
        borderWidth={0}
        autoCompleteType={false}
        onChangeText={(result) => {
          setText(result)
        }}
        {...props}
      />
    </Box>
  )
})
