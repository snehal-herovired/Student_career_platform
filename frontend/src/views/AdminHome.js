import React from 'react'

import { Helmet } from 'react-helmet'

import Question from './question'
import { useNavigate, NavLink } from "react-router-dom"
import './home.css'
import '../styles/drawer.css'

const AdminHome = (props) => {
  console.log(props);
  const navigate = useNavigate();

  return (
    <div className="home-container">
      

     
      <div className="home-details">
        <div className="home-details1">
          <div className="home-container2">
            <span className="home-text sectionTitle">
              <span>Details</span>
              <br></br>
            </span>
            <h2 className="home-details-heading heading2">
              Admin Portal for Comprehensive Student Monitoring
            </h2>
            <span className="home-details-sub-heading">
            Our admin portal serves as a central platform for overseeing student and batch health, GitHub data, and maintaining comprehensive project records. Tracking projects allows us to gain insights into students' progress throughout the course, providing valuable data on their overall development. This record-keeping approach helps us assess and support students effectively.
            </span>
          </div>
        </div>
      </div>
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
          <button className="home-banner-button button" onClick={()=>navigate('/admin/students')}>Get Started</button>
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
                Answer="Connect to use for any feedback on snehal.mishra@heroived.com ."
                Question="How do we connect for any other question related to viredStore ,not mentioned above?"
              ></Question>
            </div>
          </div>
        </div>
      </div>
      <div className="home-footer"></div>
    </div>
  )
}

export default AdminHome
