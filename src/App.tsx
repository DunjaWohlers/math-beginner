import React from 'react';
import './App.css';
import TableOfNumbers from './components/TableOfNumbers';

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
