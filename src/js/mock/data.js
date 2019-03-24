/**
 * other data
 *
 * @summary other data Mock
 * @author PDK
 *
 * Created at     : 2018-12-05
 * Last modified  : 2019-01-11
 */

const Mock = require('mockjs')

// 获取所有数据信息
Mock.mock('/mock/api/data/getAllData', () => {
  let response = {
    code: 1,
    msg: '获取成功',
    data: [
      {
        id: 1,
        username: '彭道宽',
        staffID: 1982,
        avatar: 'http://college.bczcdn.com/wapp-res/teacher/attachments/Jacob学长咸蛋英语.png',
        department: '研发部',
        type: '负责人',
        status: 'online',
        phone: '189****8869',
        time: 1539670042000
      },
      {
        id: 2,
        username: '懒羊羊',
        staffID: 2938,
        avatar: 'http://college.bczcdn.com/wapp-res/teacher/attachments/Jasmine学姐咸蛋英语.png',
        department: '技术部',
        type: '员工',
        status: 'exit',
        phone: '182****8321',
        time: 1539630042000
      },
      {
        id: 3,
        username: '沸羊羊',
        staffID: 1920,
        avatar: 'http://college.bczcdn.com/wapp-res/teacher/attachments/画板282x.png',
        type: '部长',
        status: 'online',
        phone: '178****8312',
        time: 1539630042000
      },
      {
        id: 4,
        username: '喜洋洋',
        staffID: 1231,
        avatar: 'http://college.bczcdn.com/wapp-res/teacher/attachments/桃子学姐咸蛋英语.png',
        department: '研发部',
        type: '员工',
        status: 'online',
        phone: '182****8321',
        time: 1539630042000
      },
      {
        id: 5,
        username: '美羊羊',
        staffID: 2716,
        avatar: 'http://college.bczcdn.com/wapp-res/teacher/attachments/桃子学姐咸蛋英语.png',
        department: '运营部',
        type: '员工',
        status: 'exit',
        phone: '138****8321',
        time: 1539630042000
      },
      {
        id: 6,
        username: '灰太狼',
        staffID: 4271,
        avatar: 'http://college.bczcdn.com/wapp-res/teacher/attachments/画板282x.png',
        department: '运营部',
        type: '部长',
        status: 'exit',
        phone: '138****8321',
        time: 1539630042000
      },
      {
        id: 7,
        username: '红太狼',
        staffID: 5212,
        avatar: 'http://college.bczcdn.com/wapp-res/teacher/attachments/画板282x.png',
        department: '销售部',
        type: '经理',
        status: 'online',
        phone: '138****8321',
        time: 1539630042000
      },
      {
        id: 8,
        username: '哆啦A梦',
        staffID: 7612,
        avatar: 'http://college.bczcdn.com/wapp-res/teacher/attachments/画板282x.png',
        department: '编辑部',
        type: '员工',
        status: 'exit',
        phone: '138****8321',
        time: 1539630042000
      },
      {
        id: 9,
        username: '大熊',
        staffID: 2716,
        avatar: 'http://college.bczcdn.com/wapp-res/teacher/attachments/画板282x.png',
        department: '运营部',
        type: 'online',
        status: 'exit',
        phone: '138****8321',
        time: 1539630042000
      },
      {
        id: 10,
        username: '胖虎',
        staffID: 8612,
        avatar: 'http://college.bczcdn.com/wapp-res/teacher/attachments/画板282x.png',
        department: '研发部',
        type: 'online',
        status: 'online',
        phone: '138****8321',
        time: 1539630042000
      }
    ]
  }
  return {
    response
  }
})
