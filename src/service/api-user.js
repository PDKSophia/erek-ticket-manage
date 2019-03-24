import request from './request'
import { Message } from 'iview'
import { getAuthorityToken } from 'js/utils/vue-token'
import { mockURL } from 'js/utils/utils'

export default {
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
  retrieveBadgeList: () => {
    return request({
      url: `${mockURL}/user/login-data`,
      method: 'GET',
      token: getAuthorityToken()
    })
  }
}
