import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa';


export default function Home() {
  const [resumeData, setResumeData] = useState({
    studentId: '',
    batchId: '',
    about: 'Sunil Chhetri, often hailed as the "Captain Fantastic," is a renowned Indian footballer and the captain of the Indian national team, widely regarded as one of the countrys greatest footballing icons.',
    contactInformation: {
      email: 'fake@fake.com',
      phone: '91212232428',
      address: '123 Main Street,Cityville, Stateland,Countryland, 12345.',
      github: 'email@example.com',
      facebook: 'email@example.com',
      lindkedIn: 'email@example.com',
      twitter: 'email@example.com',
      image: '/images/hero.jpg',
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
    resumePdf: '',
  });

  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [isEditingProjects, setIsEditingProjects] = useState(false);

  // ABOUT CHANGE FUNCTION
  const handleAboutChange = (e) => {
    setResumeData((prevData) => ({
      ...prevData,
      about: e.target.value,
    }));
  };

  const saveAboutChanges = () => {
    // Save about section changes to backend or update state as required
    setIsEditingAbout(false);
  };
  // *******************************************************************************************
  // ABOUT PERSONAL INFORMATION FUNCTION
  const handleContactChange = (field, value) => {
    setResumeData((prevData) => ({
      ...prevData,
      contactInformation: {
        ...prevData.contactInformation,
        [field]: value,
      },
    }));
  };

  const saveContactChanges = () => {
    // Save contact information changes to backend or update state as required
    setIsEditingPersonal(false);
  };
  // ****************************************************************************************************  
  const handleEducationChange = (index, field, value) => {
    setResumeData((prevData) => {
      const updatedEducation = [...prevData.education];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [field]: value,
      };
      return {
        ...prevData,
        education: updatedEducation,
      };
    });
  };

  const saveEducationChanges = () => {
    // Save education section changes to backend or update state as required
    setIsEditingEducation(false);
  };

  const handleExperienceChange = (index, field, value) => {
    setResumeData((prevData) => {
      const updatedExperience = [...prevData.experience];
      updatedExperience[index] = {
        ...updatedExperience[index],
        [field]: value,
      };
      return {
        ...prevData,
        experience: updatedExperience,
      };
    });
  };

  const saveExperienceChanges = () => {
    // Save experience section changes to backend or update state as required
    setIsEditingExperience(false);
  };

  const handleProjectsChange = (index, field, value) => {
    setResumeData((prevData) => {
      const updatedProjects = [...prevData.projects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value,
      };
      return {
        ...prevData,
        projects: updatedProjects,
      };
    });
  };

  const saveProjectsChanges = () => {
    // Save projects section changes to backend or update state as required
    setIsEditingProjects(false);
  };


  let beginner = {
    width: "20%"
  }
  let intermediate = {
    width: "40%"
  }
  let advance = {
    width: "80%"
  }
  let expert = {
    width: "100%"
  }

  return (
    <>
      <main id="main">


        <section id="about" className="about" style={{ marginBottom: "3px", background: '' }}>
          <div className="container" data-aos="fade-up">

            <div className="section-title" style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
              <br />
              <br />

              <h2 style={{ fontWeight: "bold", position: 'relative' }}>
                About
                <span
                  style={{ position: 'absolute', top: '-14px', fontSize: '30px', cursor: 'pointer', color: 'rgb(128,128,128,0.6)', marginLeft: '3px' }}
                  onClick={() => setIsEditingAbout(!isEditingAbout)}
                >
                  <FaEdit />
                </span>

              </h2>
              {isEditingAbout ? (
                <textarea
                  style={{
                    width: '100%', marginBottom: '10px', textDecoration: 'none', border: '1px solid rgb(128,128,128,0.6)',
                    borderRadius: '10px',

                  }}
                  value={resumeData.about}
                  onChange={handleAboutChange}
                />
              ) : (
                <p style={{ textAlign: "center" }}>{resumeData.about}</p>
              )}
              {isEditingAbout && (
                <button type='button' className='btn btn-success' onClick={saveAboutChanges}>Save</button>
              )}
            </div>

            <div className="row" style={{ background: "" }}>
              <div className="col-lg-4">
                <img src='/images/hero.jpg' alt="" style={{ height: "100%", width: "100%" }} />
              </div>
              <div className="col-lg-8 pt-4 pt-lg-0 content" style={{ padding: "2px" }}>
                <h3 style={{ fontWeight: "bold", position: 'relative' }}>
                  Personal Information
                  <span
                    style={{ position: 'absolute', top: '-14px', fontSize: '30px', cursor: 'pointer', color: 'rgb(128,128,128,0.6)', marginLeft: '3px' }}
                    onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                  >
                    <FaEdit />
                  </span>

                </h3>
                {
                  isEditingPersonal ?
                    <div className="row">
                      <div className="col-lg-6" >
                        <ul>
                          <li>
                            <input
                              type="email"
                              placeholder='email'
                              value={resumeData.contactInformation.email}
                              onChange={(e) =>
                                handleContactChange("email", e.target.value)
                              }
                            />
                          </li>
                          <li>
                            <input
                              type="number"
                              placeholder='phone'
                              value={resumeData.contactInformation.phone}
                              onChange={(e) =>
                                handleContactChange("phone", e.target.value)
                              }
                            />
                          </li>
                          <li>
                            <textarea
                              value={resumeData.contactInformation.address}
                              placeholder='address here'
                              rows={5}
                              cols={25}
                              onChange={(e) =>
                                handleContactChange("address", e.target.value)
                              }
                            />
                          </li>
                          <li>
                            <input
                              type="text"
                              value={resumeData.contactInformation.lindkedIn}
                              placeholder='linkedin link'
                              onChange={(e) =>
                                handleContactChange("lindkedIn", e.target.value)
                              }
                            />
                          </li>
                        </ul>




                      </div>
                      <div className="col-lg-6" >
                        <ul>
                          <li>
                          <input
                          type="text"
                          value={resumeData.contactInformation.github}
                          placeholder='github'
                          onChange={(e) =>
                            handleContactChange("github", e.target.value)
                          }
                        />
                          </li>
                          <li>
                          <input
                          type="text"
                          value={resumeData.contactInformation.facebook}
                          placeholder='facbook'
                          onChange={(e) =>
                            handleContactChange("facebook", e.target.value)
                          }
                        />
                          </li>
                          <li>
                          <input
                          type="text"
                          value={resumeData.contactInformation.twitter}
                          placeholder='twitter link'
                          onChange={(e) =>
                            handleContactChange("twitter", e.target.value)
                          }
                        />
                          </li>
                        </ul>
                       
                       

                    
                      <button onClick={saveContactChanges} type='button' className='btn btn-success'>Save</button>
                      </div>
                    </div>
                    :
                    <div className="row" >
                      <div className="col-lg-6" >
                        <ul>
                          <li><i className="bi bi-rounded-right"></i> <strong>Email:</strong> {resumeData.contactInformation.email}</li>
                          <li><i className="bi bi-rounded-right"></i> <strong>LindkedIn:</strong> {resumeData.contactInformation.lindkedIn}</li>
                          <li><i className="bi bi-rounded-right"></i> <strong>Phone:</strong> {resumeData.contactInformation.phone}</li>
                          <li><i className="bi bi-rounded-right"></i> <strong>Address:</strong>{resumeData.contactInformation.address}</li>
                        </ul>
                      </div>
                      <div className="col-lg-6">
                        <ul>

                          <li><i className="bi bi-rounded-right"></i> <strong>Twitter:</strong>{resumeData.contactInformation.twitter}</li>
                          <li><i className="bi bi-rounded-right"></i> <strong>Github:</strong>{resumeData.contactInformation.github}</li>
                        </ul>
                      </div>
                    </div>
                }


              </div>
            </div>
            <br />
            <br />
          </div>
        </section>
        {/* <!-- End About Section --> */}

        {/* education section */}
        <section className="about" style={{ marginTop: "3px" }}>
          <div className="container" data-aos="fade-up">

            <div className="section-title" style={{ display: 'flex', flexDirection: 'column', alignItems: "center", marginTop: "2px" }}>
              <br />
              <h4 style={{ fontWeight: "bold" }}>Education Qualifications</h4>
            </div>

            <div className="row" style={{ background: "" }}>

              <div className="col-lg-8 pt-4 pt-lg-0 content" style={{ padding: "2px" }}>
                <h3>Education information</h3>

                <div className="row" >
                  <div className="col-lg-6" >
                    <ul>
                      <li><i className="bi bi-rounded-right"></i> <strong>Institution Name:</strong>Chandigrah University</li>
                      <li><i className="bi bi-rounded-right"></i> <strong>Qualification:</strong>B.E</li>
                      <li><i className="bi bi-rounded-right"></i> <strong>Year:</strong> 4 year</li>
                    </ul>
                  </div>


                </div>

              </div>
            </div>
            <br />
            <br />
          </div>
        </section>

        {/* experience section */}
        <section className="about" style={{ marginTop: "3px" }}>
          <div className="container" data-aos="fade-up">

            <div className="section-title" style={{ display: 'flex', flexDirection: 'column', alignItems: "center", marginTop: "2px" }}>
              <br />
              <h4 style={{ fontWeight: "bold" }}>Experience and Internships</h4>
            </div>

            <div className="row" style={{ background: "" }}>

              <div className="col-lg-8 pt-4 pt-lg-0 content" style={{ padding: "2px" }}>
                <h3>Experience</h3>

                <div className="row" >
                  <div className="col-lg-6" >
                    <ul>
                      <li><i className="bi bi-rounded-right"></i> <strong>Company Name:</strong>Chandigrah University</li>
                      <li><i className="bi bi-rounded-right"></i> <strong>Position:</strong>B.E</li>
                      <li><i className="bi bi-rounded-right"></i> <strong>Duration:</strong> 4 year</li>
                    </ul>
                  </div>


                </div>

              </div>
            </div>
            <br />
            <br />
          </div>
        </section>

        {/* Project section */}
        <section className="about" style={{ marginTop: "3px" }}>
          <div className="container" data-aos="fade-up">

            <div className="section-title" style={{ display: 'flex', flexDirection: 'column', alignItems: "center", marginTop: "2px" }}>
              <br />
              <h4 style={{ fontWeight: "bold" }}>Experience and Internships</h4>
            </div>

            <div className="row" style={{ background: "" }}>

              <div className="col-lg-8 pt-4 pt-lg-0 content" style={{ padding: "2px" }}>
                <h3>Projects</h3>

                <div className="row" >
                  <div className="col-lg-6" >
                    <ul>
                      <li><i className="bi bi-rounded-right"></i> <strong>Project Title:</strong>Chandigrah University</li>
                      <li><i className="bi bi-rounded-right"></i> <strong>Description:</strong>B.E</li>
                      <li><i className="bi bi-rounded-right"></i> <strong>Technologies:</strong>Nodejs,Reactjs,CSS</li>
                      <li><i className="bi bi-rounded-right"></i> <strong>Link:</strong><Link to='https://www.google.com/'>https://www.google.com/</Link></li>
                    </ul>
                  </div>


                </div>

              </div>
            </div>
            <br />
            <br />
          </div>
        </section>

        {/* <!-- ======= Skills Section ======= --> */}
        <section id="skills" className="skills">
          <div className="container" data-aos="fade-up">

            <div className="section-title">
              <h2>Skills</h2>
            </div>

            <div className="row skills-content">

              <div className="col-lg-6">

                <span className="skill">HTML </span>

                <div class="progress">
                  <div class="progress-bar" role="progressbar" style={beginner} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>


                <span className="skill">CSS </span>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" style={expert} aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                </div>



                <span className="skill">JavaScript</span>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" style={advance} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>

              </div>



            </div>
            <br />
            <br />
          </div>
        </section>
        {/* <!-- End Skills Section --> */}

        {/* <!-- ======= Github Section ======= --> */}
        <section id="facts" className="facts">
          <div className="container" data-aos="fade-up">

            <div className="section-title">
              <h2>Github</h2>
            </div>

            <div className="row counters">

              <div className="col-lg-3 col-6 text-center">
                <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" className="purecounter">20</span>
                <p>Total Contribution</p>
              </div>

              <div className="col-lg-3 col-6 text-center">
                <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1" className="purecounter">90</span>
                <p>Number of Projects</p>
              </div>

              <div className="col-lg-3 col-6 text-center">
                <span data-purecounter-start="0" data-purecounter-end="1463" data-purecounter-duration="1" className="purecounter">200</span>
                <p>Total Contribution this Year</p>
              </div>



            </div>
            <br />
            <br />

          </div>
        </section>
        {/* <!-- End Facts Section --> */}

        {/* <!-- ======= Testimonials Section ======= --> */}
        <section id="testimonials" className="testimonials">
          <div className="container" data-aos="fade-up">

            <div className="section-title">
              <h2>Testimonials</h2>
            </div>

            <div className="testimonials-slider" data-aos="fade-up" data-aos-delay="100">
              <div id="testimonialsCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">

                  <div className="carousel-item active">
                    <div className="testimonial-item text-center">
                      <img src="/images/hero.jpg" alt="" className="testimonial-img" />
                      <h3>Saul Goodman</h3>
                      <h4>Ceo &amp; Founder</h4>
                      <p>
                        <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                        Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.
                        <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                      </p>
                    </div>
                  </div>
                  {/* End testimonial item */}

                  <div className="carousel-item">
                    <div className="testimonial-item text-center">
                      <img src="/images/hero.jpg" alt="" className="testimonial-img" />
                      <h3>Sara Wilsson</h3>
                      <h4>Designer</h4>
                      <p>
                        <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                        Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.
                        <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                      </p>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <div className="testimonial-item text-center">
                      <img src="/images/hero.jpg" alt="" className="testimonial-img" />
                      <h3>Jena Karlis</h3>
                      <h4>Store Owner</h4>
                      <p>
                        <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                        Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.
                        <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                      </p>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <div className="testimonial-item text-center">
                      <img src="/images/hero.jpg" alt="img" className="testimonial-img" />
                      <h3>Matt Brandon</h3>
                      <h4>Freelancer</h4>
                      <p>
                        <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                        Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.
                        <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                      </p>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <div className="testimonial-item text-center">
                      <img src="/images/hero.jpg" alt="img_here" className="testimonial-img" />
                      <h3>John Larson</h3>
                      <h4>Entrepreneur</h4>
                      <p>
                        <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                        Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.
                        <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                      </p>
                    </div>
                  </div>

                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="prev" style={{ color: "black" }}>
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>

          </div>
          <br />
        </section>


      </main>
    </>
  )
}
