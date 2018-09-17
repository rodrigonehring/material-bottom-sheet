import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import ButtonBase from '@material-ui/core/ButtonBase'
import Text from '@material-ui/core/Typography'
import IconPhone from '@material-ui/icons/Phone'
import IconStar from '@material-ui/icons/Star'
import List from './List'

const styles = ({ palette }) => ({
  wrapper: {},
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  action: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '16px 0',
    color: palette.primary.main,
    overflow: 'hidden',
    '& span': {
      marginTop: 8,
    },
  },
  content: {
    padding: 16,
  },
})

function FakeContent({ classes }) {
  console.log('render FakeContent')
  return (
    <div className={classes.wrapper}>
      <div className={classes.actions}>
        <ButtonBase centerRipple focusRipple className={classes.action}>
          <IconPhone color="inherit" />
          <Text variant="button" color="inherit">
            Action 1
          </Text>
        </ButtonBase>

        <ButtonBase centerRipple focusRipple className={classes.action}>
          <IconStar color="inherit" />
          <Text variant="button" color="inherit">
            Action 2
          </Text>
        </ButtonBase>
      </div>

      <Divider />
      <div className={classes.content}>
        <Text>Some fake content</Text>
      </div>

      <Divider />
      <div className={classes.content}>
        <Text>Some fake content</Text>
      </div>
      <Divider />
      <div className={classes.content}>
        <Text>Some fake content</Text>
      </div>
      <Divider />
      <div className={classes.content}>
        <Text>Some fake content</Text>
      </div>
      <Divider />

      <List />

      <Divider />
      <div className={classes.content}>
        <Text>Some fake content</Text>
      </div>

      <Divider />
      <div className={classes.content}>
        <Text>Some fake content</Text>
      </div>
      <Divider />
      <div className={classes.content}>
        <Text>Some fake content</Text>
      </div>
      <Divider />
      <div className={classes.content}>
        <Text>Some fake content</Text>
      </div>
      <Divider />
    </div>
  )
}

export default withStyles(styles)(FakeContent)
