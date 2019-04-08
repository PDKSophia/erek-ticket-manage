/**
 * 汽车管理 vuex 设计
 *
 * @summary Bus Vuex
 * @author PDK
 *
 * Created at     : 2019-04-07
 * Last modified  : 2019-04-07
 */
import { Message } from 'iview'
import {
	retrieveBusPostionList,
	createBusPosition,
	updateBusPosition,
	deleteBusPosition
	//   retrieveBusLineList,
	//   createBusLine,
	//   updateBusLine,
	//   deleteBusLine
} from '../../service/api'

const types = {
	RETRIEVE_BUS_POSITION_LIST: 'RETRIEVE_BUS_POSITION_LIST',
	CREATE_BUS_POSITION: 'CREATE_BUS_POSITION',
	UPDATE_BUS_POSITION: 'UPDATE_BUS_POSITION',
	DELETE_BUS_POSITION: 'DELETE_BUS_POSITION',
	SET_BUS_POS_PAGE_NUM: 'SET_BUS_POS_PAGE_NUM',
	SET_BUS_POS_PAGE_SIZE: 'SET_BUS_POS_PAGE_SIZE'
}

const actions = {
	// 分页获取汽车站点
	async retrieveBusPosListAsync({ commit }, payload) {
		try {
			const data = await retrieveBusPostionList(payload)
			commit(types.RETRIEVE_BUS_POSITION_LIST, { data: data })
		} catch (err) { }
	},
	// 新增汽车站点
	async createBusPosAsync({ commit }, payload, callback) {
		try {
			const data = await createBusPosition(payload)
			commit(types.CREATE_BUS_POSITION, { data: data })
			Message.success({
				content: '新增汽车站点成功',
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
	// 更新汽车站点
	async updateBusPosAsync({ commit }, payload, callback) {
		try {
			const data = await updateBusPosition(payload)
			commit(types.UPDATE_BUS_POSITION, { data: data })
			Message.success({
				content: '更新汽车站点成功',
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
	// 删除汽车站点
	async deleteBusPosAsync({ commit }, payload, callback) {
		try {
			await deleteBusPosition(payload.id)
			commit(types.DELETE_BUS_POSITION, { data: payload })
			Message.success({
				content: '删除汽车站点成功',
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
	async setBusPosPageNum({ commit }, pageNum) {
		await commit(types.SET_BUS_POS_PAGE_NUM, { data: pageNum })
	},
	async setBusPosPageSize({ commit }, pageSize) {
		await commit(types.SET_BUS_POS_PAGE_SIZE, { data: pageSize })
	}
}

const state = {
	posList: [],
	posPageNum: 0,
	posPageSize: 0,
	posTotal: 0
}

const mutations = {
	[types.RETRIEVE_BUS_POSITION_LIST](state, payload) {
		state.posList = [...payload.data.posList]
		state.posPageNum = payload.data.posPageNum
		state.posPageSize = payload.data.posPageSize
		state.posTotal = payload.data.posTotal
	},
	[types.CREATE_BUS_POSITION](state, payload) {
		let cpList = state.posList
		cpList.unshift(payload.data)
		state.posList = [...cpList]
	},
	[types.UPDATE_BUS_POSITION](state, payload) {
		let upList = state.posList.map(item => {
			return item.id === payload.data.id ? payload.data : item
		})
		state.posList = [...upList]
	},
	[types.DELETE_BUS_POSITION](state, payload) {
		let dpList = state.posList.filter(item => {
			return item.id !== payload.data.id
		})
		state.posList = [...dpList]
	},
	[types.SET_BUS_POS_PAGE_NUM](state, payload) {
		state.posPageNum = payload.data
	},
	[types.SET_BUS_POS_PAGE_SIZE](state, payload) {
		state.posPageSize = payload.data
	}
}

export default {
	state,
	actions,
	mutations
}
