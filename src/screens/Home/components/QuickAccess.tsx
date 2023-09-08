import React from 'react'
import { Box, HStack, VStack, Image } from 'native-base'
import { TouchableNativeFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export function QuickAccess() {
  const navigation = useNavigation<any>()

  return (
    <VStack mx={2}>
      <Box
        mb={3}
        _text={{
          bold: true,
          fontSize: 'md',
        }}>
        快捷入口
      </Box>

      <HStack>
        <Item
          title={'警情任务'}
          content={'各类警情任务事项'}
          imgSource={require('@/assets/images/home-incident.png')}
          onPress={() => {
            navigation.navigate('MainTabs', {
              screen: 'Incident',
            })
          }}
        />
        <Item
          title={'通讯录'}
          content={'各类警情任务事项'}
          imgSource={require('@/assets/images/home-contact.png')}
          onPress={() => {
            navigation.navigate('Contact')
          }}
        />
      </HStack>

      <HStack>
        <Item
          title={'指令中心'}
          content={'各类警情任务事项'}
          imgSource={require('@/assets/images/home-order.png')}
          onPress={() => {
            navigation.navigate('MainTabs', {
              screen: 'Order',
            })
          }}
        />
        <Item
          title={'消息通知'}
          content={'各类警情任务事项'}
          imgSource={require('@/assets/images/home-message.png')}
          onPress={() => {
            navigation.navigate('Message')
          }}
        />
      </HStack>
    </VStack>
  )
}

function Item({
  title,
  content,
  imgSource,
  onPress,
}: {
  title: string
  content: string
  imgSource: any
  onPress: () => void
}) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <HStack
        bg={'#FFFFFF'}
        flex={1}
        borderRadius={4}
        mr={2}
        mb={2}
        alignItems={'center'}>
        <Image mx={1} source={imgSource} size={'40px'} resizeMode="contain" alt="icon" />

        <VStack h={'60px'} justifyContent={'center'}>
          <Box
            _text={{
              bold: true,
              color: '#333333',
            }}>
            {title}
          </Box>

          <HStack>
            <Box
              _text={{
                fontSize: 'xs',
                color: '#999999',
              }}>
              {content}
            </Box>
          </HStack>
        </VStack>
      </HStack>
    </TouchableNativeFeedback>
  )
}
