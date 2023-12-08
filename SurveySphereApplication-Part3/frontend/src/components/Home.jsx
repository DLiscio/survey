import React from 'react';

const Home = () => {
  const imageUrl = '/asset/Survey Sphere Logo.png';

  const containerStyle = {
    textAlign: 'center', // Adjust as needed
  };

  return (
    <div style = {containerStyle}>
      <h2>Survey Sphere Application</h2>
      <img src={imageUrl} alt="Your Image" style={{ maxWidth: '100%' }} />
    </div>
  );
};

export default Home;