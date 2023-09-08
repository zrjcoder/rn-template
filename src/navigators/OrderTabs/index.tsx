import {
  TogetherAgainFeedback,
  TogetherRead,
  TogetherReceive,
  TogetherFeedback,
  RunFeedback,
  RunReceive,
  WarningFeedback,
  WarningReceive,
  PersonnelFeedback,
  PersonnelReceive,
} from '@/screens'

export const orderTabs = [
  {
    name: 'TogetherAgainFeedback',
    component: TogetherAgainFeedback,
    options: {
      headerTitle: '指令详情',
    },
  },
  {
    name: 'TogetherRead',
    component: TogetherRead,
    options: {
      headerTitle: '指令详情',
    },
  },
  {
    name: 'TogetherReceive',
    component: TogetherReceive,
    options: {
      headerTitle: '指令详情',
    },
  },
  {
    name: 'TogetherFeedback',
    component: TogetherFeedback,
    options: {
      headerTitle: '指令详情',
    },
  },
  {
    name: 'PersonnelFeedback',
    component: PersonnelFeedback,
    options: {
      headerTitle: '指令详情',
    },
  },
  {
    name: 'PersonnelReceive',
    component: PersonnelReceive,
    options: {
      headerTitle: '指令详情',
    },
  },
  {
    name: 'WarningFeedback',
    component: WarningFeedback,
    options: {
      headerTitle: '指令详情',
    },
  },
  {
    name: 'WarningReceive',
    component: WarningReceive,
    options: {
      headerTitle: '指令详情',
    },
  },
  {
    name: 'RunFeedback',
    component: RunFeedback,
    options: {
      headerTitle: '指令详情',
    },
  },
  {
    name: 'RunReceive',
    component: RunReceive,
    options: {
      headerTitle: '指令详情',
    },
  },
]

// 指令下页面路由
export type OrderTabsParamList = {
  // 合作作战
  TogetherAgainFeedback: undefined
  TogetherRead: undefined
  TogetherReceive: undefined
  TogetherFeedback: undefined
  // 重点人员
  PersonnelFeedback: { data: any }
  PersonnelReceive: { data: any }
  // 逃跑人员
  RunFeedback: undefined
  RunReceive: undefined
  // 智能预警
  WarningFeedback: undefined
  WarningReceive: undefined
}
