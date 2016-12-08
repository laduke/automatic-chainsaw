import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import './public/index.css';
import store from './store';
import {fetchBuoys} from './actions/index';

store.dispatch(fetchBuoys());

ReactDOM.render(
    <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
