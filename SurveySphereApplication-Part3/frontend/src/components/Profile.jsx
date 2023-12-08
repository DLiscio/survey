import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const Profile = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('authToken');
  const userId = token ? jwtDecode(token).userId : null;

  async function getData() {
    if (!userId) {
      setError("User ID not found.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
 
      const result = await response.json();
      setData(Array.isArray(result) ? result : [result]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An unexpected error occurred");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (error) {
    return <div className='container my-2'>Error: {error}</div>;
  }

  return (
    <div className='container my-2'>
      <h2 className='text-center'>User Profile</h2>
      <div className='row'>
        {data.map((ele, index) => (
          <div key={index} className='col-3'>
            <div className='card-body'>
              <h5 className='card-title'>{ele.username}</h5>
              <h6 className='card-subtitle mb-2 text-muted'>{ele.email}</h6>
              {/* Additional user info */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
