import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoot from './App.tsx'
import './index.css'
import {getLocalStoredTheme, setTheme} from "./utils/theme.tsx";

setTheme(getLocalStoredTheme());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>,
)
