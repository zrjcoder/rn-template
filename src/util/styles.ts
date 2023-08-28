import { FlexStyle, TextStyle, ViewStyle } from 'react-native'

import {
  level_one_light,
  level_one_dark,
  level_two_light,
  level_two_dark,
  level_three_light,
  level_three_dark,
  level_four_light,
  level_four_dark,
} from './color'

function color(status: number) {
  const themeColors: { [key: number]: string } = {
    0: level_one_light,
    1: level_two_light,
    2: level_three_light,
    3: level_four_light,
  }

  return themeColors[status] || '#FFFFFF'
}

function colors(status: number) {
  const themeColors: { [key: number]: string[] } = {
    0: [level_one_dark, level_one_light],
    1: [level_two_dark, level_two_light],
    2: [level_three_dark, level_three_light],
    3: [level_four_dark, level_four_light, level_four_light],
  }

  return themeColors[status] || ['#FFFFFF']
}

function size(
  height: TextStyle['height'],
  width: TextStyle['width'],
  backgroundColor: TextStyle['backgroundColor'],
  opacity: TextStyle['opacity']
) {
  switch (arguments.length) {
    case 1:
      return {
        height,
        width: height,
      }

    case 2:
      if (isValidSize(width)) {
        return {
          height,
          width,
        }
      } else {
        const b = width
        return {
          height,
          width: height,
          b,
        }
      }

    case 3:
      return {
        height,
        width,
        backgroundColor,
      }
    case 4:
      return {
        height,
        width,
        backgroundColor,
        opacity,
      }

    default:
      return {}
  }

  function isValidSize(value: TextStyle['width']) {
    if (typeof value === 'number') {
      return true
    }
    if (typeof value === 'string') {
      const pattern = /^(\d+(\.\d+)?|\.\d+)%$/
      return pattern.test(value)
    }
    return false
  }
}

function flex(
  flexDirection: FlexStyle['flexDirection'],
  justifyContent: FlexStyle['justifyContent'],
  alignItems: FlexStyle['alignItems']
) {
  return {
    flexDirection,
    justifyContent,
    alignItems,
  }
}

function border(
  borderWidth: TextStyle['borderWidth'],
  borderColor: TextStyle['borderColor'],
  borderRadius: TextStyle['borderRadius']
) {
  return {
    borderWidth,
    borderColor,
    borderRadius,
  }
}

function padding(
  paddingTop: ViewStyle['paddingTop'],
  paddingRight: ViewStyle['paddingRight'],
  paddingBottom: ViewStyle['paddingBottom'],
  paddingLeft: ViewStyle['paddingLeft']
) {
  const paddingHorizontal = paddingTop
  const paddingVertical = paddingRight

  switch (arguments.length) {
    case 1:
      return {
        padding: paddingTop,
      }

    case 2:
      return {
        paddingHorizontal,
        paddingVertical,
      }

    case 4:
      return {
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
      }

    default:
      return {}
  }
}

function margin(
  marginTop: ViewStyle['paddingTop'],
  marginRight: ViewStyle['marginRight'],
  marginBottom: ViewStyle['marginBottom'],
  marginLeft: ViewStyle['marginLeft']
) {
  const marginHorizontal = marginTop
  const marginVertical = marginRight

  switch (arguments.length) {
    case 1:
      return {
        margin: marginTop,
      }

    case 2:
      return {
        marginHorizontal,
        marginVertical,
      }

    case 4:
      return {
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
      }

    default:
      return {}
  }
}

function font(
  fontSize: TextStyle['fontSize'],
  color: TextStyle['color'],
  fontWeight: TextStyle['fontWeight'],
  textAlign: TextStyle['textAlign']
) {
  return {
    fontSize,
    color,
    fontWeight,
    textAlign,
  }
}

// 绝对定位垂直居中
function positionHorizontal(position: ViewStyle['position']) {
  return {
    position,
    marginLeft: 'auto',
    marginRight: 'auto',
  }
}
// 绝对定位水平居中
function positionVertical(position: ViewStyle['position']) {
  return {
    position,
    marginTop: 'auto',
    marginBottom: 'auto',
  }
}

export {
  size,
  flex,
  border,
  padding,
  margin,
  font,
  positionVertical,
  positionHorizontal,
  color,
  colors,
}
