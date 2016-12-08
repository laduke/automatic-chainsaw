import { connect } from 'react-redux';
import React from 'react';
import {
  setVisibilityFilter,
  SHOW_ALL,
  SHOW_FAVORITE
} from '../actions';

const highlight = (a, b) => {
  return a === b ? {backgroundColor: 'teal'} : {};
};

const ReadyHeader = ({state}) => {
  const {description, pubDate, title} = state.header;
  const {onFilterClick} = state;
  const {visibilityFilter} = state.userData;

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{pubDate}</p>
      <p>
      <span
        style={highlight(visibilityFilter, SHOW_ALL)}
        onClick={() => onFilterClick(SHOW_ALL)}>show all </span>
      <span
        style={highlight(visibilityFilter, SHOW_FAVORITE)}
        onClick={() => onFilterClick(SHOW_FAVORITE)}>show favorites </span>
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
