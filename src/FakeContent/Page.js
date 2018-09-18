import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import ButtonBase from '@material-ui/core/ButtonBase'
import Text from '@material-ui/core/Typography'
import IconPhone from '@material-ui/icons/Phone'
import IconStar from '@material-ui/icons/Star'
import List from './List'
import map from './map.jpg'

const styles = ({ palette }) => ({
  wrapper: {
    overflow: 'auto',
    height: '100%',
    transitionDelay: '.3s ease',
    transition: '.3s ease',
    '& img': {
      height: '100%',
      width: '100%',
    },
  },
})

function Page({ classes, containerHeight }) {
  return (
    <div className={classes.wrapper} style={{ maxHeight: containerHeight }}>
      <img src={map} />
    </div>
  )
}

export default withStyles(styles)(Page)
