import R from 'ramda';
import { combineReducers } from 'redux';

import {
  BUOYS_REQUEST,
  BUOYS_SUCCESS,
  BUOYS_FAILURE,
  TOGGLE_FAVORITE,
  SET_VISIBILITY_FILTER
} from '../actions/index';

export const loading = (state = false, action) => {
  switch (action.type) {
    case BUOYS_REQUEST: {
      return true;
    }
    case BUOYS_SUCCESS: {
      return false;
    }
    case BUOYS_FAILURE: {
      return false;
    }
    default: {
      return state;
    }
  }
};

export const header = (state = {}, action) => {
  switch (action.type) {
    case BUOYS_SUCCESS: {
      return R.pick(['title', 'pubDate', 'description'])(action.payload);
    }
    case BUOYS_FAILURE: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export const stations = (state = {}, action) => {
  switch (action.type) {
  case BUOYS_SUCCESS: {
    return R.path(['payload','item'])(action);
  }
  case BUOYS_FAILURE: {
    return state;
  }
  default: {
    return state;
  }
  }
};

export const userData = (state = {}, action) => {
  switch (action.type) {
  case TOGGLE_FAVORITE: {
    const idLens = R.lensPath(['stations', action.payload, 'favorite']);

    return R.over(idLens, R.not, state);
  }
  case SET_VISIBILITY_FILTER: {
    return R.assoc('visibilityFilter', action.payload, state);
  }
  default: {
    return state;
  }
  }
};

const buoys = combineReducers({
  loading,
  header,
  stations,
  userData
});

export default buoys;
