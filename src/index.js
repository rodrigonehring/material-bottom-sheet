import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'

import BottomSheet from './BottomSheet'
import FakeContent from './FakeContent'
import Page from './FakeContent/Page'

const styles = () => ({
  fakeContent: {},
})

const App = ({ classes }) => {
  return (
    <>
      <CssBaseline />
      <div style={{ display: 'flex', height: '100%' }}>
        <BottomSheet Page={Page} Content={FakeContent} />
      </div>
    </>
  )
}

const AppStyled = withStyles(styles)(App)

ReactDOM.render(<AppStyled />, document.getElementById('root'))
