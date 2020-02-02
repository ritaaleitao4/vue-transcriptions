import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import TranscriptionsList from '@components/transcriptionsStructure/TranscriptionsList.vue'
import Vue from 'vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
Vue.use(Vuex)

describe('Transcriptions list add row Test', () => {
  let wrapper
  let actions
  let store
  let listData

  beforeEach(() => {
    listData = [
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
  })

  it('should has a button to add', () => {
    wrapper = mount(TranscriptionsList)
    expect(wrapper.contains('.list-content--add-row')).toBe(true)
  })

  it('should call action to add row', () => {
    const instance = shallowMount(TranscriptionsList, { store, localVue })
    instance.find('.list-content--add-row').trigger('click')
    expect(actions.addNewTranscription).toHaveBeenCalled()
  })

  it('Snapshot test', () => {
    const Constructor = Vue.extend(TranscriptionsList)
    const vm = new Constructor().$mount()
    expect(vm.$el).toMatchSnapshot()
  })

  it('should render a list of items passed as props', () => {
    wrapper = mount(TranscriptionsList, {
      store,
      localVue,
      propsData: { listData },
    })

    expect(wrapper.findAll('li').length).toBe(2)
  })

  it('should not render a list of items when an empty array is passed in props', () => {
    const listData = []

    wrapper = mount(TranscriptionsList, {
      store,
      localVue,
      propsData: { listData },
    });

    expect(wrapper.findAll('li').length).toBe(0);
  })
})
