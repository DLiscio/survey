import React from 'react';

const Home = () => {
  const imageUrl = '/asset/Survey Sphere Logo.png';

  return (
    <div>
      <h2>Survey Sphere Application Logo</h2>
      <img src={imageUrl} alt="Your Image" style={{ maxWidth: '100%' }} />
    </div>
  );
};

export default Home;