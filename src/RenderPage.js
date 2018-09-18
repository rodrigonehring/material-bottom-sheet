import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = ({ palette }) => ({
  page: {
    background: palette.background.paper,
    width: '100%',
    paddingBottom: 48 + 16,

    height: '100%',
    position: 'fixed',
    left: 0,
    top: 0,
  },
})

class RenderPage extends PureComponent {
  // componentDidUpdate(prevProps) {
  //   Object.keys(this.props).forEach((key) => {
  //     if (this.props[key] !== prevProps[key]) {
  //       console.log(key, this.props[key])
  //     }
  //   })
  // }
  render() {
    const { classes, Page, ...props } = this.props

    return (
      <div className={classes.page}>
        <Page {...props} />
      </div>
    )
  }
}

export default withStyles(styles)(RenderPage)
