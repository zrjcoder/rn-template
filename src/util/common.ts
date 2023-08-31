/* eslint-disable radix */

import { Toast } from '@/components'
import { PermissionsAndroid, type Permission } from 'react-native'

export async function permission(permissions: Permission[]) {
  await PermissionsAndroid.requestMultiple(permissions)
}

export function generateRandomFileName() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let fileName = ''

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    fileName += chars.charAt(randomIndex)
  }

  return fileName
}

// 根据出生日期计算年龄，如'20010915'
export function calculateAge(birthday: String) {
  if (typeof birthday !== 'string' && birthday?.length < 8) {
    return ''
  }

  const currentDate = new Date() // 获取当前日期对象
  const yearToday = currentDate.getFullYear() // 当前年份

  const birthYear = parseInt(birthday.substr(0, 4)) // 提取出生日期的年份
  const birthMonth = parseInt(birthday.substr(4, 2)) - 1 // 提取出生日期的月份（需要将月份减去1，因为月份在Date对象中是从0开始的）
  const birthDay = parseInt(birthday.substr(6, 2)) // 提取出生日期的日期

  // 计算年龄差异
  let age = yearToday - birthYear

  // 检查当前日期是否已过出生日期
  if (
    currentDate.getMonth() < birthMonth ||
    (currentDate.getMonth() === birthMonth && currentDate.getDate() < birthDay)
  ) {
    age--
  }

  return age
}

export function convertTimeToSeconds(time: string) {
  if (!time) {
    return 0
  }
  const [minutes, seconds, milliseconds] = time.split(':').map(Number)

  const totalSeconds = Math.ceil(minutes * 60 + seconds + milliseconds / 1000)

  return totalSeconds
}

export function executeAfterDelay(callback: () => void, delayMs: number = 3000): void {
  setTimeout(callback, delayMs)
}

export async function safeFetch(
  func: (params: any) => Promise<any>,
  params: any
): Promise<any> {
  try {
    const result: any = await func(params)
    // Toast.error(JSON.stringify(result))

    if (result?.data?.resCode === '00000') {
      return {
        isSuccess: true,
        data: result?.data?.data,
      }
    } else {
      Toast.error(result?.data?.resMsg)
      return {
        isSuccess: false,
        data: null,
      }
    }
  } catch {
    Toast.error('出错了请联系管理员！')
  }
}
