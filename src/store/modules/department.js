/**
 * 部门管理 vuex 设计
 *
 * @summary Department Vuex
 * @author PDK
 *
 * Created at     : 2019-03-24
 * Last modified  : 2019-03-25
 */
import { Message } from 'iview'
import {
  retrieveDepsList,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from '../../service/api'

const types = {
  RETRIEVE_DEPARTMENT_LIST: 'RETRIEVE_DEPARTMENT_LIST',
  CREATE_DEPARTMENT: 'CREATE_DEPARTMENT',
  UPDATE_DEPARTMENT: 'UPDATE_DEPARTMENT',
  DELETE_DEPARTMENT: 'DELETE_DEPARTMENT',
  SET_DEPS_PAGE_NUM: 'SET_DEPS_PAGE_NUM',
  SET_DEPS_PAGE_SIZE: 'SET_DEPS_PAGE_SIZE'
}

const actions = {
  // 分页获取
  async retrieveDepsListAsync({ commit }, payload) {
    try {
      const data = await retrieveDepsList(payload)
      commit(types.RETRIEVE_DEPARTMENT_LIST, { data: data })
    } catch (err) {}
  },
  // 新增部门
  async createDepsAsync({ commit }, payload, callback) {
    try {
      const data = await createDepartment(payload)
      commit(types.CREATE_DEPARTMENT, { data: data })
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
  // 更新部门
  async updateDepsAsync({ commit }, payload, callback) {
    try {
      const data = await updateDepartment(payload)
      commit(types.UPDATE_DEPARTMENT, { data: data })
      Message.success({
        content: '更新部门成功',
        duration: 1.5
      })
    } catch (err) {
      console.log(err)
    } finally {
      if (typeof callback === 'function') {
        callback()
      }
    }
  },
  // 删除部门
  async deleteDepsAsync({ commit }, payload, callback) {
    try {
      await deleteDepartment(payload.id)
      commit(types.DELETE_DEPARTMENT, { data: payload })
      Message.success({
        content: '删除部门成功',
        duration: 1.5
      })
    } catch (err) {
      console.log(err)
    } finally {
      if (typeof callback === 'function') {
        callback()
      }
    }
  },
  async setDepsPageNum({ commit }, pageNum) {
    await commit(types.SET_DEPS_PAGE_NUM, { data: pageNum })
  },
  async setDepsPageSize({ commit }, pageSize) {
    await commit(types.SET_DEPS_PAGE_SIZE, { data: pageSize })
  }
}
const state = {
  isFetch: false,
  list: [],
  pageNum: 0,
  pageSize: 0,
  total: 0
}

const mutations = {
  [types.RETRIEVE_DEPARTMENT_LIST](state, payload) {
    state.list = [...payload.data.list]
    state.pageNum = payload.data.current
    state.pageSize = payload.data.size
    state.total = payload.data.count
  },
  [types.CREATE_DEPARTMENT](state, payload) {
    let cList = state.list
    cList.unshift(payload.data)
    state.list = [...cList]
  },
  [types.UPDATE_DEPARTMENT](state, payload) {
    let uList = state.list.map(item => {
      return item.id === payload.data.id ? payload.data : item
    })
    state.list = [...uList]
  },
  [types.DELETE_DEPARTMENT](state, payload) {
    let dList = state.list.filter(item => {
      return item.id !== payload.data.id
    })
    state.list = [...dList]
  },
  [types.SET_DEPS_PAGE_NUM](state, payload) {
    state.pageNum = payload.data
  },
  [types.SET_DEPS_PAGE_SIZE](state, payload) {
    state.pageSize = payload.data
  }
}

export default {
  state,
  actions,
  mutations
}
