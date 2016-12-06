import { connect } from 'react-redux';
import React from 'react';


const ReadyHeader = ({header}) => {
  const {description, pubDate, title} = header;
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{pubDate}</p>
    </div>
    );
};

const Header = (state) => {
  const {loading, header} = state;

  return loading ? <h3>Loading</h3> : <ReadyHeader header={header}/>;
};

const mapStateToProps = ({buoys}) => {
  const {loading, header} = buoys;
  return {
    loading,
    header
  };
};


const ConnectedHeader = connect(mapStateToProps)(Header);
export default ConnectedHeader;
