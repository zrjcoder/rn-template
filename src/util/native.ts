import { Linking } from 'react-native'

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
