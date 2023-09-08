export function convertIncidentDataToShow(item: any) {
  if (item) {
    return {
      recType: item?.jqlxdm ?? '', // 警情类型
      // tag: item?. ?? '', // 警情 tag
      address: item?.fjdw ?? '', // 派出所
      date: item?.bjsj ?? '', // 接警时间

      name: item?.bjrmc ?? '', // 报警人
      desc: item?.bjnr ?? '', // 报警内容
      tel: item?.bjdh ?? '', // 报警电话
      recAddress: item?.gxdwdm ?? '', // 接警地址
      reportAddress: item?.jqdz ?? '', // 报警人定位

      type: item?.jqlxdm ?? '',
      level: TaskLevel?.[item?.jqdjdm]?.label ?? '', // 警情等级
      label: item?.bjjbdm ?? '暂无标签',
      jurisdiction: item?.gxdwdm, // 所属辖区
      subdivision: item?.fjdw, // 所属分局
      feedback: item?.bjjbdm, // 反馈内容
    }
  }

  return {}
}

export function orderTagFromType(type: 'warn' | 'escapee') {
  if (type === 'escapee') {
    return {
      tag: '在逃人员预警',
      title: '在逃人员',
      rightTag: {
        label: '在逃人员',
        color: '#FA2001',
      },
    }
  } else if (type === 'warn') {
    return {
      tag: '重点人员预警',
      title: '重点人员',
      rightTag: {
        label: '重点人员',
        color: '#FB7904',
      },
    }
  } else if (type === 'compose') {
    return {
      tag: '合成作战',
      title: '标题',
      rightTag: {
        label: '紧急',
        color: '#FA2001',
      },
    }
  }
  return {}
}

export const TaskLevel: any = {
  '01': {
    label: '一级',
    code: 0,
  },
  '02': {
    label: '二级',
    code: 1,
  },
  '03': {
    label: '三级',
    code: 2,
  },
  '04': {
    label: '四级',
    code: 3,
  },
}
