import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import TableOfNumbers from './components/TableOfNumbers';
import ColorPicker from "./components/ColorPicker";

function App() {

    return (
    <div className="App">
      <TableOfNumbers
          maximum={100}
      />

    </div>
  );
}

export default App;
