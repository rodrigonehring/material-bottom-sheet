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
    justifyContent: 'center',
    flexDirection: 'column',
    background: palette.primary.main,
    color: palette.primary.contrastText,
  },
  title: {},
  buttonUp: {
    position: 'absolute',
    top: 8,
    right: 16,
  },
})

function Header({ classes, title, dragHandlers }) {
  return (
    <div className={cx(classes.header)} {...dragHandlers}>
      <Text variant="title" color="inherit" noWrap className={classes.title}>
        {title}
      </Text>
      <Text variant="subheading" color="inherit" noWrap>
        Second line veeeeeeeeeeery big lines line line line line and more one
        word
      </Text>
      <Text color="inherit" noWrap>
        Third line
      </Text>
    </div>
  )
}

export default withStyles(styles)(Header)
