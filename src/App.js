import React from 'react';
import './App.css';
import ConnectedHeader from './components/Header';


const App = () => {
  return (
    <div className="App">
      <h1>Buoy Data</h1>
      <ConnectedHeader></ConnectedHeader>
    </div>
  );
};


export default App;
