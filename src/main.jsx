import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Auth0Provider} from "@auth0/auth0-react"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-i4wpk0diwkixalw0.us.auth0.com'
      clientId='lgph7gHHWr0oskILsHUOlrCfhfmMAMHD'
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
