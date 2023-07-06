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
    <Box mt={4}>
      <TextArea
        h={100}
        bg={'#F7F8FA'}
        autoCompleteType={false}
        onChangeText={(result) => {
          setText(result)
        }}
        {...props}
      />
    </Box>
  )
})
