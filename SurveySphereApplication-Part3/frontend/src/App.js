

import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Make sure you import Route from react-router-dom
import { Navigate } from 'react-router-dom';
import Home from './components/Home'; // Import your Home component
import Users from './components/Users'; // Import your Users component
import Signout from './components/Signout'; // Import your Users component
import Profile from './components/Profile';
import SignUp from './components/SignUp'; // Import your SignUp component
import SignIn from './components/SignIn'; // Import your SignIn component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <Router>
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signout" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
           path="/signin"
           element={
           <SignIn
            onSignIn={() => setIsAuthenticated(true)}
             isAuthenticated={isAuthenticated} 
              Navigate to="/profile" replace 
    />
    
  }
/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;