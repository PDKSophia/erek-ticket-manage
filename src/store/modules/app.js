/**
 * 项目管理 vuex 设计
 *
 * @summary APP Vuex
 * @author PDK
 *
 * Created at     : 2019-04-09
 * Last modified  : 2019-04-09
 */
import {
  retrieveCityList,
  retrieveBusPostionList,
  retrieveTrainPostionList,
} from '../../service/api'


const types = {
  SET_FETCH: 'SET_FETCH',
  SET_CITY_LIST: 'SET_CITY_LIST',
  SET_BUS_POS_LIST: 'SET_BUS_POS_LIST',
  ADD_CITY_ITEM: 'ADD_CITY_ITEM'
}

const payloads = {
  pageNum: 1,
  pageSize: 100
}

const actions = {
  // 获取所需要的列表
  async retrieveAppList({ commit }) {
    try {
      const cityList = await retrieveCityList(payloads)
      const busPosList = await retrieveBusPostionList(payloads)
      const trainPosList = await retrieveTrainPostionList(payloads)
      commit(types.SET_CITY_LIST, { data: cityList })
      commit(types.SET_BUS_POS_LIST, { data: busPosList })
      commit(types.SET_TRAIN_POS_LIST, { data: trainPosList })
      commit(types.SET_FETCH)
    } catch (err) {
    }
  },
  async addAppCityItemAsync({ commit }, payload) {
    try {
      commit(types.ADD_CITY_ITEM, { data: payload })
    } catch (err) {
    }
  }
}

const state = {
  isFetch: false,
  cityList: [],
  busPosList: [],
  trainPosList: []
}

const mutations = {
  [types.SET_FETCH](state) {
    state.isFetch = false // 置为true会存在一个新增城市而此cityList仍是之前值问题
  },
  [types.SET_CITY_LIST](state, payload) {
    state.cityList = [...payload.data.list]
  },
  [types.SET_BUS_POS_LIST](state, payload) {
    state.busPosList = [...payload.data.posList]
  },
  [types.SET_TRAIN_POS_LIST](state, payload) {
    state.trainPosList = [...payload.data.posList]
  },
  [types.ADD_CITY_ITEM](state, payload) {
    let citys = state.cityList
    citys.push(payload.data)
    state.cityList = [...citys]
  }
}

export default {
  state,
  actions,
  mutations
}