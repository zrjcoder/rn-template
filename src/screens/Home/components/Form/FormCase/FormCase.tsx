import React, { useRef, forwardRef, useImperativeHandle } from 'react'

import { FormInputs, type FormInputsHandle } from '../index'
import { TabView } from '@/components/home'

export type FormCaseHandle = {
  values: {
    [key: string]: string
  }
  isEmpty: () => boolean
}

export const FormCase = forwardRef<FormCaseHandle>(({}, ref) => {
  const carInfoRef = useRef<FormInputsHandle>(null)
  const personInfoRef = useRef<FormInputsHandle>(null)

  useImperativeHandle(ref, () => ({
    values: {
      ...personInfoRef.current?.values,
      ...carInfoRef.current?.values,
    },
    isEmpty: () => {
      return Boolean(personInfoRef.current?.isEmpty() || carInfoRef.current?.isEmpty())
    },
  }))

  return (
    <TabView
      mx={3}
      mt={3}
      pagerStyle={{
        marginHorizontal: 12,
      }}
      onLoad={({ setTabs }) => {
        const tabs = [
          {
            height: personInfoRef.current?.getHeight(),
            tabBarButton: {
              text: '身份证识别',
              onPress: () => {
                console.log(personInfoRef.current, carInfoRef.current)
              },
              source: require('@/assets/icons/scan.png'),
            },
          },
          {
            height: carInfoRef.current?.getHeight() ?? personInfoRef.current?.getHeight(),
          },
        ]
        setTabs(tabs)
      }}
      routeScene={[
        { key: 'page1', title: '涉案人信息' },
        { key: 'page2', title: '涉案车辆信息' },
      ]}
      renderScene={({ route }) => {
        switch (route.key) {
          case 'page1':
            return (
              <FormInputs
                data={{
                  name: '姓        名',
                  gender: '性        别',
                  age: '年        龄',
                  idCardNumber: '身份证号',
                  address: '居住地址',
                }}
                ref={personInfoRef}
              />
            )
          case 'page2':
            return (
              <FormInputs
                data={{
                  name: '车主姓名',
                  code: '车  牌  号',
                }}
                ref={carInfoRef}
              />
            )
          default:
            return null
        }
      }}
    />
  )
})
