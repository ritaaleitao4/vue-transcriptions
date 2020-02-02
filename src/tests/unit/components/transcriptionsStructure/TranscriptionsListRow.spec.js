import Vue from 'vue'
import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import TranscriptionsListRow from '@/components/transcriptionsStructure/TranscriptionsListRow.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
Vue.use(Vuex)

let wrapper
let actions
let store

describe('Transcriptions list add row Test', () => {
  beforeEach(() => {
    actions = {
      deleteTranscription: jest.fn(() => true),
    }

    store = new Vuex.Store({
      actions,
      modules: {
        transcription: {
          namespaced: true,
          actions,
        },
      },
    })

    wrapper = mount(TranscriptionsListRow, {
      stubs: ['list-text', 'person-svg', 'checkbox-item'],
      store,
      localVue,
      propsData: {
        item: {
          id: 1,
          voice: 'Test Voice',
          text: 'Test description',
        },
      },
    })
  })

  it('Snapshot test', () => {
    const Constructor = Vue.extend(TranscriptionsListRow)
    const vm = new Constructor().$mount()
    expect(vm.$el).toMatchSnapshot()
  })

  it('should has a button to delete', () => {
    expect(wrapper.contains('.delete')).toBe(true)
  })

  it('should call action to delete', () => {
    wrapper.find('.delete').trigger('click')
    expect(actions.deleteTranscription).toHaveBeenCalled()
  })
})
