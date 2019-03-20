import request from './request'
import { Message } from 'iview'
import { getAuthorityToken } from 'js/utils/vue-token'

import { baseUrl } from 'js/utils/utils'

export default {
  /**
   * desc: 获取所有城市卡片
   * @return {*}
   */
  retrieveCityStatus: () => {
    return request(`${baseUrl}/city/get-status`, {
      method: 'GET',
      token: getAuthorityToken()
    }).then(res => {
      if (res.code === 1) {
        return res.list
      } else {
        Message.error({
          content: res.msg,
          duration: 1.5
        })
      }
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
    }).then(res => {
      if (res.code === 1) {
        return res.data
      } else {
        Message.error({
          content: res.msg,
          duration: 1.5
        })
      }
    })
  }
}
