import React, { useState, useEffect } from 'react';


const Users = () => {
    const [users, setUsers] = useState([]);

    const containerStyle = {
      textAlign: 'center', 
    };

    const listStyle = {
      listStylePosition: 'inside',
      padding: '8px 0',
    };

    useEffect(() => {
      // Fetch the list of users from your backend API
      const fetchUsers = async () => {
        try {
          const response = await fetch("http://localhost:5000/users");
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
  
      fetchUsers();
    }, []); // The empty dependency array ensures that the effect runs only once after the initial render
  
    return (
      <div style = {containerStyle}>
        <h2>User List</h2>
        <ul style = {listStyle}>
          {users.map((user) => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul>
      </div>
    );
  };

export default Users
