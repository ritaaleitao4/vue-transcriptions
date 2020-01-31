import Vue from 'vue'
import Vuex from 'vuex'
import storeModules from './storeModules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
     storeModules,
  },
})
