import React, { useState } from 'react';

const CreateSurvey = () => {
    const [questions, setQuestions] = useState([{ question: '', responses: ['','','','',]}]);

    const handleChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };

    const handleResponseChange = (questionIndex, responseIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].responses[responseIndex] = value;
        setQuestions(updatedQuestions);
      };

      const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', responses: ['', '', '', ''] }]);
      };

      return (
        <div className='container my-2'>
          <h2 className='text-center'>Create Survey</h2>
          <form>
        {questions.map((question, index) => (
          <div key={index} className='mb-3'>
            <label className='form-label'>Question {index + 1}</label>
            <input
              type='text'
              className='form-control'
              value={question.question}
              onChange={(e) => handleChange(index, 'question', e.target.value)}
            />

            <label className='form-label mt-2'>Options</label>
            {question.responses.map((response, responseIndex) => (
              <input
                key={responseIndex}
                type='text'
                className='form-control'
                value={response}
                onChange={(e) => handleResponseChange(index, responseIndex, e.target.value)}
              />
            ))}
          </div>
        ))}

        <button type='button' className='btn-secondary mb-3' onClick={handleAddQuestion}>
          Add Another Question
        </button>

        
      </form>
        </div>
      );
};

export default CreateSurvey;