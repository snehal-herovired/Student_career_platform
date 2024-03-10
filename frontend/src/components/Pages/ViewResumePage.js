import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Url } from '../../connection';
import useGetRequest from '../customeHooks/fetchData';

const ResumeViewer = () => {
  const [resumeUrl, setResumeUrl] = useState('');
  const id = localStorage.getItem('studentId');
  // console.log(id, "studentid from localstorage");
  const { data, isError, isLoading, refetch } = useGetRequest(`${Url}/resume/${id}`);

  useEffect(() => {
    if (data && data.resume.resumePdf) {
      fetchResume(data.resume.resumePdf);
    }
  }, [data]);

  const fetchResume = async (pdfUrl) => {
    try {
      const response = await axios.get(`${Url}/fetch-resume/${pdfUrl}`, {
        responseType: 'arraybuffer',
      });
      const fileBlob = new Blob([response.data], { type: 'application/pdf' });
      const fileUrl = URL.createObjectURL(fileBlob);
      setResumeUrl(fileUrl);
    } catch (error) {
      console.error('Error fetching resume:', error);
    }
  };

  return (
    <div className="resume-viewer">
      {resumeUrl ? (
        <embed src={resumeUrl} type="application/pdf" width="100%" height="600px" />
      ) : (
        <p>No resume available</p>
      )}
    </div>
  );
};

export default ResumeViewer;
