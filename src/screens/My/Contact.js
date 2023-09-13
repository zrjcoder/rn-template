/* eslint-disable no-shadow */
import React, { useState, useEffect, useRef } from 'react'
import { Box } from 'native-base'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SectionList,
  StatusBar,
} from 'react-native'
import { flex, font, padding, margin } from '@/util/styles'

import { useGetAddressBookQuery } from '@/services'
import { ContactItem } from './components'
import { SearchBar } from '@/components'

export function Contact() {
  const [state, setState] = useState({
    sections: [],
    letterArr: [], // 首字母数组
  })
  const [keywords, setKeywords] = useState('')

  const sectionRef = useRef(null)

  const { data } = useGetAddressBookQuery({})

  React.useEffect(() => {
    initSectionListData(data?.data ?? [])
  }, [data])

  return (
    <View style={styles.container}>
      {/* <Box bg={'#FFFFFF'} px={3} py={2}>
        <SearchBar onChangeText={setKeywords} />
      </Box> */}
      <View style={styles.box}>
        {/* 分组列表 */}
        <SectionList
          ref={sectionRef}
          style={{ width: '90%' }}
          renderItem={ContactItem}
          renderSectionHeader={renderSectionHeader}
          showsVerticalScrollIndicator={false}
          sections={state.sections}
          keyExtractor={(item, index) => item + index}
        />

        {/* 右侧字母栏 */}
        <View style={styles.letterBox}>
          {state.letterArr.map((item, index) => (
            <View style={styles.letters} key={item}>
              <TouchableOpacity
                style={styles.letter}
                onPress={() => {
                  handleSectionSelect(index)
                }}>
                <Text style={styles.letterText}>{item}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  )

  // 分组列表头部渲染
  function renderSectionHeader(sectionItem) {
    const { section } = sectionItem
    return (
      <View style={styles.sectionHeader}>
        <Text
          style={{
            color: '#666666',
          }}>
          {section.title}
        </Text>
      </View>
    )
  }

  // 字母关联分组跳转
  function handleSectionSelect(key) {
    sectionRef.current.scrollToLocation({
      itemIndex: 0,
      sectionIndex: key,
      viewOffset: 0,
    })
  }

  // 初始化分组表以及字母索引数据
  function initSectionListData(data) {
    if (!data) {
      return
    }

    // 右侧字母栏数据处理
    const letterArr = data?.reduce((letterArr, item) => {
      const firstValue = item?.firstValue?.toUpperCase()

      // 首字母是 a-z 的字母
      if (firstValue.search(/^[a-z]/i) === 0) {
        letterArr.push(firstValue)
      } else {
        letterArr.push('#')
      }
      return [...new Set(letterArr)].sort()
    }, [])

    const sections = []

    // 每个首字母对应一个数据列表
    // [ { title: 'a', data: [...] }, { title: 'b', data: [...] } ]
    letterArr.map((letter) => {
      sections.push({
        title: letter,
        data: [],
      })
    })

    // 创建分组列表，将数据对应到相应的首字母列表上去
    data.map((item) => {
      const listItem = item
      sections.map((item) => {
        if (item.title === listItem?.firstValue?.toUpperCase()) {
          item.data.push({ ...listItem })
        } else {
          // 如果首字母不是a-z，分配到 #
          listItem.firstValue?.search(/^[a-z]/i) !== 0 &&
            item.title === '#' &&
            item.data.push({ ...listItem })
        }
      })
    })

    setState({
      letterArr,
      sections,
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F7F8FA',
  },
  searchBar: {
    flexDirection: 'row',
    ...flex('row', 'space-between', 'center'),
    backgroundColor: '#fff',
  },
  item: {
    ...padding(17, 0, 15, 20),
  },
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  title: {
    ...font(16, '#333333', 'bold'),
  },
  times: {
    ...font(12, '#0B69FF'),
  },
  content: {
    ...font(14, '#909090'),
    paddingBottom: 2,
  },
  box: {
    flexDirection: 'row',
    flex: 1,
  },
  letterBox: {
    height: '100%',
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingBottom: StatusBar.currentHeight + 50,
  },
  letters: {
    ...flex(null, 'center', 'center'),
  },
  letterText: {
    ...font(12, '#666666'),
  },
  letter: {
    paddingVertical: 1,
  },
  sectionHeader: {
    ...margin(8, 0, 8, 12),
  },
})
