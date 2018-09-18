import React from 'react'
import { mount, shallow } from 'enzyme'

import BottomSheetFull, { BottomSheet } from '../src/BottomSheet'

const Page = () => <div data-testid="cp-page">Page</div>
const Content = () => <div data-testid="cp-content">Content</div>
const getViewportSize = jest.fn(() => ({ width: 320, height: 480 }))

const defaultProps = { Page, Content, getViewportSize, classes: {} }

// const wait = (n) => new Promise((r) => setTimeout(r, n))

afterEach(() => {
  jest.clearAllMocks()
})

describe('<BottomSheet />', () => {
  it('renders <Page /> and <Content />', () => {
    const wrapper = mount(<BottomSheetFull {...defaultProps} />)
    expect(wrapper.find(Page)).to.have.lengthOf(1)
    expect(wrapper.find(Content)).to.have.lengthOf(1)
  })

  it('call getViewportSize', () => {
    const wrapper = mount(<BottomSheetFull {...defaultProps} />)
    jestExpect(getViewportSize).toHaveBeenCalledTimes(1)
  })

  it('touch Handlers', async () => {
    const spyHandleStart = jest.spyOn(BottomSheet.prototype, 'handleStart')
    const spyHandleDrag = jest.spyOn(BottomSheet.prototype, 'handleDrag')
    const spyHandleStop = jest.spyOn(BottomSheet.prototype, 'handleStop')
    const wrapper = mount(
      <BottomSheet
        {...defaultProps}
        classes={{ dragging: 'class-dragging' }}
      />,
    )
    const headerBottom = wrapper.find('#bt-header-bottom')

    expect(headerBottom).to.have.lengthOf(1)

    const fire = (pageY, event = 'touchmove') =>
      headerBottom.simulate(event, { touches: [{ pageY }] })

    fire(300, 'touchstart')

    jestExpect(spyHandleStart).toHaveBeenCalledTimes(1)

    fire(300)
    fire(200)
    fire(100)
    fire(50)

    jestExpect(spyHandleDrag).toHaveBeenCalledTimes(4)

    expect(wrapper.state().dragging).to.be.true
    expect(wrapper.find('#bt-main').hasClass('class-dragging')).to.be.true

    fire(0, 'touchend')

    jestExpect(spyHandleStop).toHaveBeenCalledTimes(1)

    expect(wrapper.state().dragging).to.be.false
    expect(wrapper.state().stage).to.be.equal(2)

    fire(50, 'touchstart')
    fire(100)
    fire(300)
    fire(300)
    fire(0, 'touchend')
    expect(wrapper.state().stage).to.be.equal(1)
    expect(wrapper.find('#bt-main').hasClass('class-dragging')).to.be.false
  })
})
