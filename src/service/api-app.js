import request from './request'
import { Message } from 'iview'
import { getAuthorityToken } from 'js/utils/vue-token'
import { baseUrl } from 'js/utils/utils'

export default {
  /**
   * @获取所有数据信息
   * @return {*}
   */
  fetchAllDataList: () => {
    return request({
      url: `${baseUrl}/data/getAllData`,
      method: 'GET',
      token: getAuthorityToken()
    })
  },
  /**
   * @获取标准列表数据信息
   * @return {*}
   */
  fetchStandAllDataList: () => {
    return request({
      url: `${baseUrl}/data/getStandAllData`,
      method: 'GET',
      token: getAuthorityToken()
    })
  },
  /**
   * @获取 `平台日访问量` 和  `日注册人数`
   * @return {*}
   */
  fetchPlatFormViewData: () => {
    return request({
      url: `${baseUrl}/data/getPlatFormViewData`,
      method: 'GET',
      token: getAuthorityToken()
    })
  },

  /**
   * @获取 `站点访问来源数据`
   * @return {*}
   */
  fetchAllOriginData: () => {
    return request({
      url: `${baseUrl}/data/getOriginAllData`,
      method: 'GET',
      token: getAuthorityToken()
    }).then(res => {
      let { response } = res
      if (response.code === 1) {
        return response.list
      } else {
        Message.error({
          content: response.msg,
          duration: 1.5
        })
      }
    })
  },

  /**
   * @获取 `预算开销和实际开销`
   * @return {*}
   */
  fetchExpenseOriginData: () => {
    return request({
      url: `${baseUrl}/data/getExpenseAllData`,
      method: 'GET',
      token: getAuthorityToken()
    }).then(res => {
      let { response } = res
      if (response.code === 1) {
        return response.list
      } else {
        Message.error({
          content: response.msg,
          duration: 1.5
        })
      }
    })
  },

  /**
   * @获取 `个人页 - 个人中心` 数据
   * @return {*}
   */
  fetchAllListData: () => {
    return request({
      url: `${baseUrl}/erek-user-all/getAllData`,
      method: 'GET',
      token: getAuthorityToken()
    }).then(res => {
      let { response } = res
      if (response.code === 1) {
        return response.list
      } else {
        Message.error({
          content: response.msg,
          duration: 1.5
        })
      }
    })
  }
}
