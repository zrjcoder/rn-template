import { NativeModules } from 'react-native'

const { CalendarModule } = NativeModules

interface CalendarInterface {
  createCalendarEvent(name: string, location: string): void
}

const CalendarModuleTyped = CalendarModule as CalendarInterface
export { CalendarModuleTyped as CalendarModule }
