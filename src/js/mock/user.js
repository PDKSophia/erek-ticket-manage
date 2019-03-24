/**
 * 个人中心 mock数据设计
 *
 * @summary User Mock
 * @author PDK
 *
 * Created at     : 2019-03-23
 * Last modified  : 2019-03-23
 */

const Mock = require('mockjs')

/**
 * @个人中心
 * @获得的徽章
 */
Mock.mock('/mock/api/user/get-badge-list', () => {
  return {
    code: 1,
    msg: '获取成功',
    data: [
      {
        name: '成就值',
        data: [
          { value: 6152, text: '查看量' },
          { value: 4522, text: '下载量' },
          { value: 192761, text: '点击量' }
        ]
      },
      {
        name: '钱包',
        data: [
          { value: 921, text: 'Q币' },
          { value: 773, text: '优惠券' },
          { value: 514, text: '余额' }
        ]
      },
      {
        name: '沸点',
        data: [
          { value: 4481, text: '阅读量' },
          { value: 2741, text: '点赞' },
          { value: 1502, text: '评论' }
        ]
      },
      {
        name: '技能掌握',
        data: [
          { value: 66, text: '前端' },
          { value: 32, text: '后端' },
          { value: 45, text: '其他' }
        ]
      }
    ]
  }
})

/**
 * @个人中心
 * @获取近七日访问量
 */
Mock.mock('/mock/api/user/get-login-7day', () => {
  return {
    code: 1,
    msg: '获取用户近7日登陆数据成功',
    data: {
      timeRange: ['05-11', '05-12', '05-13', '05-14', '05-15', '05-16', '05-17'],
      countRange: [0, 100],
      data: [
        {
          text: '近七日访问量',
          data: [45, 32, 65, 72, 33, 32, 63]
        }
      ]
    }
  }
})
