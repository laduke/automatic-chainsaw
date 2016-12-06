import { connect } from 'react-redux';
import React from 'react';
import R from 'ramda';

const Container = children => (<ul>{children}</ul>);

const StationData = (val, key, obj) => {
  return (
    <li key={obj.id + val}>
      <b>{key}: </b><span>{val}</span>
    </li>
  );
};

const PropertyList = R.pipe(
  R.prop('description'),
  R.mapObjIndexed(StationData),
  R.values,
  Container
);

const Station = (station) => {
  const {title, id} = station;
  return (
    <li key={id}>
      <h4>{title}</h4>
      {PropertyList(station)}
    </li>
  );
};


const StationList = R.pipe(
  R.prop('stations'),
  R.map(Station),
  R.values,
  Container
);

const mapStateToProps = ({buoys}) => ({stations: buoys.stations});


const ConnectedStations = connect(mapStateToProps)(StationList);
export default ConnectedStations;
