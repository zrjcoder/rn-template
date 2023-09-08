import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { HStack, VStack } from 'native-base'

import {
  FormCase,
  FormCaseHandle,
  type CasePeopleProps,
  type CaseCarProps,
} from './FormCase'
import { TButton } from '@/components/home'
import { Toast } from '@/components'

export type FormCasesHandle = {
  getValues: () => {
    carList: CaseCarProps[]
    peopleList: CasePeopleProps[]
  }
  isEmpty: () => boolean
}

export const FormCases = forwardRef(({}, ref) => {
  const [count, setCount] = useState(1)

  const formCaseRefs = useRef<Array<React.RefObject<FormCaseHandle>>>([
    useRef<FormCaseHandle>(null),
    useRef<FormCaseHandle>(null),
    useRef<FormCaseHandle>(null),
    useRef<FormCaseHandle>(null),
    useRef<FormCaseHandle>(null),
    useRef<FormCaseHandle>(null),
    useRef<FormCaseHandle>(null),
    useRef<FormCaseHandle>(null),
  ])

  useImperativeHandle(ref, () => ({
    getValues: () => {
      const carList = [] as any
      const peopleList = [] as any

      getFormCases().map((item) => {
        const values = item.current?.getValues()

        carList.push(values?.car)
        peopleList.push(values?.people)
      })

      return { carList, peopleList }
    },
    isEmpty: () => {
      return getFormCases().some((item) => {
        if (item.current?.isEmpty()) {
          Toast.error('涉案人和车辆信息不能为空！')
          return false
        }

        return true
      })
    },
  }))

  return (
    <VStack>
      {getFormCases().map((formCaseRef, index) => (
        <FormCase key={index} ref={formCaseRef} />
      ))}

      <HStack justifyContent={'center'} mt={4}>
        <TButton
          mr={16}
          w={'80px'}
          theme="primary"
          onPress={() => {
            addFormCases()
          }}>
          添加
        </TButton>
        <TButton
          w={'80px'}
          theme="alarm"
          onPress={() => {
            removeFormCases()
          }}>
          删除
        </TButton>
      </HStack>
    </VStack>
  )

  function getFormCases() {
    return formCaseRefs.current.slice(0, count)
  }

  function addFormCases() {
    const currentCount = count + 1
    if (currentCount > formCaseRefs.current.length) {
      return formCaseRefs.current.slice(count)
    } else {
      setCount(currentCount)
      return formCaseRefs.current.slice(currentCount)
    }
  }

  function removeFormCases() {
    const currentCount = count - 1
    if (currentCount > 0) {
      setCount(currentCount)
      return formCaseRefs.current.slice(currentCount)
    } else {
      return formCaseRefs.current.slice(count)
    }
  }
})
