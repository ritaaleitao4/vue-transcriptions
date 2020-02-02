import Vue from 'vue';
import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Toast from '@components/elements/toastMessage.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
Vue.use(Vuex)

describe('Toast Component Tests', () => {
  let wrapper
  let store
  let actions

  beforeEach(() => {
    actions = {
      removeTranscriptionMessages: jest.fn(() => true)
    }

    store = new Vuex.Store({
      state: {},
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
    const Constructor = Vue.extend(Toast)
    const vm = new Constructor().$mount()
    expect(vm.$el).toMatchSnapshot()
  })

  it('Should have error text when loaded', () => {
    const errorMessage = 'An unexpected error occurred'

    wrapper = shallowMount(Toast, {
      store,
      localVue,
      propsData: { errorMessage },
    })

    expect(wrapper.find('.toast-message--title').text()).toBe('Error')
    expect(wrapper.find('.toast-message--description').text()).toBe(errorMessage)
  })

  it('Should have success text when loaded', () => {
    const successMessage = 'Success message'

    wrapper = shallowMount(Toast, {
      store,
      localVue,
      propsData: { successMessage },
    })

    expect(wrapper.find('.toast-message--title').text()).toBe('Success')
    expect(wrapper.find('.toast-message--description').text()).toBe(successMessage)
  })

  it('Should dismiss message on close button click', () => {
    const errorMessage = 'An unexpected error occurred please refresh the page'

    wrapper = shallowMount(Toast, {
      store,
      localVue,
      propsData: { errorMessage },
    })

    expect(wrapper.find('.toast-message--description').text()).toBe(errorMessage)
    wrapper.findAll('.toast-message--dismiss').trigger('click')
    expect(actions.removeTranscriptionMessages).toHaveBeenCalled()
  })
})
