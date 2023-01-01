import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain="graced-is.us.auth0.com"
      clientId="kX9nfyM9yLVkqrCpc3lB02pLPbqKjwFA"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
);
