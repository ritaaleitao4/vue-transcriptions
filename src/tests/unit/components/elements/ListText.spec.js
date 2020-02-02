import Vue from 'vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import ListText from '@/components/elements/ListText.vue'

const localVue = createLocalVue()
let wrapper

describe('ListText Component Tests', () => {
  it('Snapshot test', () => {
    const Constructor = Vue.extend(ListText)
    const vm = new Constructor().$mount()
    expect(vm.$el).toMatchSnapshot()
  })

  it('should have values if title editable', () => {
    const value = 'Value of title'
    const type = ''

    wrapper = shallowMount(ListText, {
      localVue,
      propsData: { value, type },
    })

    expect(wrapper.find('span').text()).toBe(value)
    expect(wrapper.contains('input')).toBe(true)
    expect(wrapper.contains('textarea')).toBe(false)
  })

  it('should have values if textarea editable', () => {
    const value = 'Value of text'
    const type = 'textArea'

    wrapper = shallowMount(ListText, {
      localVue,
      propsData: { value, type },
    })

    expect(wrapper.find('span').text()).toBe(value)
    expect(wrapper.contains('input')).toBe(false)
    expect(wrapper.contains('textarea')).toBe(true)
  })

  it('should emit event on editing', () => {
    const value = 'Value'
    wrapper = shallowMount(ListText, {
      localVue,
      propsData: { value },
    })

    wrapper.find('input').trigger('input')
    expect(wrapper.emitted('input')).toBeTruthy()
  })

  it('should toogle active input', () => {
    const value = ''
    wrapper = shallowMount(ListText, {
      localVue,
      propsData: { value },
    })

    wrapper.find('span').trigger('click')
    expect(wrapper.contains('.hide')).toBe(false)

    wrapper.find('input').trigger('blur')
    expect(wrapper.contains('.hide')).toBe(false)
  })

  it('should toogle active input (textarea)', () => {
    const type = 'textArea'
    const value = 'Value of text'

    wrapper = shallowMount(ListText, {
      localVue,
      propsData: { type, value },
    })

    wrapper.find('span').trigger('click')
    expect(wrapper.contains('.hide')).toBe(false)

    wrapper.find('textarea').trigger('blur')
    expect(wrapper.contains('.hide')).toBe(false)
  })
})
