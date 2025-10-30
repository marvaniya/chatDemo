import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { StrictMode } from 'react';

const basePath = import.meta.env.DEV ? '/' : '/test';

createRoot(document.getElementById('root')).render(

  <BrowserRouter basename={basePath}>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
)
