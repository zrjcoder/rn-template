import React, { useRef, forwardRef, useImperativeHandle } from 'react'

import { FormInputs, type FormInputsHandle } from '../index'
import { TabView } from '@/components/home'

export type CaseCarProps = {
  carBelongName: string
  carNo: string
}
export type CasePeopleProps = {
  address: string
  age: number
  idCard: string
  name: string
  sex: string
}

export type FormCaseHandle = {
  getValues: () => {
    car: CaseCarProps
    people: CasePeopleProps
  }
  isEmpty: () => boolean
}

export const FormCase = forwardRef<FormCaseHandle>(({}, ref) => {
  const carInfoRef = useRef<FormInputsHandle>(null)
  const personInfoRef = useRef<FormInputsHandle>(null)

  useImperativeHandle(ref, () => ({
    getValues: () => {
      return {
        car: carInfoRef.current?.values as CaseCarProps,
        people: personInfoRef.current?.values as CasePeopleProps,
      }
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
                  sex: '性        别',
                  age: '年        龄',
                  idCard: '身份证号',
                  address: '居住地址',
                }}
                ref={personInfoRef}
              />
            )
          case 'page2':
            return (
              <FormInputs
                data={{
                  carBelongName: '车主姓名',
                  carNo: '车  牌  号',
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
