import request from './request'
import { getAuthorityToken } from 'js/utils/vue-token'
import { Message } from 'iview'
import { baseUrl } from 'js/utils/utils'

// 部门模块
/**
 * @desc: 分页获取部门列表
 * @param {Object} params 分页
 * @return {*}
 */
export function retrieveDepsList(params) {
  return request({
    url: `${baseUrl}/api/department/get-all`,
    method: 'GET',
    params: params
  })
}
/**
 * @desc: 新增部门
 * @param {Object} payload
 * @return {*}
 */
export function createDepartment(payload) {
  return request({
    url: `${baseUrl}/api/department/add`,
    method: 'POST',
    data: payload
  })
}
/**
 * @desc: 编辑部门
 * @param {Object} payload
 * @return {*}
 */
export function updateDepartment(payload) {
  return request({
    url: `${baseUrl}/api/department/update`,
    method: 'PUT',
    data: payload
  })
}
/**
 * @desc: 删除部门
 * @param {Number} departId
 * @return {*}
 */
export function deleteDepartment(departId) {
  return request({
    url: `${baseUrl}/api/department/delete-id`,
    method: 'DELETE',
    params: {
      departId: departId
    }
  })
}

// 员工模块
/**
 * @desc: 分页获取员工列表
 * @param {Object} params 分页
 * @return {*}
 */
export function retrieveStaffList(params) {
  return request({
    url: `${baseUrl}/api/staff/get-all`,
    method: 'GET',
    params: params
  })
}
/**
 * @desc: 新增员工
 * @param {Object} payload
 * @return {*}
 */
export function createStaff(payload) {
  return request({
    url: `${baseUrl}/api/staff/add`,
    method: 'POST',
    data: payload
  })
}
/**
 * @desc: 编辑员工
 * @param {Object} payload
 * @return {*}
 */
export function updateStaff(payload) {
  return request({
    url: `${baseUrl}/api/staff/update`,
    method: 'PUT',
    data: payload
  })
}
/**
 * @desc: 删除员工
 * @param {Number} staffId
 * @return {*}
 */
export function deleteStaff(staffId) {
  return request({
    url: `${baseUrl}/api/staff/delete-id`,
    method: 'DELETE',
    params: {
      staffId: staffId
    }
  })
}

export default {
  // 登陆模块
  /**
   * @desc: 根据emai发送验证码
   * @return {*}
   */
  retrieveCode: email => {
    return request({
      url: `${baseUrl}/api/login/email-code`,
      method: 'POST',
      data: {
        email: email
      }
    }).then(data => {
      Message.success({
        content: data,
        duration: 1.5
      })
    })
  },
  /**
   * @desc: 获取token
   * @param {Object} jsondata
   * @return {*}
   */
  retrieveToken: jsondata => {
    return request({
      url: `${baseUrl}/api/login/get-token`,
      method: 'POST',
      data: jsondata
    })
  },
  retrieveUser: () => {
    return request({
      url: `${baseUrl}/api/login/oauth-token`,
      method: 'GET'
    })
  },

  /**
   * desc: 获取所有城市卡片
   * @return {*}
   */
  retrieveCityStatus: () => {
    return request(`${baseUrl}/city/get-status`, {
      method: 'GET',
      token: getAuthorityToken()
    })
  },
  /**
   * desc: 获取城市列表
   * @return {*}
   */
  retrieveCityList: () => {
    return request(`${baseUrl}/city/get-all`, {
      method: 'GET',
      token: getAuthorityToken()
    })
  }
}
