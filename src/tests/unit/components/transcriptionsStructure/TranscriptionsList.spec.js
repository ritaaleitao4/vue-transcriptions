import Vue from 'vue'
import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import TranscriptionsList from '@/components/transcriptionsStructure/TranscriptionsList.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
Vue.use(Vuex)

let actions
let store
let wrapper
let listData = [
  {
    id: 1,
    voice: 'Test Voice',
    text: 'Test description',
  },
  {
    id: 2,
    voice: 'Test Voice 2',
    text: 'Test description 2',
  },
]

describe('Transcriptions list add row Test', () => {
  beforeEach(() => {
    actions = {
      addNewTranscription: jest.fn(() => true),
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

    wrapper = mount(TranscriptionsList, {
      stubs: ['list-text', 'person-svg', 'CheckboxItem', 'TranscriptionsListRow'],
      store,
      localVue,
      propsData: { listData },
    })
  })

  it('Snapshot test', () => {
    const Constructor = Vue.extend(TranscriptionsList)
    const vm = new Constructor().$mount()
    expect(vm.$el).toMatchSnapshot()
  })

  it('should has a button to add', () => {
    expect(wrapper.contains('.list-content--add-row')).toBe(true)
  })

  it('should call action to add row', () => {
    wrapper.find('.list-content--add-row').trigger('click')
    expect(actions.addNewTranscription).toHaveBeenCalled()
  })

  it('should render a list of items passed as props', () => {
    expect(wrapper.findAll('li').length).toBe(2)
  })

  it('should not render a list of items when an empty array is passed in props', () => {
    listData = []
    wrapper = mount(TranscriptionsList, {
      store,
      localVue,
      propsData: { listData },
    })
    expect(wrapper.findAll('li').length).toBe(0)
  })
})
