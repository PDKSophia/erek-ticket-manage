/**
 *
 * @desc mock 模拟本地数据模块
 * @author PDK
 *
 * Created at     : 2019-03-21
 * Last modified  : 2019-03-23
 */

import request from './request'
import { getAuthorityToken } from 'js/utils/vue-token'
import { mockURL } from 'js/utils/utils'

export default {
  // 个人中心模块
  /**
   * @desc: 获取徽章数据
   * @return {*}
   */
  retrieveBadgeList: () => {
    return request({
      url: `${mockURL}/user/get-badge-list`,
      method: 'GET',
      token: getAuthorityToken()
    })
  },
  /**
   * @desc: 获取用户近七日登陆数据
   * @return {*}
   */
  retrieveLogin7Day: () => {
    return request({
      url: `${mockURL}/user/get-login-7day`,
      method: 'GET',
      token: getAuthorityToken()
    })
  },

  // 仪表盘模块
  /**
   * @desc 获取系统平台近Day天的访问量与注册量
   * @param {Number} day
   * @return {*}
   */
  retrieveSystemAccess: day => {
    return request({
      url: `${mockURL}/dashboard/get-all/access?day=${day}`,
      method: 'GET',
      token: getAuthorityToken()
    })
  },
  /**
   * @desc 获取系统平台首页的卡片数据
   * @return {*}
   */
  retrieveSystemStatistics: () => {
    return request({
      url: `${mockURL}/dashboard/get-all/statistics`,
      method: 'GET',
      token: getAuthorityToken()
    })
  },
  /**
   * @desc 获取系统平台来源数据
   * @return {*}
   */
  retrieveSystemOrigin: () => {
    return request({
      url: `${mockURL}/dashboard/get-all/origin`,
      method: 'GET',
      token: getAuthorityToken()
    })
  },
  /**
   * @desc 获取系统平台实际开销与预算开销
   * @return {*}
   */
  retrieveSystemExpense: () => {
    return request({
      url: `${mockURL}/dashboard/get-all/expense`,
      method: 'GET',
      token: getAuthorityToken()
    })
  },

  /**
   * desc: 获取所有城市卡片
   * @return {*}
   */
  retrieveCityStatus: () => {
    return request({
      url: `${mockURL}/city/get-status`,
      method: 'GET',
      token: getAuthorityToken()
    })
  },
  /**
   * desc: 获取城市列表
   * @return {*}
   */
  retrieveCityList: () => {
    return request({
      url: `${mockURL}/city/get-all`,
      method: 'GET',
      token: getAuthorityToken()
    })
  }
}
