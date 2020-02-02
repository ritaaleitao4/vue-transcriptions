import { mount, createLocalVue } from '@vue/test-utils'
import TranscriptionsListRow from '@components/transcriptionsStructure/TranscriptionsListRow.vue'
import Vue from 'vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
Vue.use(Vuex)

describe('Transcriptions list add row Test', () => {
  let wrapper
  let actions
  let store
  let item

  beforeEach(() => {
    item = {
        id: 1,
        voice: 'Test Voice',
        text: 'Test description',
    }

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
  })

  it('Snapshot test', () => {
    const Constructor = Vue.extend(TranscriptionsListRow)
    const vm = new Constructor().$mount()
    expect(vm.$el).toMatchSnapshot()
  })

  it('should has a button to delete', () => {
    wrapper = mount(TranscriptionsListRow, {
      store,
      localVue,
      propsData: { item },
    })
    expect(wrapper.contains('.delete')).toBe(true)
  })

  it('should call action to delete', () => {
    wrapper = mount(TranscriptionsListRow, {
      store,
      localVue,
      propsData: { item },
    })
    wrapper.find('.delete').trigger('click')
    expect(actions.deleteTranscription).toHaveBeenCalled()
  })
})
