import React from 'react'
import { mount, shallow } from 'enzyme'
import Footer from '../src/Footer'

afterEach(() => {
  jest.clearAllMocks()
})

describe('<Footer />', () => {
  it('render phone number', () => {
    const wrapper = mount(<Footer stage={1} phone="123" />)
    expect(wrapper.hasClass('stage1'))
    expect(wrapper.find('button#bt-footer-phone').text()).to.equal('123')
  })

  it('should have "show content" and call changeStage', () => {
    const changeStage = jest.fn()
    const wrapper = mount(<Footer stage={2} changeStage={changeStage} />)
    expect(wrapper.hasClass('stage2'))
    wrapper.find('button#bt-footer-content').simulate('click')
    jestExpect(changeStage).toHaveBeenCalledTimes(1)
  })
})
