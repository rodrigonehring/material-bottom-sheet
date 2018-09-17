import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'

const styles = ({ palette }) => ({
  tinyHeaderTitle: {},
  tinyHeader: {
    position: 'absolute',
    zIndex: 10,
    height: 56,
    width: '100%',
    top: 0,
    left: 0,
    background: palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    padding: 8,
    transition: '.3s ease',
    opacity: 0,
    color: palette.primary.contrastText,
  },
  show: {
    opacity: 1,
  },
})

function TinyHeader({ classes, show }) {
  return (
    <div className={cx(classes.tinyHeader, { [classes.show]: show })}>
      <IconButton color="inherit">
        <ArrowBack />
      </IconButton>
      <Typography color="inherit" className={classes.tinyHeaderTitle}>
        Some nice title
      </Typography>
    </div>
  )
}

export default withStyles(styles)(TinyHeader)
