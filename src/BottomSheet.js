import React, { PureComponent, Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import throttle from 'lodash.throttle'
import Header from './Header'
import TinyHeader from './TinyHeader'
import Footer from './Footer'
import RenderInnerContent from './RenderInnerContent'
import { getViewportSize } from './utils'

const styles = ({ palette }) => ({
  bottomSheet: {
    // border: '1px solid red',
    width: '100%',
    height: '100%',
    position: 'fixed',
    overflowY: 'auto',
    overscrollBehavior: 'contain',
    '&$dragging': {
      overflowY: 'hidden',
    },
    '&$stage1': {
      overflowY: 'hidden',
      background: 'rgba(0,0,0,0.2)',
    },
  },
  content: {
    // border: '1px solid blue',
    // transition: '.3s ease',
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '80%',
    bottom: '-80%',
    transform: 'translateY(-100%)',
    '&$stage3 $childContent': {
      // overflowY: 'auto',
      background: 'rgba(0,0,0,0.2)',
    },
  },

  animate: {
    transition: '.3s ease',
  },
  dragging: {},
  childContent: {
    background: palette.background.paper,
    width: '100%',
    // overflowY: 'hidden',
    // height: 'calc(100vh - 56px)',
  },
  debug: {
    top: 56,
    position: 'fixed',
    right: 0,
    background: 'rgba(0,0,0,0.3)',
    fontSize: 11,
    width: 130,
  },
  stage1: {},
  stage2: {},
  stage3: {},
  page: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    left: 0,
    top: 0,
  },
})

class BottomSheet extends Component {
  static propTypes = {
    // from @material-ui/styles
    classes: PropTypes.object,

    // content of bottomSheet
    children: PropTypes.func,

    stage2Pos: PropTypes.number,
    barHeight: PropTypes.number,
  }

  static defaultProps = {
    stage2Pos: 0.5,
    headerHeight: 120,
    bottomTriggerTop: 20,
  }

  state = {
    stageAfter: 1,
    stage: 1,
    stageBefore: 1,
    y: this.props.headerHeight + 48,
    dragging: false,
    showTinyHeader: false,
    viewport: getViewportSize(),
  }

  containerRef = React.createRef()
  dragRef = React.createRef()

  calcTopDistance = () => {
    const { dragging, y, stage, viewport } = this.state
    const { headerHeight } = this.props

    if (dragging) {
      return y
    }

    if (stage === 2) {
      return viewport.height * 0.8
    }

    return headerHeight + 48
  }

  block = (e) => e.preventDefault()

  activeBlock = () => {
    // document.addEventListener('touchmove', this.block, {
    //   passive: false,
    // })
  }

  desactiveBlock = () => {
    // document.removeEventListener('touchmove', this.block)
  }

  changeStage = (stage) => {
    this.containerRef.current.scrollTop = 0
    this.setState({ stage }, this.setPosition)
  }

  lastPageY = 0
  dragStartedOn = 0
  dragTime = 0
  blockedScroll = false

  handleStart = (e) => {
    this.activeBlock()
    // console.log('handleStart', this.blockedScroll)
    this.lastPageY = e.touches[0].pageY
    this.dragStartedOn = e.touches[0].pageY
  }

  handleDrag = (e) => {
    const touch = e.touches[0]
    requestAnimationFrame(() => {
      this.dragTime += 1

      // deve ser só um click
      if (this.dragTime < 2) {
        return
      }

      if (this.resetDragPosition) {
        this.resetDragPosition = false
        this.lastPageY = touch.pageY
      }

      const { y, viewport, stage } = this.state
      const delta = this.lastPageY - touch.pageY

      if (this.dragTime === 2) {
        this.setState({ dragging: true })
        return
      }

      this.lastPageY = touch.pageY
      const mid = viewport.height / 2
      const margin = 100
      let newStage = this.calcNewStage()
      const limit = viewport.height * 0.8

      let newY = y + (delta === NaN ? 0 : delta)
      if (newY < 0) newY = 0
      if (newY > limit) newY = limit

      this.setState({ y: newY, newStage, stageAfter: this.calcNewStage() })
    })
  }

  calcNewStage = () => {
    const { stage } = this.state
    const diff = this.dragStartedOn - this.lastPageY
    const breakPoint = 20

    if (stage === 2) {
      if (diff > breakPoint) return 2
      if (diff < -breakPoint) return 1
    }

    if (stage === 1 && diff > breakPoint) return 2
    if (stage === 3 && diff < -breakPoint) return 2

    return stage
  }

  handleStop = () => {
    this.desactiveBlock()
    // deve ser só um click
    if (this.dragTime < 2) {
      return
    }
    this.dragTime = 0
    const stage = this.calcNewStage()
    if (stage === 1) {
      this.containerRef.current.scrollTop = 0
    }
    this.setState({ dragging: false, stage }, this.setPosition)
  }

  setPosition = () => {
    const y = this.calcTopDistance()
    this.setState({ y })
  }

  handleScroll = () => {
    const {
      viewport: { height },
      showTinyHeader,
    } = this.state
    const { scrollTop } = this.containerRef.current

    const breakPoint = height - height * 0.8 - this.props.headerHeight + 16

    if (scrollTop > breakPoint && !showTinyHeader)
      this.setState({ showTinyHeader: true })

    if (scrollTop < breakPoint && showTinyHeader)
      this.setState({ showTinyHeader: false })
  }

  handleScrollThrottle = throttle(this.handleScroll, 150)

  renderContent = ({ children }) => {
    const { classes } = this.props
    return (
      <div className={classes.childContent}>
        <RenderPure>{children}</RenderPure>
      </div>
    )
  }

  dragHandlers = {
    onTouchStart: this.handleStart,
    onTouchMove: this.handleDrag,
    onTouchEnd: this.handleStop,
    onTouchCancel: this.handleStop,
  }

  render() {
    const { classes, children, headerHeight, Page, Content } = this.props
    const {
      stage,
      y,
      dragging,
      viewport,
      stageAfter,
      newState,
      showTinyHeader,
    } = this.state
    const positionY = this.calcTopDistance()
    const transform = `translateY(-${positionY}px)`

    return (
      <div className={classes.wrapper} style={{ height: viewport.height }}>
        <div className={classes.page}>
          <Page />
        </div>

        <div className={classes.debug}>
          stage: {stage} <br />
          stageAfter: {stageAfter} <br />
          <br />
          y: {Math.round(y)}
          <br />
          dragging ? {dragging ? 'sim' : 'nao'}
        </div>

        <TinyHeader show={showTinyHeader} />

        <div
          className={cx(classes.bottomSheet, classes[`stage${stage}`], {
            [classes.dragging]: dragging,
          })}
          ref={this.containerRef}
          onScroll={this.handleScrollThrottle}
        >
          <div
            className={cx(classes.content, { [classes.animate]: !dragging })}
            style={{ transform }}
            ref={this.dragRef}
          >
            <Header
              stage={dragging ? stageAfter : stage}
              dragHandlers={this.dragHandlers}
              title="Some nice biiiiiiiiiiiig title, fit? Yer or no?"
              changeStage={this.changeStage}
            />
            <RenderInnerContent stage={stage} Content={Content} />
            {/* {children({
              stage,
              changeStage: this.changeStage,
              Content: this.renderContent,
            })} */}
          </div>
        </div>
        <Footer stage={stage} show changeStage={this.changeStage} />
      </div>
    )
  }
}

export default withStyles(styles)(BottomSheet)
