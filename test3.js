var arr1 = [
  { cityId: 110100, name: '北京', pinyin: 'beijing', isHot: 1 },
  { cityId: 120100, name: '天津', pinyin: 'tianjin', isHot: 0 },
  { cityId: 130100, name: '石家庄', pinyin: 'shijia', isHot: 0 },
  { cityId: 130200, name: '唐山', pinyin: 'tangshan', isHot: 0 },
  { cityId: 130300, name: '秦皇岛', pinyin: 'qinhuang', isHot: 0 }
]

var arr2 = [
  {
    py: 'A',
    list: [
      {
        name: 'A1'
      },
      {
        name: 'A2'
      }
    ]
  },
  {
    py: 'B',
    list: [
      {
        name: 'B1'
      },
      {
        name: 'B2'
      }
    ]
  }
]

var result = []

arr1.forEach(item => {
  // 1. 取出当前城市的拼音首字母的大写
  let py = item.pinyin.charAt(0).toUpperCase()
  // 2. 找出result中有没有某个项，他的py为这里的py的对象
  let index = result.findIndex(a => a.py === py)
  // 3. 判断
  if (index > -1) {
    // 找到了
    result[index].list.push(item)
  } else {
    // 没找到
    // 构建一个 包含 py 与 list 的对象 {py: 'B', list: [item]}
    let obj = {
      py,
      list: [item]
    }

    result.push(obj)
  }
})

console
  .log(result)

  [('A', 'B', 'C')].sort(() => {})
