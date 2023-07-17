import React, { useState } from 'react';
import '../../../styles/personalinfo.css'
export default function MyForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: [],
    link: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleTechnologiesChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      technologies: selectedOptions,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with formData
    console.log(formData);
  };

  return (
    <div style={{ color: 'red', height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}  className='herox'>
      <form style={{ width: '45%' }} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="technologies" className="form-label">
            Technologies
          </label>
          <select multiple className="form-control" id="technologies" name="technologies" value={formData.technologies} onChange={handleTechnologiesChange}>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">Reactjs</option>
            <option value="Node.js">Nodejs</option>
            <option value="Express.js">Expressjs</option>
            <option value="MaterialUI">MaterialUI</option>
            <option value="Bootstrap">Bootstrap</option>
            <option value="MongoDB">MongoDB</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="link" className="form-label">
            Link
          </label>
          <input type="text" className="form-control" id="link" name="link" value={formData.link} onChange={handleChange} />
        </div>
        <button type="submit" className="btn" style={{background:'red',color:'white',margin:'2px'}}>
          Done
        </button>
      </form>
    </div>
  );
}
