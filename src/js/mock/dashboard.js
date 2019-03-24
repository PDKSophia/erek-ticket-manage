/**
 * 仪表盘 mock数据设计
 *
 * @summary Card Mock
 * @author PDK
 *
 * Created at     : 2019-03-23
 * Last modified  : 2019-03-23
 */

const Mock = require('mockjs')

/**
 * @获取平台近Day天的访问量
 * @param {Number} day
 * @return {*}
 */
Mock.mock('/mock/api/dashboard/get-all/access?day=7', () => {
  return {
    code: 1,
    msg: '获取成功',
    data: {
      timeRange: ['01-04', '01-05', '01-06', '01-07', '01-08', '01-09', '01-10'],
      countRange: [0, 100],
      text: '平台日访问量',
      list: [
        {
          text: '平台日访问量',
          data: [45, 32, 75, 72, 33, 62, 56]
        },
        {
          text: '日注册人数',
          data: [25, 52, 32, 79, 52, 41, 32]
        }
      ]
    }
  }
})

/**
 * @获取所有首页的卡片数据
 * @param {Number} day
 * @return {*}
 */
Mock.mock('/mock/api/dashboard/get-all/statistics', () => {
  return {
    code: 1,
    msg: '获取所有首页tab的卡片数据',
    data: [
      {
        text: '使用量',
        value: 131
      },
      {
        text: '下载量',
        value: 382
      },
      {
        text: '围观量',
        value: 89
      },
      {
        text: '推广量',
        value: 225
      }
    ]
  }
})

/**
 * @获取平台来源数据
 * @return {*}
 */
Mock.mock('/mock/api/dashboard/get-all/origin', () => {
  return {
    code: 1,
    msg: '获取站点访问来源数据成功',
    data: [
      { value: 335, name: '直接访问' },
      { value: 310, name: '联盟广告' },
      { value: 234, name: '垃圾邮箱' },
      { value: 135, name: '视频广告' },
      { value: 1548, name: '搜索引擎' }
    ]
  }
})

/**
 * @获取实际开销与预算开销
 * @return {*}
 */
Mock.mock('/mock/api/dashboard/get-all/expense', () => {
  return {
    code: 1,
    msg: '获取预算开销和实际开销成功',
    data: {
      alloccate: {
        name: '预算开销',
        data: [
          { value: 4000, name: '研发部' },
          { value: 3000, name: '编辑部' },
          { value: 3000, name: '运营部' },
          { value: 2500, name: '人力资源部' },
          { value: 2500, name: '视频部' }
        ]
      },
      actual: {
        name: '实际开销',
        data: [
          { value: 8821, name: '研发部' },
          { value: 6761, name: '编辑部' },
          { value: 8865, name: '运营部' },
          { value: 5865, name: '人力资源部' },
          { value: 7612, name: '视频部' }
        ]
      }
    }
  }
})
