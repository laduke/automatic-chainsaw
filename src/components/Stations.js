import { connect } from 'react-redux';
import React from 'react';
import R from 'ramda';
import { toggleFavorite } from '../actions';


const Container = children => (<ul>{children}</ul>);
const Star = b => b ? <span>&#x2605; </span> : <span>&#x2606; </span>;

const StationData = (val, key, obj) => {
  return (
    <li key={val + key}>
      <b>{key}: </b><span>{val}</span>
    </li>
  );
};

const PropertyList = R.pipe(
  R.prop('description'),
  R.pick(['Location', 'Significant Wave Height', 'Average Period', 'Water Temperature']),
  R.mapObjIndexed(StationData),
  R.values,
  Container
);

const Station = R.curry((dispatches, station) => {
  const {title, id} = station;
  return (
    <li key={id} >
      <h4>
      <span
        onClick={() => dispatches.onStationClick(id)}>{Star(station.favorite)}
      </span>
      <span>{title}</span>
      </h4>
      {PropertyList(station)}
    </li>
  );
});

const mapStations = ({stations, dispatches}) => {
  return R.map(Station(dispatches), stations); 
};

const StationList = R.pipe(
  mapStations,
  R.values,
  Container
);

const filterStations = R.curry((filter, stations) => {
  switch (filter) {
  case 'SHOW_FAVORITE':
    return R.filter(R.prop('favorite'), stations);
  default: { return stations; }
  }
});

const mergeLocal = (ndbc) => {
  return R.mergeWith(R.merge, ndbc.userData.stations, ndbc.stations);
};

const getVisibleStations = (ndbc) => {
  const filter = ndbc.userData.visibilityFilter;
  return R.pipe(
    mergeLocal,
    filterStations(filter),
    R.values,
    R.sortBy(R.prop('title'))
  )(ndbc);
};

const mapStateToProps = ({ndbc}) => (
  {
    stations: getVisibleStations(ndbc),
    userData: ndbc.userData
  }
);

const mapDispatchToProps = (dispatch) => {
  return {
    dispatches: {
      onStationClick: (id) => {
        dispatch(toggleFavorite(id));
      }
    }
  };
};


const ConnectedStations = connect(mapStateToProps, mapDispatchToProps)(StationList);

export default ConnectedStations;
