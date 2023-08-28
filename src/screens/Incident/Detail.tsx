import React from 'react'
import { ScrollView } from 'native-base'

import { TCard, InfoReport, CaseProcess } from '@/components/home'
import { InfoBox } from '@/components'

const info = {
  type: '警情类型',
  level: '警情等级',
  label: '标        签',
  jurisdiction: '所属辖区',
  subdivision: '所属分局',
  report: '报  警  人',
  tel: '报警电话',
  date: '报警时间',
  address: '案发地址',
  desc: '报警描述',
  feedback: '反馈内容',
}

const data = {
  type: '扬言伤人',
  level: '二级',
  label: '暂无标签',
  jurisdiction: '虎山派出所',
  subdivision: '集宁区派出所',
  report: '张三',
  tel: '15623235213',
  date: '2022-12-14 10:20:30',
  address: '乌兰察布市集宁区察哈尔西街与工农南路辅路交叉路口往西南约280米',
  desc: '在集宁区哈尔西街与工农南路辅路交叉路，有人扬言要伤害他人。目前无人员受伤，请求出警',
  feedback: '到达现场已经处理完成，当面进行调解，双方无意见',
}

export function Detail() {
  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      <TCard title="案件信息">
        <InfoReport />
        <InfoBox data={data} info={info} />
      </TCard>

      <TCard title="出警流程">
        <CaseProcess />
      </TCard>
    </ScrollView>
  )
}
