import React from 'react'
import {
  Toast as ToastBase,
  Stack,
  Alert,
  VStack,
  HStack,
  Text,
  IconButton,
  CloseIcon,
  Collapse,
} from 'native-base'

type statusProps = 'success' | 'error' | 'info' | 'warning'

export const Toast = {
  show: (title: string, status: statusProps = 'info') => {
    ToastBase.show({
      placement: 'top',
      render: () => <CustomAlert title={title} status={status} />,
    })
  },
  success: (title: string) => Toast.show(title, 'success'),
  error: (title: string) => Toast.show(title, 'error'),
  info: (title: string) => Toast.show(title, 'info'),
  warning: (title: string) => Toast.show(title, 'warning'),
}

type CustomAlertProps = {
  title: string
  status: statusProps
}

function CustomAlert({ title, status }: CustomAlertProps) {
  const [show, setShow] = React.useState(true)

  return (
    <Stack w="100%" alignItems="center">
      <Collapse isOpen={show}>
        <Alert w="100%" status={status}>
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  {title}
                </Text>
              </HStack>
              <IconButton
                onPress={() => setShow(false)}
                variant="unstyled"
                _focus={{
                  borderWidth: 0,
                }}
                icon={<CloseIcon size="3" />}
                _icon={{
                  color: 'coolGray.600',
                }}
              />
            </HStack>
          </VStack>
        </Alert>
      </Collapse>
    </Stack>
  )
}
