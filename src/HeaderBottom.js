import React, { Component } from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Text from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowUp from '@material-ui/icons/KeyboardArrowUp'

const styles = ({ spacing, palette, shadows }) => ({
  header: {
    height: 120,
    padding: `0 ${spacing.unit * 2}px`,
    display: 'flex',
    position: 'fixed',
    width: '100%',
    bottom: 48,
    justifyContent: 'center',
    flexDirection: 'column',
    transition: '.3s ease',
  },
  stage1: {
    background: palette.background.paper,
    color: palette.text.default,
    '& $title': {
      maxWidth: 'calc(100% - 48px)',
    },
    boxShadow:
      '0px -3px 5px -1px rgba(0, 0, 0, 0.2),0px -5px 8px 0px rgba(0, 0, 0, 0.14),0px -1px 14px 0px rgba(0, 0, 0, 0.12)',
  },
  title: {},
  hidden: {
    display: 'none',
    visibility: 'hidden',
  },
  buttonUp: {
    position: 'absolute',
    top: 8,
    right: 16,
  },
})

function HeaderBottom({
  classes,
  title,
  stage,
  dragHandlers,
  changeStage,
  dragging,
}) {
  // console.log({ dragging, stage })
  return (
    <div
      className={cx(classes.header, classes.stage1, {
        [classes.hidden]: dragging || stage === 2,
      })}
      data-testid="header-bottom"
      id="bt-header-bottom"
      {...dragHandlers}
    >
      <Text variant="title" color="inherit" noWrap className={classes.title}>
        {title}
      </Text>

      <IconButton className={classes.buttonUp} onClick={() => changeStage(2)}>
        <ArrowUp />
      </IconButton>

      <Text variant="subheading" color="inherit" noWrap>
        Second line veeeeeeeeeeery big lines line line line line and more one
        word
      </Text>
      <Text color="inherit" noWrap>
        fixed bottom
      </Text>
    </div>
  )
}

export default withStyles(styles)(HeaderBottom)
