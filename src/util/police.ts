export function convertIncidentDataToShow(item: any) {
  if (item) {
    const jjdbGab = item?.jjdbGab ?? {}

    return {
      recType: jjdbGab?.jqlxdm ?? '', // 警情类型
      // tag: jjdbGab?. ?? '', // 警情 tag
      address: jjdbGab?.fjdw ?? '', // 派出所
      date: jjdbGab?.bjsj ?? '', // 接警时间

      name: jjdbGab?.bjrmc ?? '', // 报警人
      desc: jjdbGab?.bjnr ?? '', // 报警内容
      tel: jjdbGab?.bjdh ?? '', // 报警电话
      recAddress: jjdbGab?.gxdwdm ?? '', // 接警地址
      reportAddress: jjdbGab?.jqdz ?? '', // 报警人定位
    }
  }

  return {}
}
