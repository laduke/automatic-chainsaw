import React from 'react';
import '../public/App.css';
import ConnectedHeader from './Header';
import ConnectedStations from './Stations';


const App = () => {
  return (
    <div className="App">
      <h1>Buoy Data</h1>
      <ConnectedHeader></ConnectedHeader>
      <ConnectedStations></ConnectedStations>
    </div>
  );
};


export default App;
