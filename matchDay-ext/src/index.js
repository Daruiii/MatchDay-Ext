import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/styles.css';
import './css/animations.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);