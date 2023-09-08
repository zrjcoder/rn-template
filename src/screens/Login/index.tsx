import React from 'react'
import {
  Box,
  VStack,
  Input,
  Image,
  Pressable,
  Button,
  Divider,
  IInputProps,
} from 'native-base'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { RootStackScreenProps } from '@/navigators/types'
import { setToken, setUserInfo } from '@/store/user'
import { Card, Icons, Toast } from '@/components'
import { useAuthorizeMutation, useGetUserInfoMutation } from '@/services'
import { safeFetch } from '@/util'
export function Login() {
  const navigation = useNavigation<RootStackScreenProps<'Login'>>()

  const [showPwd, setShowPwd] = React.useState(false)
  const [state, setState] = React.useState({
    userName: 'admin',
    userPsw: '123456',
  })

  const [authorize, { isLoading }] = useAuthorizeMutation()
  const [getUserInfo] = useGetUserInfoMutation()
  const dispatch = useDispatch()

  return (
    <Box flex={1} bg={'#F6F7F9'}>
      <Image
        source={require('@/assets/images/login-bg.png')}
        size={260}
        width={'100%'}
        position={'absolute'}
        alt="logo"
      />

      <VStack justifyContent="center" alignItems="center">
        <Box
          marginTop={12}
          _text={{
            fontSize: '2xl',
            fontWeight: 'bold',
            color: 'white',
          }}>
          登录
        </Box>
        <Image
          marginTop={12}
          source={require('@/assets/images/login-head.png')}
          alt="logo"
          size="xl"
          resizeMode="contain"
        />
        <Card>
          <IconInput
            value={state.userName}
            InputLeftElement={Icons.avatar}
            placeholder="请输入账号"
            onChangeText={(text) => {
              setState({ ...state, userName: text })
            }}
          />
          <Divider />
          <IconInput
            value={state.userPsw}
            type={showPwd ? 'text' : 'password'}
            InputLeftElement={Icons.pwd}
            InputRightElement={
              <Pressable
                borderRadius={4}
                _pressed={{
                  bg: '#DBEAFE',
                }}
                padding={2}
                onPress={() => setShowPwd(!showPwd)}>
                {showPwd ? (
                  <Box>{Icons.eye}</Box>
                ) : (
                  <Image
                    source={require('@/assets/icons/closeEye.png')}
                    size="4"
                    resizeMode="contain"
                    alt="icon"
                  />
                )}
              </Pressable>
            }
            placeholder="请输入密码"
            onChangeText={(text) => {
              setState({ ...state, userPsw: text })
            }}
          />
          <Divider />

          {/* <IconInput
            InputLeftElement={Icons.shield}
            placeholder="请输入验证码"
            onChangeText={() => {}}
          /> */}
        </Card>

        <Box width={'full'} paddingX={4} mt={8}>
          <Button
            isLoading={isLoading}
            isLoadingText="登录中..."
            onPress={handleLogin}
            bg={'#0E72F9'}
            borderRadius={'full'}
            _pressed={{
              bg: '#8ab2e6',
            }}>
            登录
          </Button>
        </Box>
      </VStack>

      {/* <HStack
        width={'100%'}
        position={'absolute'}
        bottom={10}
        justifyContent={'center'}
        alignContent={'center'}>
        <Text color={'#999999'}>忘记密码？</Text>
        <Link
          _text={{
            color: 'blue.600',
          }}>
          找回密码
        </Link>
      </HStack> */}
    </Box>
  )

  async function handleLogin() {
    if (!state.userName) {
      Toast.error('请输入账号')
      return
    } else if (!state.userPsw) {
      Toast.error('请输入密码')
      return
    }

    const { isSuccess, data } = await safeFetch(authorize, {
      userName: state.userName,
      userPsw: state.userPsw,
      verCode: '',
    })

    const { value: token } = data

    if (isSuccess && token) {
      dispatch(setToken(token))

      getUserInfo({
        userName: 'admin',
      }).then((res: any) => {
        const { data, resCode } = res.data

        if (resCode === '00000') {
          dispatch(
            setUserInfo({
              userName: data?.userInfos[0]?.userName,
              userId: data?.userInfos[0]?.gid,
              nickName: data?.userInfos[0]?.nickName, // 姓名
              orgName: data?.userOrgInfos[0]?.fullName, // 公安局名、所在单位
              orgGid: data?.userOrgInfos[0]?.orgGid, // 警号
              tel: '暂无', // 电话号码
              position: '暂无', // 职位
            })
          )
        }
      })

      navigation.navigate('MainTabs', { screen: 'Home' })
    }
  }
}

function IconInput(props: IInputProps) {
  return (
    <Input
      w={'100%'}
      variant={'unstyled'}
      style={{ marginLeft: -4 }}
      marginY={3}
      color="muted.900"
      placeholder="请输入"
      {...props}
    />
  )
}
