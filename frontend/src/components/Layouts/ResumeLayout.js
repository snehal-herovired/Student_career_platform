import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import '../../styles/drawer.css'
export default function ResumeLayout() {
  const resumeHeader = {
    height: '5%',
    width: '90%',
    display: 'flex',
    marginBottom: '5px',
    marginTop: '10px',
  
    border:'rgb(192, 194, 192,0.1)',
    

  };
  const navigate = useNavigate();
  let btnStyle = {
      border: "1px solid #6b050b",
      height: '30px',
      width: '70px',
      color: 'red',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

  }

  const resumeBody = {

    width: '90%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    background: 'rgb(180, 180, 200, 0.2)',
    borderRadius: '5px',
    boxShadow: '16px 40px 53px -8px rgba(194, 186, 194, 1)',
    padding: '20px',
    overflowY: 'auto', // Add scrollable overflow for the content
  };


  const [resume, setResume] = useState({
    studentId: '',
    batchId: '',
    about: '',
    twitter: '',
    lindkedIn: '',
    facebook: '',
    github: '',
    contactInformation: {
      email: '',
      phone: '',
      address: '',
    },
    education: [
      {
        institution: '',
        degree: '',
        year: 0,
      },
    ],
    experience: [
      {
        company: 'XYZ Corp',
        position: 'Software Developer',
        duration: '',
      },
    ],
    skills: [
      {
        name: '',
        proficiency: '',
      },
    ],
    projects: [
      {
        title: '',
        description: '',
        technologies: [],
        link: '',
      },
    ],
    image: '',
    resumePdf: '',
  })
  return (
    <div style={{ height: '100%', width: '100%', padding: '2px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <div style={resumeHeader}>
        {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%',width:"20%", fontSize: '1.5rem' ,background:'red',borderRadius:"4px"}}>Career Chronicles</div> */}
        <div style={{ marginRight: '20px' }}>
          <button class="btn " style={btnStyle} type="button" data-bs-toggle="offcanvas" data-bs-target="#resumecanvasExample" aria-controls="resumecanvasExample">
            <div><i class="fa fa-bars" style={{color:'#6b050b'}}></i></div>

          </button>

          <div class="offcanvas offcanvas-start" tabindex="-1" id="resumecanvasExample" aria-labelledby="resumecanvasExampleLabel">
            <div class="offcanvas-header drawer-header" >
              <h5 class="offcanvas-title" id="resumecanvasExampleLabel" style={{ fontWeight: "bolder" }}>Resume menu</h5>
              <button type="button" class=" custom-btn-close" data-bs-dismiss="offcanvas" aria-label="Close"><i className='fa fa-share-square-o'></i></button>
            </div>
            <div class="offcanvas-body drawer-body" >
              <div>
                <ul class="menu-list">
                  <li class="menu-item" onClick={() => navigate('/student/resume')}>
                    <i class="fa fa-edit menu-icon"></i> &nbsp;Edit Personal Information
                  </li>
                  <li class="menu-item" onClick={() => navigate('/student/resume/education')}>
                    <i class="fa fa-edit menu-icon"></i> &nbsp; Edit Education Information
                  </li>
                  <li class="menu-item" onClick={() => navigate('/student/resume/experience')}>
                    <i class="fa fa-edit menu-icon"></i> &nbsp; Edit Experience Information
                  </li>
                  <li class="menu-item" onClick={() => navigate('/student/resume/skills')}>
                    <i class="fa fa-edit menu-icon"></i> &nbsp; Edit Skill Information
                  </li>
                  <li class="menu-item" onClick={() => navigate('/student/resume/projects')}>
                    <i class="fa fa-edit menu-icon"></i> &nbsp; Edit Project Information
                  </li>
                 
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* <nav aria-label="breadcrumb">
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
        </nav> */}
      </div>
      <div style={resumeBody} >
        <Outlet />
      </div>
    </div>
  );
}
