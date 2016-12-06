import {Future} from 'ramda-fantasy';


export const fetchJson = URI => {
  return new Future(function(reject, resolve) {
    fetch(URI)
      .then(response => response.json().then(json => {
        if(!response.ok) {reject(json);}
        resolve(json);
      })
      .catch(err => reject(err))
      );
  });
};
