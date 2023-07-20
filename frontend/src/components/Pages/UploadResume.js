import React, { useState } from 'react';
import './ResumeUploader.css';
import axios from 'axios';
import { Url } from '../../connection';
import usePostRequest from '../customeHooks/SendData';

const ResumeUploader = () => {
  const mutation = usePostRequest(`${Url}/resume/upload`);
  const [resume, setResume] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
      uploadFile(file);
    } else {
      setResume(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
      uploadFile(file);
    }
  };

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('studentId', localStorage.getItem('studentId'));
      formData.append('batchId', localStorage.getItem('batchId'));

      mutation.mutate(formData);
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="resume-uploader">
      <h2>Upload Your Resume</h2>
      <div className="file-input-container">
        <label htmlFor="resume-file" className="file-input-label">
          <input
            id="resume-file"
            name="resume"
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
          />
          {resume ? 'Resume Selected' : 'Select or Drag & Drop a PDF File'}
        </label>
      </div>
      <div className="drop-area" onDragOver={handleDragOver} onDrop={handleDrop}>
        Drop PDF File Here
      </div>
          {mutation.isSuccess ?'Resume Uploaded' :'not uploaded'}
      {resume && (
        <div className="resume-preview">
          <h3>Resume Preview</h3>
          <embed src={URL.createObjectURL(resume)} width="100%" height="500px" />
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
