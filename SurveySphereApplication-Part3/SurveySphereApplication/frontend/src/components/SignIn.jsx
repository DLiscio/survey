import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const SignIn = ({ onSignIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const getUser = formData; // Pass formData instead of creating a new object
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      body: JSON.stringify(getUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
    }
    if (response.ok) {
      console.log(result);
    }

    const isAuthenticated = true;

    onSignIn(isAuthenticated);
    navigate('/profile');
  };

  return (
    <div className='container my-2'>
      <h2 className='text-center'>Sign In Form</h2>

      <form onSubmit={handleSignIn}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            name="email" // Specify the name attribute
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            name="password" // Specify the name attribute
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
