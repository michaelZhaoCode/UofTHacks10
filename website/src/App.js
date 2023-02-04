//was done using rface (from exetension)
//import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Lobby from './components/Lobby';
import { AppContextProvider } from './components/Context';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Reset from './components/Reset';
import Dashboard from './components/Dashboard';
import "./App.css";
import Dalle from './components/Dalle';

const App = () => {
  // All hooks are defined in App.js (highest component & Provided as context in the return statement)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
      }, 2000);
  }, []);


  return (
    // NOTE: this context is also provided for its grandchildren (X need several Providers)
    <div className='App'>
      {loading ? (
                <div id="loading-page">
                    <div id="loader">
                        <div className="particles element">
                            <div className="spark1 spark element"><div className="particle1 particle element" /></div>
                            <div className="spark2 spark element"><div className="particle2 particle element" /></div>
                            <div className="spark3 spark element"><div className="particle3 particle element" /></div>
                            <div className="spark4 spark element"><div className="particle4 particle element" /></div>
                            <div className="spark5 spark element"><div className="particle5 particle element" /></div>
                            <div className="spark6 spark element"><div className="particle6 particle element" /></div>
                            <div className="spark7 spark element"><div className="particle7 particle element" /></div>
                            <div className="spark8 spark element"><div className="particle8 particle element" /></div>
                            <div className="spark9 spark element"><div className="particle9 particle element" /></div>
                            <div className="spark10 spark element"><div className="particle10 particle element" /></div>
                            <div className="spark11 spark element"><div className="particle11 particle element" /></div>
                            <div className="spark12 spark element"><div className="particle12 particle element" /></div>
                        </div>
                        <div className="ray element" />
                        <div className="sphere element" />
                    </div>
                </div>
            ) : (
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
    </AppContextProvider>)}
    </div>

  );
}

// export to index.js
export default App; 
