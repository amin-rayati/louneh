import React from 'react'
import ReactDOM from 'react-dom'
import { CookiesProvider } from 'react-cookie'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FilterProvider } from './context/FilterProvider'
ReactDOM.render(
  <FilterProvider>
    <App />
  </FilterProvider>,
  document.getElementById('root')
)

reportWebVitals()
ReactDOM.render(
  <CookiesProvider>
    <FilterProvider>
      <App />
    </FilterProvider>
  </CookiesProvider>,

  document.getElementById('root')
)
