import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ReactDOM from 'react-dom';
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar/Navbar'
import NodeCalc from './pages/NodeCalc/NodeCalc'
import Giveaway from './pages/Giveaway/Giveaway';
import LPCalc from './pages/LPCalc/LPCalc';
import '../src/components/Assets/css/styles.css';


export default function App () {
  const location = useLocation()
  return (
    <>
      <Navbar />
      <main style={{overflowX: 'hidden'}}>
      <AnimatePresence exitBeforeEnter >
        <Routes location={location} key={location.pathname} > {/** This should allow for better transitions between pages, but it doesnt work */}
          <Route path="/nodes" element={<NodeCalc />} />
          <Route path="/giveaway" element={<Giveaway />} />    
          <Route path="/" element={<LPCalc />} />
        </Routes>
      </AnimatePresence>
      </main>
    </>
  );
}
