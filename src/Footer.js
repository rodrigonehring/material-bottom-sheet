import React from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Map from '@material-ui/icons/Map'
import Directions from '@material-ui/icons/Directions'

const styles = ({ palette }) => ({
  footerTitle: {},
  footer: {
    position: 'fixed',
    zIndex: 15,
    height: 48,
    width: '100%',
    bottom: 0,
    left: 0,
    background: palette.grey[100],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    // opacity: 0,
  },
  stage1: {
    borderTop: '1px solid #e0e0e0',
  },
  stage2: {
    boxShadow: '0 -1px 2px rgba(0,0,0,0.3)',
  },
  show: {
    opacity: 1,
  },
})

function Footer({ classes, stage, changeStage, phone = '47 1234-5647' }) {
  return (
    <div className={cx(classes.footer, classes[`stage${stage}`])}>
      {stage === 1 && (
        <Button id="bt-footer-phone" size="small">
          {phone}
        </Button>
      )}
      {stage === 2 && (
        <Button
          size="small"
          id="bt-footer-content"
          onClick={() => changeStage(1)}
        >
          <Map style={{ marginRight: 8 }} />
          Show Map
        </Button>
      )}
      <Button
        mini
        variant="raised"
        color="primary"
        size="small"
        id="bt-footer-routes"
      >
        <Directions style={{ marginRight: 8 }} />
        Routes
      </Button>
    </div>
  )
}

export default withStyles(styles)(Footer)
