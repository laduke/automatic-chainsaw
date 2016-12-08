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

const Header = (state) => {
  const {description, pubDate, title} = state.header;
  const {onFilterClick, loading} = state;
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
      <Loading loading={loading}/>
    </div>
    );
};

const Loading = ({loading}) => {
  if(loading) {
    return <h4 style={{position: 'fixed', top: 0, right: 10}}> loading </h4>;
  } else {
    return null; 
  }
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
