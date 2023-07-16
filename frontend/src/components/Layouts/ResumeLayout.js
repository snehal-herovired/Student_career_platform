import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

export default function ResumeLayout() {
  const resumeHeader = {
    height: '30%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: '20px',
  };

  const resumeBody = {
    height: '70%',
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    background: 'rgb(180, 180, 200, 0.2)',
    borderRadius: '5px',
    boxShadow: '16px 40px 53px -8px rgba(194, 186, 194, 1)',
    padding: '20px',
    overflowY: 'auto', // Add scrollable overflow for the content
  };

  return (
    <div style={{ height: '100%', width: '100%', padding: '2px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <div style={resumeHeader}>
        <h2>Create your resume here...</h2>
        <h5>Provide the following information here...</h5>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink to="info">Personal Information</NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink to="experience">Experience</NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink to="education">Education</NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink to="skills">Skills</NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink to="projects">Projects</NavLink>
            </li>
          </ol>
        </nav>
      </div>
      <div style={resumeBody}>
        <Outlet />
      </div>
    </div>
  );
}
