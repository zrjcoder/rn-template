import {
  Profile,
  Password,
  Update,
  Car,
  Idcard,
  Feedback,
  Contact,
  Filter,
} from '@/screens'
import { UserInfoProps } from '@/store/user'

export const myTabs = [
  {
    name: 'Profile',
    component: Profile,
    options: {
      headerTitle: '个人信息',
    },
  },
  {
    name: 'Contact',
    component: Contact,
    options: {
      headerTitle: '警务通讯录',
    },
  },
  {
    name: 'Idcard',
    component: Idcard,
    options: {
      headerTitle: '身份证识别',
    },
  },
  {
    name: 'Car',
    component: Car,
    options: {
      headerTitle: '车辆查询',
    },
  },
  {
    name: 'Filter',
    component: Filter,
    options: {
      headerTitle: '消息过滤器',
    },
  },
  {
    name: 'Password',
    component: Password,
    options: {
      headerTitle: '修改密码',
    },
  },
  {
    name: 'Update',
    component: Update,
    options: {
      headerTitle: '检查更新',
    },
  },
  {
    name: 'Feedback',
    component: Feedback,
    options: {
      headerTitle: '意见更新',
    },
  },
]

// 警情模块下页面路由
export type MyTabsParamList = {
  Profile: UserInfoProps
  Password: undefined
  Update: undefined
  Car: undefined
  Idcard: undefined
  Feedback: undefined
  Contact: undefined
  Filter: { callback: () => void }
}
