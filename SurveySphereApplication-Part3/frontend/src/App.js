import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Users from './components/Users';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut'; // Import SignOut
import EditProfile from './components/EditProfile';
import jwtDecode from 'jwt-decode';
import Surveys from './components/Surveys'; //Import Surveys

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getUserInfo = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.userId;
    }
    return null;
  };

  const userId = getUserInfo();

  return (
    <div className="App">
      <Router>
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/edit-profile" element={<EditProfile userId={userId} />} />
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