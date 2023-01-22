//was done using rface (from exetension)
//import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Lobby from './components/Lobby';
import { AppContextProvider } from './components/Context';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Reset from './components/Reset';
import Dashboard from './components/Dashboard';
import "./App.css";
import Dalle from './components/Dalle';

const App = () => {
  // All hooks are defined in App.js (highest component & Provided as context in the return statement)



  return (
    // NOTE: this context is also provided for its grandchildren (X need several Providers)
    <div className='App'>
    <AppContextProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/dalle" element={<Dalle />} />
          {/* <Route path="" element={} /> */}
        </Routes>
      </Router>
    </AppContextProvider>
    </div>

  );
}

// export to index.js
export default App; 
