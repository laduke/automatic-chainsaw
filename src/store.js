import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import createFilter from 'redux-persist-transform-filter';
import reducers from './reducers';

let store = createStore(reducers,
  window.devToolsExtension && window.devToolsExtension(),
  compose(
    applyMiddleware(thunk),
    autoRehydrate())
);

const saveSubsetFilter = createFilter(
  'buoys',
  ['userData', 'stations', 'header'],
  ['userData', 'stations', 'header']
);
persistStore(store, {transforms: [saveSubsetFilter]});

export default store;
