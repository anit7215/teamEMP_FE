import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/Login/LoginPage'; 
import Login from './pages/Login/LoginMainPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App;
