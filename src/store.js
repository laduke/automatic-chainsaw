import { createStore } from 'redux';
import reducers from './reducers';

let store = createStore(reducers,
  window.devToolsExtension && window.devToolsExtension()
);

export default store;
