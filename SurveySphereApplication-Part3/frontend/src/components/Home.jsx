import React from 'react';

const Home = () => {
  const imageUrl = '/asset/Survey Sphere Logo 2023-11-29 211239.jpg';

  return (
    <div>
      <h2>Survey Sphere Application Logo</h2>
      <img src={imageUrl} alt="Your Image" style={{ maxWidth: '100%' }} />
    </div>
  );
};

export default Home;