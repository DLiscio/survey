import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode'; // You might need to install this package

const CreateSurvey = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([{ questionText: '', responseType: 'text', options: [], scale: 5 }]);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [createdBy, setCreatedBy] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('authToken'); // Replace 'authToken' with your token's key
        if (token) {
            const decodedToken = jwtDecode(token);
            setCreatedBy(decodedToken.userId); // Adjust according to your token's structure
        }
    }, []);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleQuestionChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].questionText = value;
        setQuestions(updatedQuestions);
    };

    const handleResponseTypeChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].responseType = value;
        updatedQuestions[index].options = value === 'multipleChoice' ? [''] : [];
        updatedQuestions[index].scale = value === 'rating' ? 5 : null;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(updatedQuestions);
    };

    const handleAddOption = (questionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.push('');
        setQuestions(updatedQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { questionText: '', responseType: 'text', options: [], scale: 5 }]);
    };

    const validateForm = () => {
        if (!title || !questions.length) {
            setError('Title and at least one question are required.');
            return false;
        }
        // Additional validation logic can be added here
        setError('');
        return true;
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!validateForm()) return;
  
      const token = localStorage.getItem('authToken');
      if (!token) {
          setError('You are not logged in.');
          return;
      }
  
      // Retrieve the user ID from local storage
      const createdBy = localStorage.getItem('userId');
      if (!createdBy) {
          setError('User ID not found. Please sign in again.');
          return;
      }
  
      const config = {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': token
          }
      };
  
      setSubmitting(true);
      try {
          await axios.post('http://localhost:5000/surveys', { title, description, questions, createdBy }, config);
          setSuccess(true);
          setTitle('');
          setDescription('');
          setQuestions([{ questionText: '', responseType: 'text', options: [], scale: 5 }]);
      } catch (error) {
          setError('Error submitting survey: ' + error.message);
      } finally {
          setSubmitting(false);
      }
  };
  

    return (
        <div className='container my-2'>
            <h2>Create Survey</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">Survey created successfully!</div>}
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label>Title</label>
                    <input type='text' className='form-control' value={title} onChange={handleTitleChange} />
                </div>
                <div className='mb-3'>
                    <label>Description</label>
                    <textarea className='form-control' value={description} onChange={handleDescriptionChange}></textarea>
                </div>
                {questions.map((question, index) => (
                    <div key={index} className='mb-3'>
                        <label>Question {index + 1}</label>
                        <input type='text' className='form-control' value={question.questionText} onChange={(e) => handleQuestionChange(index, e.target.value)} />
                        <label>Response Type</label>
                        <select className='form-control' value={question.responseType} onChange={(e) => handleResponseTypeChange(index, e.target.value)}>
                            <option value="text">Text</option>
                            <option value="multipleChoice">Multiple Choice</option>
                            {/* Add other option types here */}
                        </select>
                        {question.responseType === 'multipleChoice' && (
                            <>
                                {question.options.map((option, optionIndex) => (
                                    <input key={optionIndex} type='text' className='form-control' value={option} onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)} />
                                ))}
                                <button type='button' onClick={() => handleAddOption(index)}>Add Option</button>
                            </>
                        )}
                        {/* Add input for scale if responseType is 'rating' */}
                    </div>
                ))}
                <button type='button' onClick={handleAddQuestion}>Add Another Question</button>
                <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Survey'}</button>
            </form>
        </div>
    );
};

export default CreateSurvey;
