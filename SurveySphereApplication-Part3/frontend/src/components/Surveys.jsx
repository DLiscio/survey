import React from 'react';
import { Link } from 'react-router-dom';

const Surveys = () => {
return (
    <div className='container my-2'>
        <h2 className='text-center'>Surveys</h2>

    <div classname='cs container'>
        <p>
            <Link to="/CreateSurvey">Create Survey</Link>
        </p>
        
    </div>
    </div>


);
};

export default Surveys;