const item = {
  id: 1,
  report: '张三',
  recType: '扬言伤人',
  desc: '在集宁区哈尔西街与工农南路辅路交叉路，有人扬言要伤害他人。目前无人员受伤，请求出警',
  tel: '15623236209',
  date: '2022-12-14 10:20:23',
  address: '集宁区公安局',
  recAddress: '乌兰察布市集宁区察哈尔西街与工农南路辅路交叉路口往西南约280米',
  reportAddress: '乌兰察布市集宁区察哈尔西街与工农南路辅路交叉路口往西南约280米',
}

export const getItems = () => {
  // delay return data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          ...item,
          id: 1,
        },
        {
          ...item,
          id: 2,
        },
        {
          ...item,
          id: 3,
        },
        {
          ...item,
          id: 4,
        },
        {
          ...item,
          id: 5,
        },
      ])
    }, 1000)
  })
}

export const getHistoryItems = () => {
  const item = {
    title: '扬言伤人',
    address: '集宁区公安局',
    date: '2022-12-14 10:20:23',
    status: 0,
    completed: false,
    tags: [{ label: '处警规则' }, { label: '周边资源' }],
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          ...item,
          id: 1,
        },
        {
          ...item,
          id: 2,
        },
        {
          ...item,
          id: 3,
        },
      ])
    }, 1000)
  })
}

// export const itemsApi = api.injectEndpoints({
//   endpoints: (build) => ({
//     getItems: build.query({
//       query: () => '/items',
//     }),
//   }),
//   overrideExisting: false,
// })
