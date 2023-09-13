import React from 'react'
import { Image, IImageProps } from 'native-base'

export const Icons = {
  avatar: Icon({
    source: require('@/assets/icons/avatar.png'),
  }),
  pwd: Icon({
    source: require('@/assets/icons/pwd.png'),
  }),
  shield: Icon({
    source: require('@/assets/icons/shield.png'),
  }),
  eye: Icon({
    source: require('@/assets/icons/eye.png'),
  }),
  closeEye: Icon({
    source: require('@/assets/icons/closeEye.png'),
  }),
  filter: Icon({
    source: require('@/assets/icons/filter.png'),
  }),
  filterLight: Icon({
    source: require('@/assets/icons/filter-light.png'),
  }),
  key: Icon({
    source: require('@/assets/icons/key.png'),
  }),
  refresh: Icon({
    source: require('@/assets/icons/refresh.png'),
  }),
  feedback: Icon({
    source: require('@/assets/icons/feedback.png'),
  }),
  out: Icon({
    source: require('@/assets/icons/out.png'),
  }),
  right: Icon({
    source: require('@/assets/icons/right.png'),
  }),
  edit: Icon({
    source: require('@/assets/icons/edit.png'),
  }),
  search: Icon({
    source: require('@/assets/icons/search.png'),
    size: '3',
  }),
  reject: Icon({
    source: require('@/assets/icons/reject.png'),
    size: '6',
  }),
  error: Icon({
    source: require('@/assets/icons/error.png'),
    size: '3',
  }),
  close: Icon({
    source: require('@/assets/icons/close.png'),
    size: '3',
  }),
  phone: Icon({
    source: require('@/assets/icons/phone.png'),
    size: '5',
  }),
  head: Icon({
    source: require('@/assets/icons/head.png'),
    size: '10',
  }),
  messageLight: Icon({
    source: require('@/assets/icons/messageLight.png'),
    size: '5',
  }),
}

function Icon({ source, size = 4 }: IImageProps) {
  return <Image source={source} size={size} resizeMode="contain" alt="icon" />
}
