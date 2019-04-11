/**
 * 飞机管理 vuex 设计
 *
 * @summary Air Vuex
 * @author PDK
 *
 * Created at     : 2019-04-11
 * Last modified  : 2019-04-11
 */
import { Message } from 'iview'
import {
  retrieveAirPostionList,
  createAirPosition,
  updateAirPosition,
  deleteAirPosition,
  retrieveAirLineList,
  createAirLine,
  updateAirLine,
  deleteAirLine
} from '../../service/api'

const types = {
  RETRIEVE_AIR_POSITION_LIST: 'RETRIEVE_AIR_POSITION_LIST',
  CREATE_AIR_POSITION: 'CREATE_AIR_POSITION',
  UPDATE_AIR_POSITION: 'UPDATE_AIR_POSITION',
  DELETE_AIR_POSITION: 'DELETE_AIR_POSITION',
  SET_AIR_POS_PAGE_NUM: 'SET_AIR_POS_PAGE_NUM',
  SET_AIR_POS_PAGE_SIZE: 'SET_AIR_POS_PAGE_SIZE',
  RETRIEVE_AIR_LINE_LIST: 'RETRIEVE_AIR_LINE_LIST',
  CREATE_AIR_LINE: 'CREATE_AIR_LINE',
  UPDATE_AIR_LINE: 'UPDATE_AIR_LINE',
  DELETE_AIR_LINE: 'DELETE_AIR_LINE',
  SET_AIR_LINE_PAGE_NUM: 'SET_AIR_LINE_PAGE_NUM',
  SET_AIR_LINE_PAGE_SIZE: 'SET_AIR_LINE_PAGE_SIZE'
}

const actions = {
  // 分页获取机场
  async retrieveAirPosListAsync({ commit }, payload) {
    try {
      const data = await retrieveAirPostionList(payload)
      commit(types.RETRIEVE_AIR_POSITION_LIST, { data: data })
    } catch (err) { }
  },
  // 新增机场
  async createAirPosAsync({ commit }, payload, callback) {
    try {
      const data = await createAirPosition(payload)
      commit(types.CREATE_AIR_POSITION, { data: data })
      Message.success({
        content: '新增机场成功',
        duration: 1.5
      })
    } catch (err) {
    } finally {
      if (typeof callback === 'function') {
        setTimeout(() => {
          callback()
        }, 1000)
      }
    }
  },
  // 更新机场
  async updateAirPosAsync({ commit }, payload, callback) {
    try {
      const data = await updateAirPosition(payload)
      commit(types.UPDATE_AIR_POSITION, { data: data })
      Message.success({
        content: '更新机场成功',
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
  // 删除机场
  async deleteAirPosAsync({ commit }, payload, callback) {
    try {
      await deleteAirPosition(payload.id)
      commit(types.DELETE_AIR_POSITION, { data: payload })
      Message.success({
        content: '删除机场成功',
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
  async setAirPosPageNum({ commit }, pageNum) {
    await commit(types.SET_AIR_POS_PAGE_NUM, { data: pageNum })
  },
  async setAirPosPageSize({ commit }, pageSize) {
    await commit(types.SET_AIR_POS_PAGE_SIZE, { data: pageSize })
  },
  // 分页获取机场航班
  async retrieveAirLineAsync({ commit }, payload) {
    try {
      const data = await retrieveAirLineList(payload)
      commit(types.RETRIEVE_AIR_LINE_LIST, { data: data })
    } catch (err) { }
  },
  // 新增机场航班
  async createAirLineAsync({ commit }, payload, callback) {
    try {
      const data = await createAirLine(payload)
      commit(types.CREATE_AIR_LINE, { data: data })
      Message.success({
        content: '新增机场航班成功',
        duration: 1.5
      })
    } catch (err) {
    } finally {
      if (typeof callback === 'function') {
        setTimeout(() => {
          callback()
        }, 1000)
      }
    }
  },
  // 更新机场航班
  async updateAirLineAsync({ commit }, payload, callback) {
    try {
      const data = await updateAirLine(payload)
      commit(types.UPDATE_AIR_LINE, { data: data })
      Message.success({
        content: '更新机场航班成功',
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
  // 删除机场航班
  async deleteAirLineAsync({ commit }, payload, callback) {
    try {
      await deleteAirLine(payload.id)
      commit(types.DELETE_AIR_LINE, { data: payload })
      Message.success({
        content: '删除机场航班成功',
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
  async setAirLinePageNum({ commit }, pageNum) {
    await commit(types.SET_AIR_LINE_PAGE_NUM, { data: pageNum })
  },
  async setAirLinePageSize({ commit }, pageSize) {
    await commit(types.SET_AIR_LINE_PAGE_SIZE, { data: pageSize })
  }
}

const state = {
  posList: [],
  posPageNum: 0,
  posPageSize: 0,
  posTotal: 0,
  lineList: [],
  linePageNum: 0,
  linePageSize: 0,
  lineTotal: 0
}

const mutations = {
  [types.RETRIEVE_AIR_POSITION_LIST](state, payload) {
    state.posList = [...payload.data.posList]
    state.posPageNum = payload.data.posPageNum
    state.posPageSize = payload.data.posPageSize
    state.posTotal = payload.data.posTotal
  },
  [types.CREATE_AIR_POSITION](state, payload) {
    let cpList = state.posList
    cpList.unshift(payload.data)
    state.posList = [...cpList]
  },
  [types.UPDATE_AIR_POSITION](state, payload) {
    let upList = state.posList.map(item => {
      return item.id === payload.data.id ? payload.data : item
    })
    state.posList = [...upList]
  },
  [types.DELETE_AIR_POSITION](state, payload) {
    let dpList = state.posList.filter(item => {
      return item.id !== payload.data.id
    })
    state.posList = [...dpList]
  },
  [types.SET_AIR_POS_PAGE_NUM](state, payload) {
    state.posPageNum = payload.data
  },
  [types.SET_AIR_POS_PAGE_SIZE](state, payload) {
    state.posPageSize = payload.data
  },
  [types.RETRIEVE_AIR_LINE_LIST](state, payload) {
    state.lineList = [...payload.data.lineList]
    state.linePageNum = payload.data.linePageNum
    state.linePageSize = payload.data.linePageSize
    state.lineTotal = payload.data.lineTotal
  },
  [types.CREATE_AIR_LINE](state, payload) {
    let cpList = state.lineList
    cpList.unshift(payload.data)
    state.lineList = [...cpList]
  },
  [types.UPDATE_AIR_LINE](state, payload) {
    let upList = state.lineList.map(item => {
      return item.id === payload.data.id ? payload.data : item
    })
    state.lineList = [...upList]
  },
  [types.DELETE_AIR_LINE](state, payload) {
    let dpList = state.lineList.filter(item => {
      return item.id !== payload.data.id
    })
    state.lineList = [...dpList]
  },
  [types.SET_AIR_LINE_PAGE_NUM](state, payload) {
    state.linePageNum = payload.data
  },
  [types.SET_AIR_LINE_PAGE_SIZE](state, payload) {
    state.linePageSize = payload.data
  }
}

export default {
  state,
  actions,
  mutations
}
