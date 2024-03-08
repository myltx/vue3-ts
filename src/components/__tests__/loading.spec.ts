import {describe, it, expect} from 'vitest'
import {mount} from '@vue/test-utils'
import Loading from '@/components/Loading/index.vue'

describe('Loading component', (
) => {
  it('renders correctly', () => {
    expect(Loading).toBeTruthy()
    const wrapper = mount(Loading, {
      props: {
			  msg: '123'
      }
    })
    expect(wrapper.text()).toContain('123')
    // expect(wrapper.html()).toMatchSnapshot()
  })
})
