import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const SignIn = ({ onSignIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const containerStyle = {
    textAlign: 'center', 
  };

  const inputStyle = {
    width: '300px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '15px',
  };

  const labelStyle = {
    fontSize: '18px',
    marginTop: '15px',
  };


  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const result = await response.json();
      console.log(result.error); // Log or handle the error appropriately
      return;
    }

    const { token } = await response.json();
    localStorage.setItem('authToken', token); // Store the JWT token
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId; // Decode the token to get userId
    localStorage.setItem('userId', userId); // Store userId for later use

    onSignIn(true);
    navigate('/profile');
  };

  return (
    <div className='container my-2' style={containerStyle}>
      <h2 className='text-center'>Sign In Form</h2>
      <form onSubmit={handleSignIn}>
        <div className="mb-3">
          <label className="form-label" style={labelStyle}>Email address</label>
          <input
            style={inputStyle}
            type="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            name="email"
          />
        </div>
        <div className="mb-3">
          <label className="form-label" style={labelStyle}>Password</label>
          <input
            style={inputStyle}
            type="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
