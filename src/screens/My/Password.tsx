import React from 'react'
import { Center } from 'native-base'
import { Card, FormInput, type FormInputProps } from '@/components'
import { TButton } from '../Incident/components'
import { useNavigation } from '@react-navigation/native'

export function Password() {
  const navigation = useNavigation()
  return (
    <Center>
      <Card pb={2}>
        <PasswordInput title={'旧  密  码'} placeholder={'请输入旧密码'} />
        <PasswordInput title={'新  密  码'} placeholder={'请输入新密码'} />
        <PasswordInput title={'确认密码'} placeholder={'请重新输入一遍新密码'} />
      </Card>

      <TButton mt={12} theme="primary" w={'40%'} onPress={() => {}}>
        提交
      </TButton>
    </Center>
  )
}

function PasswordInput(props: FormInputProps) {
  return <FormInput type={'password'} {...props} style={{ paddingVertical: 8 }} />
}
