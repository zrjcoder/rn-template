import { NativeStackNavigationOptions } from '@react-navigation/native-stack'

export const headerStyles: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#266EFF',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: 20,
  },
  animation: 'slide_from_right',
  presentation: 'card',
}
