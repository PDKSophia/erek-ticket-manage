/**
 * 部门管理 vuex 设计
 *
 * @summary Department Vuex
 * @author PDK
 *
 * Created at     : 2019-03-24
 * Last modified  : 2019-03-24
 */
import { Message } from 'iview'
import {
  createDepartment as _createDepartment,
  updateDepartment as _updateDepartment
} from '../../service/api'

const types = {
  CREATE_DEPAETMENT: 'CREATE_DEPAETMENT',
  UPDATE_DEPAETMENT: 'UPDATE_DEPAETMENT'
}

const actions = {
  async createDepartment({ commit }, payload, callback) {
    try {
      const data = await _createDepartment(payload)
      commit(types.CREATE_DEPAETMENT, { data: data })
      Message.success({
        content: '新增部门成功',
        duration: 1.5
      })
    } catch (err) {
    } finally {
      if (typeof callback === 'function') {
        callback()
      }
    }
  },
  async updateDepartment({ commit }, payload, callback) {
    // 发送请求
    try {
      const data = await _updateDepartment(payload)
      commit(types.UPDATE_DEPAETMENT, { data: data })
    } catch (err) {
      console.log(err)
    } finally {
      if (typeof callback === 'function') {
        callback()
      }
    }
  }
}
const state = {
  list: [],
  pageNum: 1,
  pageSize: 10,
  count: 0
}

const mutations = {
  [types.CREATE_DEPAETMENT](state, payload) {
    console.log('###', payload)
  },
  [types.UPDATE_DEPAETMENT](state, payload) {
    console.log('###', payload)
  }
}

export default {
  state,
  actions,
  mutations
}
