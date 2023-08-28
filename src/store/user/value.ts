export const MessageTypes: MessageTypeProps[] = [
  {
    code: 'unread',
    value: '未读',
    type: 'item',
    isShow: true,
  },
  {
    code: 'read',
    value: '已读',
    type: 'item',
    isShow: true,
  },
  {
    code: 'case',
    value: '警情',
    type: 'item',
    isShow: true,
  },
  {
    code: 'warn',
    value: '重点人员',
    type: 'item',
    isShow: true,
  },
  {
    code: 'compose',
    value: '合成作战',
    type: 'item',
    isShow: true,
  },
  {
    code: 'escapee',
    value: '在逃人员',
    type: 'item',
    isShow: true,
  },
  {
    code: 'hide',
    value: '隐藏',
    type: 'title',
    isShow: true,
  },
]

export type MessageTypesProps = MessageTypeProps[]

export type MessageTypeProps = {
  code: 'unread' | 'read' | 'case' | 'warn' | 'compose' | 'escapee' | 'hide' | 'all'

  value: String
  type: 'item' | 'title'
  isShow: boolean
}
