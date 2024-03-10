import React, { useState, useEffect } from 'react'

import { Helmet } from 'react-helmet'

import Question from './question'
import { useNavigate, NavLink, } from "react-router-dom"
import './home.css'
import '../styles/drawer.css'
import { axiosInstance } from '../connection'
import './question.css'
const AdminHome = (props) => {
  console.log(props);
  const navigate = useNavigate();
  const [batch, setBatchname] = useState([]);
  const [batchdetails, setBatchDetails] = useState([]);

  useEffect(() => {
    const fetchBatch = async () => {
      try {
        const response = await axiosInstance.get('/batch/uniqueCourse');
        // console.log(response.data);
        setBatchname(response.data.Programs)
      } catch (error) {
        console.log(error);
      }
    }
    const fetchBatchdetails = async () => {
      try {
        const response = await axiosInstance.get('/batch/programdata');
        // console.log(response.data);
        // setBatchname(response.data.programData)
        setBatchDetails(response.data.programData)
      } catch (error) {
        console.log(error);
      }
    }
    fetchBatchdetails()
    fetchBatch()
  }, [])

  // console.log(batch);
  return (
    <>
      {/* <div class="card">
        {
          batch.length !== 0 &&
          batch.map((batchname) => (
            <div class="card-body" key={batchname} >
              <h5 class="card-title col-6">{batchname}</h5>
              {
                batchdetails?.filter(ele => ele.courseType === batchname).map((ele) => (
                  
            
                    <div key={ele.courseId} style={{borderBottom:'1px solid black',margin:"2px",padding:'3px',}}>
                   <h6><span style={{color:'#fb020c'}}>Batch:</span> {ele.courseName}</h6>
                    <h6>Total Enrolled Student: {ele.totalEnrolledStudent}</h6>
                    <h6>Total Student on viredStore: {ele.totalStudentsViredStore}</h6>
                    <h6>Total Projects: {ele.totalProjects}</h6>
                   </div>
                      
                   
                ))

              }
            </div>
          ))
        }
      </div> */}
      <div class="accordion" id="accordionExample" style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>

        {
          batch.length !== 0 &&
          batch.map((batchname, index) => (

            <div class="accordion-item" key={index}>
              <h2 class="accordion-header" id={`heading${index}`}>
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                  <h5 className="card-title col-6" style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>{batchname}</h5>
                </button>
              </h2>
              <div id={`collapse${index}`} class="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {batchdetails
                      ?.filter((ele) => ele.courseType === batchname)
                      .map((ele) => (
                        <div
                          key={ele.courseId}
                          style={{
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            padding: '10px',
                            marginBottom: '10px',
                            width: '100%',
                            boxSizing: 'border-box',
                          }}
                        >
                          <div style={{ borderBottom: '1px solid #ddd', marginBottom: '10px', paddingBottom: '10px' }}>
                            <h6 style={{ color: '#fb020c', marginBottom: '8px', fontSize: '16px', fontWeight: 'bold' }} >
                              Batch: {ele.courseName}
                            </h6>
                            <p style={{ fontSize: '14px', marginBottom: '5px' }}> <strong>Total Enrolled Student:</strong> {ele.totalEnrolledStudent}</p>
                            <p style={{ fontSize: '14px', marginBottom: '5px' }}>
                              <strong>Total Student on ViredStore:</strong> {ele.totalStudentsViredStore}</p>
                            <p style={{ fontSize: '14px', marginBottom: '5px' }}>
                              <strong>Total Projects:</strong> {ele.totalProjects}</p>

                            <button type='button' className='btn btn-danger' onClick={()=>navigate(`/admin/batch/${ele.courseId}`)}>View</button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        }

      </div>




      <div className="home-container">

        <div className="home-features"></div>
        <div className="home-pricing"></div>
        <div className="home-gallery"></div>
        <div className="home-hero">
          <div className="home-hero1">
            <div className="home-container1">
              <h1 className="home-hero-heading heading1">
                Track Batch Health
              </h1>
              <span className="home-hero-sub-heading">
                Efficiently monitor batch data, overseeing students and their information for streamlined record-keeping and academic management.
              </span>
              <div className="home-btn-group">
                <button className="home-hero-button1 button" onClick={() => navigate('/admin/batches')}>Get Started</button>
              </div>
            </div>
          </div>
        </div>

        <div className="home-banner">
          <div className="home-banner1">
            <h1 className="home-banner-heading heading2">
              Monitor Student Health and Github Data
            </h1>
            <span className="home-banner-sub-heading">
              Efficiently track student health , as well as
              student&apos;s Github data and resume.
            </span>
            <button className="home-banner-button button" onClick={() => navigate('/admin/students')}>Get Started</button>
          </div>
        </div>
        <div className="home-faq">
          <div className="home-faq-container">
            <div className="home-faq1">
              <div className="home-container3">
                <span className="home-text03 sectionTitle">
                  <span>FAQ</span>
                  <br></br>
                </span>
                <h2 className="home-text06 heading2">Common Questions</h2>
                <span className="home-text07">
                  <span>
                    Here are some of the most common questions that we get.
                  </span>
                  <br></br>
                  <span>
                    <span>
                      <span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: ' ',
                          }}
                        />
                      </span>
                      <span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: ' ',
                          }}
                        />
                      </span>
                    </span>
                    <span>
                      <span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: ' ',
                          }}
                        />
                      </span>
                      <span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: ' ',
                          }}
                        />
                      </span>
                    </span>
                  </span>
                  <span>
                    <span>
                      <span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: ' ',
                          }}
                        />
                      </span>
                      <span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: ' ',
                          }}
                        />
                      </span>
                    </span>
                    <span>
                      <span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: ' ',
                          }}
                        />
                      </span>
                      <span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: ' ',
                          }}
                        />
                      </span>
                    </span>
                  </span>
                </span>
              </div>
              <div className="home-container4">
                <Question
                  Answer="The admin portal is designed to track student health and batch health, as well as monitor student GitHub data and their resumes."
                  Question="What is the purpose of the admin portal?"
                ></Question>
                <Question
                  Answer="To access the admin portal, you need to have the necessary login credentials provided by the system administrator."
                  Question="How can I access the admin portal?"
                ></Question>
                <Question
                  Answer="The data available for tracking student health includes personal details and a comprehensive overview of projects completed during the course. This information provides insights into the student's overall skill set."
                  Question="What information can be tracked regarding student health?"
                ></Question>
                <Question
                  Answer="You can access individual student GitHub data by navigating to the student view or selecting a specific student within a particular batch. The provided information encompasses details such as recent commits, total repositories, recent commit history per repository, and other valuable insights."
                  Question="Can I view individual student GitHub data?"
                ></Question>
                <Question
                  Answer="The projects based on Frontend skills such as Javascript and Reactjs can have deployed projects for viewing but project related to backend skills such as Nodejs and ExpressJS will have their codes on Github repositories."
                  Question="Do we have all the projects here as deployed projects?"
                ></Question>
                <Question
                  Answer="Connect to use for any feedback on snehal.mishra@herovired.com ."
                  Question="How do we connect for any other question related to viredStore ,not mentioned above?"
                ></Question>
              </div>
            </div>
          </div>
        </div>
        <div className="home-footer"></div>
      </div>
    </>
  )
}

export default AdminHome
