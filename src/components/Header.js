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

export const Description = ({description}) => <p>{description}</p>;
export const PublicationDate = ({pubDate}) => <p>{pubDate}</p>;
export const Title = ({title}) => <h3>{title}</h3>; 
export const FilterLinks = ({visibilityFilter, onFilterClick}) => (
  <p>
    <span
      style={highlight(visibilityFilter, SHOW_ALL)}
      onClick={() => onFilterClick(SHOW_ALL)}>show all </span>
    <span
      style={highlight(visibilityFilter, SHOW_FAVORITE)}
      onClick={() => onFilterClick(SHOW_FAVORITE)}>show favorites </span>
  </p>
);

const Header = (state) => {
  const {description, pubDate, title} = state.header;
  const {onFilterClick, loading} = state;
  const {visibilityFilter} = state.userData;

  return (
    <div>
      <Title title={title} />
      <Description description={description} />
      <PublicationDate pubDate={pubDate} />
      <FilterLinks
        visibilityFilter={visibilityFilter}
        onFilterClick={onFilterClick} />
      <Loading loading={loading}/>
    </div>
    );
};

export const Loading = ({loading}) => {
  if(loading) {
    return <h4 style={{position: 'fixed', top: 0, right: 10}}> loading </h4>;
  } else {
    return null; 
  }
};

const mapStateToProps = ({ndbc}) => {
  const {loading, header, userData} = ndbc;
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
