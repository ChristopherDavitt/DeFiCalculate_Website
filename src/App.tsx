import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar/Navbar'
import NodeCalc from './pages/NodeCalc/NodeCalc'
import Giveaway from './pages/Giveaway/Giveaway';
import LPCalc from './pages/LPCalc/LPCalc';
import '../src/components/Assets/css/styles.css';


function App() {
  // const location = useLocation(); This doesnt seem to work with react router dom 6, seems very new.
  return (
    <Router>
      <Navbar />
      <AnimatePresence exitBeforeEnter>
        <Routes location={window.location} key={window.location.pathname}> {/** This should allow for better transitions between pages, but it doesnt work */}
          <Route path="/nodes" element={<NodeCalc />} />
          <Route path="/giveaway" element={<Giveaway />} />    
          <Route path="/" element={<LPCalc />} />
        </Routes>
      </AnimatePresence>
    </Router>
    
  );
}

export default App;
