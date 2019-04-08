/**
 * 用户管理 vuex 设计
 *
 * @summary Staffartment Vuex
 * @author PDK
 *
 * Created at     : 2019-03-26
 * Last modified  : 2019-03-26
 */
import { Message } from 'iview'
import { retrieveStaffList, createStaff, updateStaff, deleteStaff } from '../../service/api'

const types = {
	RETRIEVE_STAFF_LIST: 'RETRIEVE_STAFF_LIST',
	CREATE_STAFF: 'CREATE_STAFF',
	UPDATE_STAFF: 'UPDATE_STAFF',
	DELETE_STAFF: 'DELETE_STAFF',
	SET_STAFF_PAGE_NUM: 'SET_STAFF_PAGE_NUM',
	SET_STAFF_PAGE_SIZE: 'SET_STAFF_PAGE_SIZE'
}

const actions = {
	// 分页获取
	async retrieveStaffListAsync({ commit }, payload) {
		try {
			const data = await retrieveStaffList(payload)
			commit(types.RETRIEVE_STAFF_LIST, { data: data })
		} catch (err) {}
	},
	// 新增员工
	async createStaffsAsync({ commit }, payload, callback) {
		try {
			const data = await createStaff(payload)
			commit(types.CREATE_STAFF, { data: data })
			Message.success({
				content: '新增员工成功',
				duration: 1.5
			})
		} catch (err) {
		} finally {
			if (typeof callback === 'function') {
				callback()
			}
		}
	},
	// 更新员工
	async updateStaffAsync({ commit }, payload, callback) {
		try {
			const data = await updateStaff(payload)
			commit(types.UPDATE_STAFF, { data: data })
			Message.success({
				content: '更新员工成功',
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
	// 删除员工
	async deleteStaffsAsync({ commit }, payload, callback) {
		try {
			await deleteStaff(payload.id)
			commit(types.DELETE_STAFF, { data: payload })
			Message.success({
				content: '删除员工成功',
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
	async setStaffPageNum({ commit }, pageNum) {
		await commit(types.SET_STAFF_PAGE_NUM, { data: pageNum })
	},
	async setStaffPageSize({ commit }, pageSize) {
		await commit(types.SET_STAFF_PAGE_SIZE, { data: pageSize })
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
	[types.RETRIEVE_STAFF_LIST](state, payload) {
		state.list = [...payload.data.list]
		state.pageNum = payload.data.current
		state.pageSize = payload.data.size
		state.total = payload.data.count
	},
	[types.CREATE_STAFF](state, payload) {
		let cList = state.list
		cList.unshift(payload.data)
		state.list = [...cList]
	},
	[types.UPDATE_STAFF](state, payload) {
		let uList = state.list.map(item => {
			return item.id === payload.data.id ? payload.data : item
		})
		state.list = [...uList]
	},
	[types.DELETE_STAFF](state, payload) {
		let dList = state.list.filter(item => {
			return item.id !== payload.data.id
		})
		state.list = [...dList]
	},
	[types.SET_STAFF_PAGE_NUM](state, payload) {
		state.pageNum = payload.data
	},
	[types.SET_STAFF_PAGE_SIZE](state, payload) {
		state.pageSize = payload.data
	}
}

export default {
	state,
	actions,
	mutations
}
