import { Linking, NativeModules } from 'react-native'

const { CommonModule } = NativeModules

export function makePhoneCall(phoneNumber: string) {
  const url = `tel:${phoneNumber}`
  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        console.error(`Can't handle url: ${url}`)
      } else {
        return Linking.openURL(url)
      }
    })
    .catch((error) => console.error('An error occurred:', error))
}

export function makePhoneSMS(phoneNumber: string) {
  CommonModule.openSMS(phoneNumber)
}
