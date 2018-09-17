import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = ({ palette }) => ({
  content: {
    background: palette.background.paper,
    width: '100%',
  },
})

class RenderInnerContent extends PureComponent {
  // componentDidUpdate(prevProps) {
  //   Object.keys(this.props).forEach((key) => {
  //     if (this.props[key] !== prevProps[key]) {
  //       console.log(key, this.props[key])
  //     }
  //   })
  // }
  render() {
    const { classes, Content, ...props } = this.props

    return (
      <div className={classes.content}>
        <Content {...props} />
      </div>
    )
  }
}

export default withStyles(styles)(RenderInnerContent)
