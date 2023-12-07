import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = ({ onSignOut }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Place for clearing any stored authentication data
    localStorage.removeItem('authToken'); 

    onSignOut(); // Updating isAuthenticated state in App.js
    navigate('/'); // Redirect to home page
  }, [navigate, onSignOut]);

  return null; // Render nothing or a sign-out message
};

export default SignOut;