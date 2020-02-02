import Vue from 'vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Header from '@/components/transcriptionsStructure/Header.vue'

const localVue = createLocalVue()
const wrapper = shallowMount(Header, {
  localVue,
})

it('Snapshot test', () => {
  const Constructor = Vue.extend(Header)
  const vm = new Constructor().$mount()
  expect(vm.$el).toMatchSnapshot()
})

describe('Header Test', () => {
  it('should emit event to upload data', () => {
    wrapper.find('.upload').trigger('click')
    expect(wrapper.emitted('uploadData')).toBeTruthy()
  })

  it('should emit event to fetch data', () => {
    wrapper.find('.fetch').trigger('click')
    expect(wrapper.emitted('fetchData')).toBeTruthy()
  })
})
