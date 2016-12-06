import { connect } from 'react-redux';
import React from 'react';
import {
  setVisibilityFilter,
  SHOW_ALL,
  SHOW_FAVORITE
} from '../actions';

const ReadyHeader = ({state}) => {
  const {description, pubDate, title} = state.header;
  const {onFilterClick} = state;
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{pubDate}</p>
      <p>
        <span onClick={() => onFilterClick(SHOW_ALL)}>show all </span>
        <span onClick={() => onFilterClick(SHOW_FAVORITE)}>show favorites </span>
      </p>
    </div>
    );
};

const Header = (state) => {
  const {loading} = state;

  return loading ? <h3>Loading</h3> : <ReadyHeader state={state}/>;
};

const mapStateToProps = ({buoys}) => {
  const {loading, header, userData} = buoys;
  return {
    loading,
    header,
    userData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      onFilterClick: (filter) => {
        dispatch(setVisibilityFilter(filter));
      }
  };
};

const ConnectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);
export default ConnectedHeader;
