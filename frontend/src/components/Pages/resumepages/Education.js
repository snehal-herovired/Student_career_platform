import React, { useState } from 'react';
import '../../../styles/personalinfo.css'
export default function Education() {
  const [educationFields, setEducationFields] = useState([{ institution: '', degree: '', year: '' }]);

  const handleChange = (index, field, value) => {
    const updatedFields = [...educationFields];
    updatedFields[index][field] = value;
    setEducationFields(updatedFields);
  };

  const handleAddField = () => {
    setEducationFields([...educationFields, { institution: '', degree: '', year: '' }]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...educationFields];
    updatedFields.splice(index, 1);
    setEducationFields(updatedFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with educationFields data
    console.log(educationFields);
  };

  return (
    <div style={{ color: 'black', height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}  className='herox'>
      <form style={{ width: '45%' }} onSubmit={handleSubmit}>
        {educationFields.map((field, index) => (
          <div key={index}>
            <div className="mb-3">
              <label htmlFor={`institution-${index}`} className="form-label">
                Institution
              </label>
              <input
                type="text"
                className="form-control"
                id={`institution-${index}`}
                name={`institution-${index}`}
                value={field.institution}
                onChange={(e) => handleChange(index, 'institution', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`degree-${index}`} className="form-label">
                Degree
              </label>
              <input
                type="text"
                className="form-control"
                id={`degree-${index}`}
                name={`degree-${index}`}
                value={field.degree}
                onChange={(e) => handleChange(index, 'degree', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`year-${index}`} className="form-label">
                Year
              </label>
              <input
                type="number"
                className="form-control"
                id={`year-${index}`}
                name={`year-${index}`}
                value={field.year}
                onChange={(e) => handleChange(index, 'year', e.target.value)}
              />
            </div>
            {index > 0 && (
              <button type="button" className="btn btn-danger" onClick={() => handleRemoveField(index)}>
                Remove
              </button>
            )}
            <hr />
          </div>
        ))}
        <button type="button" className="btn " onClick={handleAddField}  style={{background:'red',color:'white',margin:'2px'}}>
          Add Education
        </button>
        <button type="submit" className="btn" style={{background:'red',color:'white'}}>
          Submit
        </button>
      </form>
    </div>
  );
}
