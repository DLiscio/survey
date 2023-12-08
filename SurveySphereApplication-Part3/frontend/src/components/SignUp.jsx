import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

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

  // eslint-disable-next-line no-unused-vars
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { username, email, password } = formData;
    const addUser = { username, email, password };

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        body: JSON.stringify(addUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        console.error(result.error);
        setError(result.error);
      } else {
        console.log(result);
        setError("");
        setFormData({
          username: '',
          email: '',
          password: '',
        });

        navigate('/users');
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div style = {containerStyle}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label" style={labelStyle}>
            Name
          </label>
          <input
            style={inputStyle} 
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label" style={labelStyle}>
            Email
          </label>
          <input
            style={inputStyle} 
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" style={labelStyle}>
            Password
          </label>
          <input
            style={inputStyle} 
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SignUp;
