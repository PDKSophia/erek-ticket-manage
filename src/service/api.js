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

// 城市模块
/**
 * desc: 获取所有城市卡片
 * @return {*}
 */
export function retrieveCityStatus() {
  return request({
    url: `${baseUrl}/api/city/get-status`,
    method: 'GET',
    token: getAuthorityToken()
  })
}
/**
 * @desc: 分页获取部门列表
 * @param {Object} params 分页
 * @return {*}
 */
export function retrieveCityList(params) {
  return request({
    url: `${baseUrl}/api/city/get-all`,
    method: 'GET',
    params: params
  })
}
/**
 * @desc: 新增城市
 * @param {Object} payload
 * @return {*}
 */
export function createCity(payload) {
  return request({
    url: `${baseUrl}/api/city/add`,
    method: 'POST',
    data: payload
  })
}
/**
 * @desc: 编辑城市
 * @param {Object} payload
 * @return {*}
 */
export function updateCity(payload) {
  return request({
    url: `${baseUrl}/api/city/update`,
    method: 'PUT',
    data: payload
  })
}
/**
 * @desc: 删除城市
 * @param {Number} cityId
 * @return {*}
 */
export function deleteCity(cityId) {
  return request({
    url: `${baseUrl}/api/city/delete-id`,
    method: 'DELETE',
    params: {
      cityId: cityId
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
   * @desc: 文件上传
   * @param {Blob} files 文件
   * @return {*}
   */
  uploadFiles: files => {
    let formdata = new FormData()
    formdata.append('imageName', files.name)
    formdata.append('image', files)

    return request({
      url: `${baseUrl}/api/files/upload`,
      method: 'POST',
      data: formdata,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
}
