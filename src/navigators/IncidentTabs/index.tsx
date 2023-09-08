import { Scene, Case, Detail } from '@/screens'

export const incidentTabs = [
  {
    name: 'Scene',
    component: Scene,
    options: {
      headerTitle: '出警中',
    },
  },
  {
    name: 'Case',
    component: Case,
    options: {
      headerTitle: '案件处置',
    },
  },
  {
    name: 'Detail',
    component: Detail,
    options: {
      headerTitle: '警情详情',
    },
  },
]

// 警情模块下页面路由
export type IncidentTabsParamList = {
  Scene: { data: any; refresh?: () => void }
  Case: { data: any }
  Detail: { data: any }
}
