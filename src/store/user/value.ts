export const MessageTypes: MessageTypeProps[] = [
  {
    code: 'Unread',
    value: '未读',
    type: 'item',
    isShow: true,
  },
  {
    code: 'Read',
    value: '已读',
    type: 'item',
    isShow: true,
  },
  // {
  //   code: 'Alarm',
  //   value: '警情',
  //   type: 'item',
  //   isShow: true,
  // },
  // {
  //   code: 'SynthesizedCommand',
  //   value: '合成命令',
  //   type: 'item',
  //   isShow: true,
  // },
  // {
  //   code: 'MeetingNotice',
  //   value: '会议通知',
  //   type: 'item',
  //   isShow: true,
  // },
  // {
  //   code: 'KeyPersonnel',
  //   value: '重点人员',
  //   type: 'item',
  //   isShow: true,
  // },
  // {
  //   code: 'Fugitive',
  //   value: '在逃人员',
  //   type: 'item',
  //   isShow: true,
  // },
  // {
  //   code: 'IntelligentWarning',
  //   value: '智能预警',
  //   type: 'item',
  //   isShow: true,
  // },
  // {
  //   code: 'SynthesizedFeedback',
  //   value: '合成反馈',
  //   type: 'item',
  //   isShow: true,
  // },
  // {
  //   code: 'SynthesizedInstruction',
  //   value: '合成指令',
  //   type: 'item',
  //   isShow: true,
  // },
  // {
  //   code: 'LeadershipApproval',
  //   value: '领导批阅',
  //   type: 'item',
  //   isShow: true,
  // },
  // {
  //   code: 'Hide',
  //   value: '隐藏',
  //   type: 'title',
  //   isShow: true,
  // },
]

export type MessageTypesProps = MessageTypeProps[]

export type MessageTypeProps = {
  code:
    | 'Unread'
    | 'Read'
    | 'Alarm'
    | 'SynthesizedCommand'
    | 'MeetingNotice'
    | 'KeyPersonnel'
    | 'Fugitive'
    | 'IntelligentWarning'
    | 'SynthesizedFeedback'
    | 'SynthesizedInstruction'
    | 'LeadershipApproval'
    | 'Hide'
    | 'All'
  value: String
  type: 'item' | 'title'
  isShow: true
}
