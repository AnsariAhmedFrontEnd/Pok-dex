import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Main from './components/Main';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="App">
      <Navbar />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Main searchTerm={searchTerm} />
    </div>
  );
};

export default App;
