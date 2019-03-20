/**
 * 城市 mock数据设计
 *
 * @summary List Mock
 * @author PDK
 *
 * Created at     : 2019-03-20
 * Last modified  : 2019-03-20
 */

const Mock = require('mockjs')
// 获取 `列表 - 待办任务` 数据
Mock.mock('/api/city/get-status', () => {
  return {
    code: 1,
    msg: '成功获取所有城市',
    list: [
      {
        text: '省会城市',
        value: 12
      },
      {
        text: '全部城市',
        value: 41
      },
      {
        text: '其他城市',
        value: 25
      }
    ]
  }
})

// 获取 `列表 - 标准列表` 数据
Mock.mock('/api/city/get-all', () => {
  return {
    code: 1,
    msg: '获取成功',
    data: {
      current: 1,
      size: 10,
      total: 3,
      list: [
        {
          id: 1,
          city_name: '成都',
          city_desc: '那是一种内在的东西， 他们到达不了，也无法触及的',
          city_status: 1,
          city_cover: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png'
        },
        {
          id: 2,
          city_name: '西安',
          city_desc:
            '土地是以它的肥沃和收获而被估价的；才能也是土地，不过它生产的不是粮食，而是真理。',
          city_status: 1,
          city_cover: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png'
        },
        {
          id: 3,
          city_name: '海口',
          city_desc: '这世界要是没有爱情，它在我们心中还会有什么意义！这就如一盏没有亮光的走马灯',
          city_status: 1,
          city_cover: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png'
        },
        {
          id: 4,
          city_name: '北京',
          city_desc: '这世界要是没有爱情，它在我们心中还会有什么意义！这就如一盏没有亮光的走马灯',
          city_status: 1,
          city_cover: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png'
        },
        {
          id: 5,
          city_name: '上海',
          city_desc: '这世界要是没有爱情，它在我们心中还会有什么意义！这就如一盏没有亮光的走马灯',
          city_status: 1,
          city_cover: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png'
        },
        {
          id: 6,
          city_name: '深圳',
          city_desc: '这世界要是没有爱情，它在我们心中还会有什么意义！这就如一盏没有亮光的走马灯',
          city_status: 1,
          city_cover: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png'
        },
        {
          id: 7,
          city_name: '广州',
          city_desc: '这世界要是没有爱情，它在我们心中还会有什么意义！这就如一盏没有亮光的走马灯',
          city_status: 1,
          city_cover: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png'
        },
        {
          id: 8,
          city_name: '长沙',
          city_desc: '这世界要是没有爱情，它在我们心中还会有什么意义！这就如一盏没有亮光的走马灯',
          city_status: 1,
          city_cover: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png'
        },
        {
          id: 9,
          city_name: '三亚',
          city_desc: '这世界要是没有爱情，它在我们心中还会有什么意义！这就如一盏没有亮光的走马灯',
          city_status: 1,
          city_cover: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png'
        },
        {
          id: 10,
          city_name: '石家庄',
          city_desc: '这世界要是没有爱情，它在我们心中还会有什么意义！这就如一盏没有亮光的走马灯',
          city_status: 1,
          city_cover: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png'
        }
      ]
    }
  }
})
