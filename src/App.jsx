import React from 'react';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/MenuNavegacion/header'
import MenuNav from './components/sprint2/NavNavegacion/headerNav'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <MenuNav />
        <Footer />
      </div>
    </Router>
  );
}

export default App;