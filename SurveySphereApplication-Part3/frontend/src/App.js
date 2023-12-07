import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Users from './components/Users';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/Signout'; // Import SignOut
import Surveys from './components/Surveys'; //Import Surveys

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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/surveys" element={<Surveys />} />
          <Route 
            path="/signin"
            element={<SignIn onSignIn={() => setIsAuthenticated(true)} />}
          />
          <Route 
            path="/signout" 
            element={<SignOut onSignOut={() => setIsAuthenticated(false)} />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;