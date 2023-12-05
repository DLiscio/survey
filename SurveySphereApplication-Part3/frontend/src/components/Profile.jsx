import React,{useState, useEffect} from 'react';

const Profile = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  async function getData() {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`);
      const result = await response.json();

      if (!response.ok) {
        console.error(result.error);
        setError(result.error);
      } else {
        setData(result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An unexpected error occurred");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='container my-2'>
      <h2 className='text-center'>All Data</h2>
      <div className='row'>
        {data.map((ele) => (
          <div key={ele._id} className='col-3'>
            <div className='card-body'>
              <h5 className='card-title'>{ele.username}</h5>
              <h6 className='card-subtitle mb-2 text-muted'>{ele.email}</h6>
              <p className='text-muted'>{ele.password}</p>
              <a href="#" className='card-link'>
                Delete
              </a>
              <a href="#" className='card-link'>
                Edit
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;








    