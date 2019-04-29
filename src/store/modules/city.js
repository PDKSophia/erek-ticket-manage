/**
 * 城市管理 vuex 设计
 *
 * @summary City Vuex
 * @author PDK
 *
 * Created at     : 2019-03-24
 * Last modified  : 2019-03-25
 */
import { Message } from 'iview'
import {
	retrieveCityStatus,
	retrieveCityList,
	createCity,
	updateCity,
	deleteCity
} from '../../service/api'

const types = {
	RETRIEVE_STATUS_LIST: 'RETRIEVE_STATUS_LIST',
	RETRIEVE_CITY_LIST: 'RETRIEVE_CITY_LIST',
	CREATE_CITY: 'CREATE_CITY',
	UPDATE_CITY: 'UPDATE_CITY',
	DELETE_CITY: 'DELETE_CITY',
	SET_CITY_PAGE_NUM: 'SET_CITY_PAGE_NUM',
	SET_CITY_PAGE_SIZE: 'SET_CITY_PAGE_SIZE'
}

const actions = {
	// 获取城市状态
	async retrieveCityStatusAsync({ commit }) {
		try {
			const data = await retrieveCityStatus()
			commit(types.RETRIEVE_STATUS_LIST, { data: data })
		} catch (err) { }
	},
	// 分页获取
	async retrieveCityListAsync({ commit }, payload) {
		try {
			const data = await retrieveCityList(payload)
			commit(types.RETRIEVE_CITY_LIST, { data: data })
		} catch (err) { }
	},
	// 新增城市
	async createCityAsync({ commit }, payload, callback) {
		try {
			const data = await createCity(payload)
			const status = await retrieveCityStatus()
			commit(types.CREATE_CITY, { data: data })
			commit(types.RETRIEVE_STATUS_LIST, { data: status })
			Message.success({
				content: '新增城市成功',
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
	// 更新城市
	async updateCityAsync({ commit }, payload, callback) {
		try {
			const data = await updateCity(payload)
			const status = await retrieveCityStatus()
			commit(types.UPDATE_CITY, { data: data })
			commit(types.RETRIEVE_STATUS_LIST, { data: status })
			Message.success({
				content: '更新城市成功',
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
	// 删除城市
	async deleteCityAsync({ commit }, payload, callback) {
		try {
			await deleteCity(payload.id)
			const status = await retrieveCityStatus()
			commit(types.DELETE_CITY, { data: payload })
			commit(types.RETRIEVE_STATUS_LIST, { data: status })
			Message.success({
				content: '删除城市成功',
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
	async setCityPageNum({ commit }, pageNum) {
		await commit(types.SET_CITY_PAGE_NUM, { data: pageNum })
	},
	async setCityPageSize({ commit }, pageSize) {
		await commit(types.SET_CITY_PAGE_SIZE, { data: pageSize })
	}
}
const state = {
	isFetch: false,
	statusList: [],
	list: [],
	pageNum: 0,
	pageSize: 0,
	total: 0
}

const mutations = {
	[types.RETRIEVE_STATUS_LIST](state, payload) {
		state.statusList = [...payload.data]
	},
	[types.RETRIEVE_CITY_LIST](state, payload) {
		state.list = [...payload.data.list]
		state.pageNum = payload.data.current
		state.pageSize = payload.data.size
		state.total = payload.data.count
	},
	[types.CREATE_CITY](state, payload) {
		let cList = state.list
		cList.unshift(payload.data)
		state.list = [...cList]
	},
	[types.UPDATE_CITY](state, payload) {
		let uList = state.list.map(item => {
			return item.id === payload.data.id ? payload.data : item
		})
		state.list = [...uList]
	},
	[types.DELETE_CITY](state, payload) {
		let dList = state.list.filter(item => {
			return item.id !== payload.data.id
		})
		state.list = [...dList]
	},
	[types.SET_CITY_PAGE_NUM](state, payload) {
		state.pageNum = payload.data
	},
	[types.SET_CITY_PAGE_SIZE](state, payload) {
		state.pageSize = payload.data
	}
}

export default {
	state,
	actions,
	mutations
}
