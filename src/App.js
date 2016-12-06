import React from 'react';
import './App.css';
import ConnectedHeader from './components/Header';
import ConnectedStations from './components/Stations';


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
