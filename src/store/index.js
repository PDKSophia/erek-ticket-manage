import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import global from './modules/global'
import user from './modules/user'
import table from './modules/table'
import standard from './modules/standard'
import department from './modules/department'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global,
    user,
    table,
    standard,
    department
  },
  plugins: [createLogger()]
})
