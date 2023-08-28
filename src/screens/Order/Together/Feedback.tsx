import React from 'react'
import { Box, ScrollView, VStack, Center } from 'native-base'
import { InfoCard, InfoHeader, TButton } from '@/components/home'

import { Icons, InfoBox, Tag, type DialogHandle } from '@/components'
import { OrderCard, OrderBox, ImageContrast, Reject, Process } from '../components'

export function TogetherFeedback() {
  const dialogRef = React.useRef<DialogHandle>(null)
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Reject ref={dialogRef} />
      <InfoCard
        Header={
          <InfoHeader
            tag="dudu"
            data={{
              text: '信息来源：情指中心',
              title: '火车站有人非正常死亡',
              date: '2022-12-14 10:20:31',
            }}
          />
        }
        Content={
          <VStack>
            <OrderCard title="协助信息" mt={4}>
              <InfoBox
                infoStyle={{
                  mb: 3,
                }}
                isDivider={true}
                data={{
                  explain:
                    '在集宁区哈尔西街与工农南路辅路交叉路，有人扬言要伤害他人。目前无人员受伤，请求出警。',
                  date: '5小时',
                  appendix: <Tag text="查看附件" />,
                }}
                info={{
                  explain: '协助说明',
                  date: '期望时间',
                  appendix: '附件',
                }}
              />
            </OrderCard>

            <OrderCard title="事件信息">
              <InfoBox
                infoStyle={{
                  mb: 3,
                }}
                isDivider={true}
                data={{
                  type: '合成类型',
                  explain:
                    '在集宁区哈尔西街与工农南路辅路交叉路，有人扬言要伤害他人。目前无人员受伤，请求出警。',
                  contact: '关键联系人',
                  tel: '联系电话',
                  relation: '关联方式',
                  address: '事发地点',
                  appendix: '附    件',
                  source: '报送来源',
                  date: '报送事件',
                }}
                info={{
                  type: '非正常死亡',
                  explain: '请求说明',
                  contact: '关键联系人',
                  tel: '联系电话',
                  relation: '关联方式',
                  address: '事发地点',
                  appendix: '附    件',
                  source: '报送来源',
                  date: '报送事件',
                }}
              />
            </OrderCard>

            <OrderCard title="领导批阅" mt={4}>
              <InfoBox
                infoStyle={{
                  mb: 3,
                }}
                isDivider={true}
                data={{
                  leader: '报送领导',
                  explain: '请示说明',
                }}
                info={{
                  leader: '报送领导',
                  explain: '请示说明',
                }}
              />
            </OrderCard>

            <OrderBox
              title={'技侦部门'}
              data={{
                person: '接  收  人',
                explain: '协助说明',
                date: '期望时间',
                appendix: '附件',
              }}
              info={{
                person: '接      收      人',
                explain: '协   助   说  明',
                date: '期望完成时长',
                appendix: '附                 件',
              }}>
              <Center mt={4}>
                <TButton textStyle={{ fontSize: 'sm' }} px={4} theme="alarm">
                  立即批阅
                </TButton>
              </Center>
            </OrderBox>

            <OrderBox
              person={{
                name: '赵红梅',
                gender: '女',
              }}
              data={{
                card: '23023423843342234',
                date: '2023.12.12 10:12:12',
                birth: '1990-01-02',
                native: '内蒙古乌兰察布',
              }}
              info={{
                card: '身份证号',
                date: '预警时间',
                birth: '出生日期',
                native: '籍贯',
              }}
            />

            <ImageContrast />

            <OrderCard title="处置流程" mt={4}>
              <Process status={2} />
            </OrderCard>
          </VStack>
        }
      />

      <Center my={12} flexDirection={'row'}>
        <TButton px={6} theme="alarm">
          立即接警
        </TButton>
        <VStack
          position={'absolute'}
          right={12}
          onTouchStart={() => {
            dialogRef.current?.showDialog()
          }}>
          {Icons.reject}
          <Box
            _text={{
              color: '#266EFF',
            }}>
            驳回
          </Box>
        </VStack>
      </Center>
    </ScrollView>
  )
}
