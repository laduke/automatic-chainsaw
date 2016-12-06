import { fetchJson } from '../helpers';

export const BUOYS_REQUEST = 'BUOYS_REQUEST';
export const BUOYS_SUCCESS = 'BUOYS_SUCCESS';
export const BUOYS_FAILURE = 'BUOYS_FAILURE';

const BUOY_URL = '/api/buoys?lat=40N&lon=73W&radius=100';

const requestBuoys = () => {
  return {
    type: BUOYS_REQUEST
  };
};

const successBuoys = json => {
  return {
    type: BUOYS_SUCCESS,
    payload: json
  };
};


const failureBuoys = err => {
  return {
    type: BUOYS_FAILURE,
    payload: err
  };
};

export const fetchBuoys = (URL = BUOY_URL) => {
  return dispatch => {
    dispatch(requestBuoys());
    fetchJson(URL).fork(
      err => dispatch(failureBuoys(err)),
      res => dispatch(successBuoys(res))
    );
  };
};
