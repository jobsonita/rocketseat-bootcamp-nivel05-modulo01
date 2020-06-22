import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { AppProvider } from './context'

import Routes from './routes'

import GlobalStyle from './styles/global'

const App: React.FC = () => (
  <>
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>
    </Router>

    <GlobalStyle />
  </>
)

export default App
