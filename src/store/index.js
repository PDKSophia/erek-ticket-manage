import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import global from './modules/global'
import user from './modules/user'
import table from './modules/table'
import standard from './modules/standard'
import department from './modules/department'
import staff from './modules/staff'
import city from './modules/city'
import bus from './modules/bus'
import train from './modules/train'
import air from './modules/air'
import app from './modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		global,
		user,
		table,
		standard,
		department,
		staff,
		city,
		bus,
		train,
		air,
		app
	},
	plugins: [createLogger()]
})
