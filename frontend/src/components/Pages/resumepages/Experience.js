import React, { useState } from 'react';
import '../../../styles/personalinfo.css'
export default function Experience() {
  const [experienceFields, setExperienceFields] = useState([{ company: '', position: '', duration: '' }]);
  console.log(experienceFields);
  const handleChange = (index, field, value) => {
    const updatedFields = [...experienceFields];
    updatedFields[index][field] = value;
    setExperienceFields(updatedFields);
  };

  const handleAddField = () => {
    setExperienceFields([...experienceFields, { company: '', position: '', duration: '' }]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...experienceFields];
    updatedFields.splice(index, 1);
    setExperienceFields(updatedFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with experienceFields data
    console.log(experienceFields);
  };

  return (
    <div style={{ color: 'black', height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}  className='herox'>
      <form style={{ width: '45%' }} onSubmit={handleSubmit}>
        {experienceFields.map((field, index) => (
          <div key={index}>
            <div className="mb-3">
              <label htmlFor={`company-${index}`} className="form-label">
                Company
              </label>
              <input
                type="text"
                className="form-control"
                id={`company-${index}`}
                name={`company-${index}`}
                value={field.company}
                onChange={(e) => handleChange(index, 'company', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`position-${index}`} className="form-label">
                Position
              </label>
              <input
                type="text"
                className="form-control"
                id={`position-${index}`}
                name={`position-${index}`}
                value={field.position}
                onChange={(e) => handleChange(index, 'position', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`duration-${index}`} className="form-label">
                Duration
              </label>
              <input
                type="number"
                className="form-control"
                id={`duration-${index}`}
                name={`duration-${index}`}
                value={field.duration}
                onChange={(e) => handleChange(index, 'duration', e.target.value)}
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
        <button type="button" className="btn " onClick={handleAddField} style={{background:'red',color:'white',margin:'2px'}}>
          Add Experience
        </button>
        <button type="submit" className="btn" style={{background:'red',color:'white'}}>
          Submit
        </button>
      </form>
    </div>
  );
}
