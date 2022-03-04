import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import generateStore from './redux/store'
import {Provider} from 'react-redux'
const store = generateStore()


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

