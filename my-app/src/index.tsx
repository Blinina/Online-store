import React from 'react';
// import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/css/normalize.css'
import store from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
  </React.StrictMode>
);
