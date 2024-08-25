import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import { AuthContextProvider } from './context/AuthContext';
import { ConversationContextProvider } from './context/ConversationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
     <AuthContextProvider>
      <ConversationContextProvider>
      <App />
      </ConversationContextProvider>
     </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
