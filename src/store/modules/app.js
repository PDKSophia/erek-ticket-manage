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
  retrieveBusPostionList
} from '../../service/api'


const types = {
  SET_CITY_LIST: 'SET_CITY_LIST',
  SET_BUS_POS_LIST: 'SET_BUS_POS_LIST',
  SET_FETCH: 'SET_FETCH'
}

const payloads = {
  pageNum: 1,
  pageSize: 100
}

const actions = {
  async retrieveAppList({ commit }) {
    try {
      const cityList = await retrieveCityList(payloads)
      const busPosList = await retrieveBusPostionList(payloads)
      commit(types.SET_CITY_LIST, { data: cityList })
      commit(types.SET_BUS_POS_LIST, { data: busPosList })
      commit(types.SET_FETCH)
    } catch (err) {

    }
  }
}

const state = {
  isFetch: false,
  cityList: [],
  posList: []
}

const mutations = {
  [types.SET_CITY_LIST](state, payload) {
    state.cityList = [...payload.data.list]
  },
  [types.SET_BUS_POS_LIST](state, payload) {
    state.posList = [...payload.data.posList]
  },
  [types.SET_FETCH](state) {
    state.isFetch = true
  }
}

export default {
  state,
  actions,
  mutations
}