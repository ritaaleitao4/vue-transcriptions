import Vue from 'vue'
import Router from 'vue-router'
import TranscriptionsView from './pages/TranscriptionsView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'transcriptions',
      component: TranscriptionsView,
    },
  ],
})
