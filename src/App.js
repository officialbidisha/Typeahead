import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Typehead from './Typeahead';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Typehead ></Typehead>
      </header>
    </div>
  );
}

export default App;
