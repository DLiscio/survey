import React, { useState } from 'react';

const EditProfile = () => {
  const [profileData, setProfileData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [updateStatus, setUpdateStatus] = useState('');
  const [error, setError] = useState('');

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

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateStatus('');
    setError('');

    if (profileData.password !== profileData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId'); // Retrieve userId from local storage

    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: profileData.username,
          email: profileData.email,
          password: profileData.password,
        }),
      });

      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || 'Error updating profile.');
        }
        setUpdateStatus('Profile updated successfully!');
      } else {
        const textResult = await response.text(); // Handle text response
        throw new Error(textResult || 'Error: Server did not return a JSON response.');
      }
    } catch (error) {
      setError(error.message || 'Error occurred while updating profile.');
    }
  };

  return (
    <div className='container my-2' style={containerStyle}>
      <h2 className='text-center'>Edit Profile</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {updateStatus && <div className="alert alert-success">{updateStatus}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" style={labelStyle}>Username</label>
          <input
            style={inputStyle}
            type="text"
            className="form-control"
            name="username"
            value={profileData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" style={labelStyle}>Email</label>
          <input
            style={inputStyle}
            type="email"
            className="form-control"
            name="email"
            value={profileData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" style={labelStyle}>Password</label>
          <input
            style={inputStyle}
            type="password"
            className="form-control"
            name="password"
            value={profileData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" style={labelStyle}>Confirm Password</label>
          <input
            style={inputStyle}
            type="password"
            className="form-control"
            name="confirmPassword"
            value={profileData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;