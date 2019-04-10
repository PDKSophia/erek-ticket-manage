/**
 * 火车管理 vuex 设计
 *
 * @summary Train Vuex
 * @author PDK
 *
 * Created at     : 2019-04-10
 * Last modified  : 2019-04-10
 */
import { Message } from 'iview'
import {
  retrieveTrainPostionList,
  createTrainPosition,
  updateTrainPosition,
  deleteTrainPosition,
  retrieveTrainLineList,
  createTrainLine,
  updateTrainLine,
  deleteTrainLine
} from '../../service/api'

const types = {
  RETRIEVE_TRAIN_POSITION_LIST: 'RETRIEVE_TRAIN_POSITION_LIST',
  CREATE_TRAIN_POSITION: 'CREATE_TRAIN_POSITION',
  UPDATE_TRAIN_POSITION: 'UPDATE_TRAIN_POSITION',
  DELETE_TRAIN_POSITION: 'DELETE_TRAIN_POSITION',
  SET_TRAIN_POS_PAGE_NUM: 'SET_TRAIN_POS_PAGE_NUM',
  SET_TRAIN_POS_PAGE_SIZE: 'SET_TRAIN_POS_PAGE_SIZE',
  RETRIEVE_TRAIN_LINE_LIST: 'RETRIEVE_TRAIN_LINE_LIST',
  CREATE_TRAIN_LINE: 'CREATE_TRAIN_LINE',
  UPDATE_TRAIN_LINE: 'UPDATE_TRAIN_LINE',
  DELETE_TRAIN_LINE: 'DELETE_TRAIN_LINE',
  SET_TRAIN_LINE_PAGE_NUM: 'SET_TRAIN_LINE_PAGE_NUM',
  SET_TRAIN_LINE_PAGE_SIZE: 'SET_TRAIN_LINE_PAGE_SIZE'
}

const actions = {
  // 分页获取火车站点
  async retrieveTrainPosListAsync({ commit }, payload) {
    try {
      const data = await retrieveTrainPostionList(payload)
      commit(types.RETRIEVE_TRAIN_POSITION_LIST, { data: data })
    } catch (err) { }
  },
  // 新增火车站点
  async createTrainPosAsync({ commit }, payload, callback) {
    try {
      const data = await createTrainPosition(payload)
      commit(types.CREATE_TRAIN_POSITION, { data: data })
      Message.success({
        content: '新增火车站点成功',
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
  // 更新火车站点
  async updateTrainPosAsync({ commit }, payload, callback) {
    try {
      const data = await updateTrainPosition(payload)
      commit(types.UPDATE_TRAIN_POSITION, { data: data })
      Message.success({
        content: '更新火车站点成功',
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
  // 删除火车站点
  async deleteTrainPosAsync({ commit }, payload, callback) {
    try {
      await deleteTrainPosition(payload.id)
      commit(types.DELETE_TRAIN_POSITION, { data: payload })
      Message.success({
        content: '删除火车站点成功',
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
  async setTrainPosPageNum({ commit }, pageNum) {
    await commit(types.SET_TRAIN_POS_PAGE_NUM, { data: pageNum })
  },
  async setTrainPosPageSize({ commit }, pageSize) {
    await commit(types.SET_TRAIN_POS_PAGE_SIZE, { data: pageSize })
  },
  // 分页获取火车班次
  async retrieveTrainLineAsync({ commit }, payload) {
    try {
      const data = await retrieveTrainLineList(payload)
      commit(types.RETRIEVE_TRAIN_LINE_LIST, { data: data })
    } catch (err) { }
  },
  // 新增火车班次
  async createTrainLineAsync({ commit }, payload, callback) {
    try {
      const data = await createTrainLine(payload)
      commit(types.CREATE_TRAIN_LINE, { data: data })
      Message.success({
        content: '新增火车班次成功',
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
  // 更新火车班次
  async updateTrainLineAsync({ commit }, payload, callback) {
    try {
      const data = await updateTrainLine(payload)
      commit(types.UPDATE_TRAIN_LINE, { data: data })
      Message.success({
        content: '更新火车班次成功',
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
  // 删除火车班次
  async deleteTrainLineAsync({ commit }, payload, callback) {
    try {
      await deleteTrainLine(payload.id)
      commit(types.DELETE_TRAIN_LINE, { data: payload })
      Message.success({
        content: '删除火车班次成功',
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
  async setTrainLinePageNum({ commit }, pageNum) {
    await commit(types.SET_TRAIN_LINE_PAGE_NUM, { data: pageNum })
  },
  async setTrainLinePageSize({ commit }, pageSize) {
    await commit(types.SET_TRAIN_LINE_PAGE_SIZE, { data: pageSize })
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
  [types.RETRIEVE_TRAIN_POSITION_LIST](state, payload) {
    state.posList = [...payload.data.posList]
    state.posPageNum = payload.data.posPageNum
    state.posPageSize = payload.data.posPageSize
    state.posTotal = payload.data.posTotal
  },
  [types.CREATE_TRAIN_POSITION](state, payload) {
    let cpList = state.posList
    cpList.unshift(payload.data)
    state.posList = [...cpList]
  },
  [types.UPDATE_TRAIN_POSITION](state, payload) {
    let upList = state.posList.map(item => {
      return item.id === payload.data.id ? payload.data : item
    })
    state.posList = [...upList]
  },
  [types.DELETE_TRAIN_POSITION](state, payload) {
    let dpList = state.posList.filter(item => {
      return item.id !== payload.data.id
    })
    state.posList = [...dpList]
  },
  [types.SET_TRAIN_POS_PAGE_NUM](state, payload) {
    state.posPageNum = payload.data
  },
  [types.SET_TRAIN_POS_PAGE_SIZE](state, payload) {
    state.posPageSize = payload.data
  },
  [types.RETRIEVE_TRAIN_LINE_LIST](state, payload) {
    state.lineList = [...payload.data.lineList]
    state.linePageNum = payload.data.linePageNum
    state.linePageSize = payload.data.linePageSize
    state.lineTotal = payload.data.lineTotal
  },
  [types.CREATE_TRAIN_LINE](state, payload) {
    let cpList = state.lineList
    cpList.unshift(payload.data)
    state.lineList = [...cpList]
  },
  [types.UPDATE_TRAIN_LINE](state, payload) {
    let upList = state.lineList.map(item => {
      return item.id === payload.data.id ? payload.data : item
    })
    state.lineList = [...upList]
  },
  [types.DELETE_TRAIN_LINE](state, payload) {
    let dpList = state.lineList.filter(item => {
      return item.id !== payload.data.id
    })
    state.lineList = [...dpList]
  },
  [types.SET_TRAIN_LINE_PAGE_NUM](state, payload) {
    state.linePageNum = payload.data
  },
  [types.SET_TRAIN_LINE_PAGE_SIZE](state, payload) {
    state.linePageSize = payload.data
  }
}

export default {
  state,
  actions,
  mutations
}
