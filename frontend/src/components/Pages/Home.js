import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa';
import { Url } from "../../connection"
import usePostRequest from '../customeHooks/SendData';
import useGetRequest from '../customeHooks/fetchData';
import  fetchData  from '../customeHooks/timerFetchData';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
export default function Home() {
  const [upload, setUpload] = useState(false)
  const APiUrl = upload ? `${Url}/resume/upload` : `${Url}/resume/create`
  const mutation = usePostRequest(APiUrl)
  const studentId = localStorage.getItem('studentId')
  // const { data: gitdata, isSuccess: gitSuccess } = fetchData(`${Url}/student/github/${studentId}`);
  const { data, isLoading, isSuccess, isError, refetch } = useGetRequest(`${Url}/resume/${studentId}`);
  const { data: gitdata, isSuccess: gitSuccess } = useQuery(["gitdata"], async function () {
    const response = await axios.get(`${Url}/student/github/${studentId}`);
    return response.data;
})
  
  
  console.log("RESUME : ", data ,"GItdata :",gitdata);
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
    },
    image: '',
    education: [
      {
        institution: 'Chandigrah University',
        degree: 'B.E',
        year: 4,
      },
    ],
    experience: [
      {
        company: 'XYZ Corp',
        position: 'Software Developer',
        duration: 2,
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
        title: 'Vboard',
        description: 'Sampling Applicaiton',
        technologies: ["nodejs", "reactjs", "express"],
        link: 'https://github.com/',
      },
    ],
    resumePdf: '',
  });

  
  
  Modal.setAppElement('#root')
  const [showModal, setShowModal] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [isEditingProjects, setIsEditingProjects] = useState(false);
  const [profileImage, setProfileImage] = useState(false)

  // MODAL  
  useEffect(() => {
    if (mutation.isSuccess) {
      setShowModal(true);
      setUpload(false)
    }
  }, [mutation.isSuccess]);

  // Close the modal
  const closeModal = () => {
    refetch();
    setShowModal(false);
    setIsEditingAbout(false);
    setIsEditingEducation(false);
    setIsEditingExperience(false);
    setIsEditingPersonal(false);
    setIsEditingProjects(false);
    setProfileImage(false)
  };
  //setting the student and batch id from localstorage
  useEffect(() => {
    const batchId = localStorage.getItem('batchId');
    const studentId = localStorage.getItem('studentId');
    setResumeData((prev) => (
      {
        ...prev,
        batchId: batchId,
        studentId: studentId
      }
    ))
  }, [])

// PROFILE PICTURE UPLOAD LOGIC
const handleFileChange = (e) => {
  const file = e.target.files[0];
  setResumeData((prev) => (
    {
      ...prev,
      image:file
    }
  ))
};
  

  
const handleImageUpload = async () => {
  try {
    if (!resumeData.image) {
      // No image selected
      return;
    }
    setUpload(true)
    const formData = new FormData();
    formData.append('image', resumeData.image);
    formData.append('studentId',localStorage.getItem('studentId'))
    formData.append('batchId',localStorage.getItem('batchId'))
    // Replace 'YOUR_API_ENDPOINT' with your server's endpoint to handle image upload
    mutation.mutate(formData);

    // Handle the response from the server, e.g., show a success message or update the UI.
 

    // Reset the selected image after successful upload
    // setSelectedImage(null);
  } catch (error) {
    // Handle errors, e.g., show an error message or log the error.
    console.error(error);
  }
};

  
  
  
  
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
    mutation.mutate(resumeData)

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
    mutation.mutate(resumeData)

  };
  // ****************************************************************************************************
  //  EDUCATION CHANGES
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

  const handleAddEducation = () => {
    setResumeData((prevData) => ({
      ...prevData,
      education: [
        ...prevData.education,
        {
          institution: '',
          degree: '',
          year: 0,
        },
      ],
    }));
  };


  const handleDeleteEducation = (index) => {
    setResumeData((prevData) => {
      const updatedEducation = [...prevData.education];
      updatedEducation.splice(index, 1);
      return {
        ...prevData,
        education: updatedEducation,
      };
    });
  };

  const saveEducationChanges = () => {
    // Save education section changes to backend or update state as required
    setIsEditingEducation(false);
    mutation.mutate(resumeData)

  };



  // ***************************************************************************************
  // EXPERIENCE CHANGE
  const handleExperinceChange = (index, field, value) => {
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

  const handleAddExperience = () => {
    setResumeData((prevData) => ({
      ...prevData,
      experience: [
        ...prevData.experience,
        {
          company: '',
          position: '',
          duration: 0,
        },
      ],
    }));
  };


  const handleDeleteExperience = (index) => {
    setResumeData((prevData) => {
      const updatedExperience = [...prevData.experience];
      updatedExperience.splice(index, 1);
      return {
        ...prevData,
        experience: updatedExperience,
      };
    });
  };

  const saveExperienceChanges = () => {
    // Save education section changes to backend or update state as required
    setIsEditingExperience(false);
    mutation.mutate(resumeData)

  };





  // *******************************************************************************************************
  // PROJECT CHANGES LOGIC
  const handleProjectChange = (index, field, value) => {
    setResumeData((prevData) => {
      const updatedProjects = [...prevData.projects];
      if (field === "technologies") {
        updatedProjects[index][field] = value;
      } else {
        updatedProjects[index] = {
          ...updatedProjects[index],
          [field]: value,
        };
      }
      return {
        ...prevData,
        projects: updatedProjects,
      };
    });
  };

  const saveProjectChanges = (index) => {
    // Save project changes to backend or update state as required
    setIsEditingProjects(false);
    mutation.mutate(resumeData)

  };

  const addNewProject = () => {
    setResumeData((prevData) => ({
      ...prevData,
      projects: [
        ...prevData.projects,
        {
          title: '',
          description: '',
          technologies: [],
          link: '',
        },
      ],
    }));
  };

  const deleteProject = (index) => {
    setResumeData((prevData) => {
      const updatedProjects = [...prevData.projects];
      updatedProjects.splice(index, 1);
      return {
        ...prevData,
        projects: updatedProjects,
      };
    });
  };

  // ******************************************************************************************************

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
    <>{
      isSuccess && data && gitdata &&
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
              <p style={{ textAlign: "center" }}>{data.about}</p>
            )}
            {isEditingAbout && (
              <button type='button' className='btn btn-success' onClick={saveAboutChanges}>Save</button>
            )}

          </div>

          <div className="row" style={{ }}>
            <h4 style={{fontWeight: "bold",textAlign:'center',marginTop:'4px',marginBottom:'4px'}}>Personal Information</h4>
          <div className="col-lg-4">
              <img crossOrigin="anonymous" src={gitSuccess ? `${gitdata.gitdata.avatar}` :`${Url}/${resumeData?.image}`} alt="image here" style={{ height: "100%", width: "100%", }} />
              <h6 style={{ textAlign: 'center', position: 'relative', margin: '3px' }}>
                Profile Picture
                <span
                  style={{ position: 'absolute', top: '-14px', fontSize: '30px', cursor: 'pointer', color: 'rgb(128,128,128,0.6)', marginLeft: '3px' }}
                  onClick={() => setProfileImage(!profileImage)}
                >
                  <FaEdit />
                </span>
              </h6>
              {profileImage && (
                <div>
                  <input type="file" accept="image/*" id="image" name="image" onChange={handleFileChange} />
                  <button type="button" className="btn btn-success" style={{margin:"3px"}} onClick={handleImageUpload}>Upload Image</button>
                  {/* Add other elements for image upload or cancel */}
                </div>
              )}

            </div>
            <div className="col-lg-8 pt-4 pt-lg-0 content" style={{ padding: "2px",textAlign:'start'}}>
              
              <h6 style={{ fontWeight: "bold", position: 'relative',marginTop:'20px' }}>
               BioData
                <span
                  style={{ position: 'absolute', top: '-14px', fontSize: '20px', cursor: 'pointer', color: 'rgb(128,128,128,0.6)', marginLeft: '3px' }}
                  onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                >
                  <FaEdit />
                </span>

              </h6>
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
                        <li><i className="bi bi-rounded-right"></i> <strong>Email:</strong> {data?.contactInformation?.email}</li>
                        <li><i className="bi bi-rounded-right"></i> <strong>LindkedIn:</strong> {data?.contactInformation?.lindkedIn}</li>
                        <li><i className="bi bi-rounded-right"></i> <strong>Phone:</strong> {data?.contactInformation?.phone}</li>
                        <li><i className="bi bi-rounded-right"></i> <strong>Address:</strong>{data?.contactInformation?.address}</li>
                      </ul>
                    </div>
                    <div className="col-lg-6">
                      <ul>

                        <li><i className="bi bi-rounded-right"></i> <strong>Twitter:</strong>{data?.contactInformation?.twitter}</li>
                        <li><i className="bi bi-rounded-right"></i> <strong>Github:</strong>{data?.contactInformation?.github}</li>
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
            <h4 style={{ fontWeight: "bold", position: 'relative' }}>
              Education Qualifications
              <span
                style={{ position: 'absolute', top: '-14px', fontSize: '30px', cursor: 'pointer', color: 'rgb(128,128,128,0.6)', marginLeft: '3px' }}
                onClick={() => setIsEditingEducation(!isEditingEducation)}
              >
                <FaEdit />
              </span>

            </h4>
          </div>

          <div className="row" style={{ background: "" }}>

            <div className="col-lg-8 pt-4 pt-lg-0 content" style={{ padding: "2px" }}>
              <h3>Education information</h3>

              <div className="row" >
                {isEditingEducation ? (
                  <div  >
                    {resumeData.education.map((edu, index) => (
                      <div key={index}>
                        <input
                          type="text"
                          value={edu.institution}
                          style={{ marginRight: '3px' }}
                          onChange={(e) =>
                            handleEducationChange(index, "institution", e.target.value)
                          }
                        />
                        <input
                          type="text"
                          value={edu.degree}
                          style={{ marginRight: '3px' }}
                          onChange={(e) =>
                            handleEducationChange(index, "degree", e.target.value)
                          }
                        />
                        <input
                          type="number"
                          value={edu.year}
                          style={{ marginRight: '3px' }}
                          onChange={(e) =>
                            handleEducationChange(index, "year", parseInt(e.target.value))
                          }
                        />
                        <button onClick={() => handleDeleteEducation(index)} style={{ margin: '3px' }} type='button' className='btn btn-success'>Delete</button>
                      </div>
                    ))}
                    <button onClick={handleAddEducation} style={{ margin: '3px' }} type='button' className='btn btn-success'>Add Education</button>
                    {isEditingEducation && <button onClick={saveEducationChanges} type='button' className='btn btn-success'>Save</button>}

                  </div>
                ) : (
                  <div  >
                    <ul>
                      {data?.education?.map((edu, index) => (
                        <li key={index}>
                          {edu.institution} - {edu.degree} ({edu.year})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}




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
            <h4 style={{ fontWeight: "bold", position: 'relative' }}>
              Experience and Internships
              <span
                style={{ position: 'absolute', top: '-14px', fontSize: '30px', cursor: 'pointer', color: 'rgb(128,128,128,0.6)', marginLeft: '3px' }}
                onClick={() => setIsEditingExperience(!isEditingExperience)}
              >
                <FaEdit />
              </span>
            </h4>
          </div>

          <div className="row" style={{ background: "" }}>

            <div className="col-lg-8 pt-4 pt-lg-0 content" style={{ padding: "2px" }}>
              <h3>Experience</h3>

              <div className="row" >
                {isEditingExperience ? (
                  <div  >
                    {resumeData.experience.map((exp, index) => (
                      <div key={index}>
                        <input
                          type="text"
                          value={exp.company}
                          style={{ marginRight: '3px' }}
                          onChange={(e) =>
                            handleExperinceChange(index, "company", e.target.value)
                          }
                        />
                        <input
                          type="text"
                          value={exp.position}
                          style={{ marginRight: '3px' }}
                          onChange={(e) =>
                            handleExperinceChange(index, "position", e.target.value)
                          }
                        />
                        <input
                          type="number"
                          value={exp.duration}
                          style={{ marginRight: '3px' }}
                          onChange={(e) =>
                            handleExperinceChange(index, "duration", parseInt(e.target.value))
                          }
                        />
                        <button onClick={() => handleDeleteExperience(index)} style={{ margin: '3px' }} type='button' className='btn btn-success'>Delete</button>
                      </div>
                    ))}
                    <button onClick={handleAddExperience} style={{ margin: '3px' }} type='button' className='btn btn-success'>Add Education</button>
                    {isEditingExperience && <button onClick={saveExperienceChanges} type='button' className='btn btn-success'>Save</button>}

                  </div>
                ) : (
                  <div  >
                    <ul>
                      {data?.experience?.map((exp, index) => (
                        <li key={index}>
                          {exp.company} - {exp.position} (Duration :{exp.duration}year)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}




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
            <h4 style={{ fontWeight: "bold", position: 'relative' }}>
              Projects
              <span
                style={{ position: 'absolute', top: '-14px', fontSize: '30px', cursor: 'pointer', color: 'rgb(128,128,128,0.6)', marginLeft: '3px' }}
                onClick={() => setIsEditingProjects(!isEditingProjects)}
              >
                <FaEdit />
              </span>
            </h4>
          </div>

          <div className="row" style={{ background: "" }}>

            <div className="col-lg-8 pt-4 pt-lg-0 content" style={{ padding: "2px" }}>
              <h3>
                Projects
              </h3>

              {isEditingProjects ? (
                <div>
                  {resumeData.projects.map((project, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        value={project.title}
                        placeholder='Project Title'
                        style={{ margin: '3px' }}
                        onChange={(e) =>
                          handleProjectChange(index, "title", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        value={project.description}
                        placeholder='Project Description'
                        style={{ margin: '3px' }}
                        onChange={(e) =>
                          handleProjectChange(index, "description", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        value={project.link}
                        style={{ margin: '3px' }}
                        placeholder='Project Link'
                        onChange={(e) =>
                          handleProjectChange(index, "link", e.target.value)
                        }
                      />
                      <textarea
                        value={project.technologies.join(", ")}
                        style={{ margin: '3px' }}
                        placeholder='techlogies in format reatjs,nodejs'
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "technologies",
                            e.target.value.split(", ")
                          )
                        }
                      />
                      <div>
                        <button onClick={() => deleteProject(index)} type='button' className='btn btn-success' style={{ margin: '2px' }}>Delete Project</button>

                        {
                          isEditingProjects && <button onClick={() => saveProjectChanges(index)} type='button' className='btn btn-success' style={{ margin: '2px' }}>Save</button>
                        }

                      </div>
                    </div>
                  ))}
                  <button onClick={addNewProject} type='button' className='btn btn-success' style={{ margin: '2px' }}>Add New Project</button>
                </div>
              ) : (
                <div>
                  {data?.projects?.map((project, index) => (
                    <ul key={index}>
                      <li>Title: {project.title}</li>
                      <li>Description: {project.description}</li>
                      <li>Link : <a href={project.link}> {project.link}</a> </li>

                      <li>Technologies: {project.technologies.join(", ")}</li>
                    </ul>
                  ))}
                </div>
              )}

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
                  <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" className="purecounter">{gitSuccess && gitdata.gitdata.total_repositories }</span>
              <p>Total Repositories</p>
            </div>

            <div className="col-lg-3 col-6 text-center">
              <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1" className="purecounter">{gitSuccess && gitdata && gitdata?.gitdata?.public_repos}</span>
              <p>Total Public Repositories</p>
            </div>

            <div className="col-lg-3 col-6 text-center">
                  <span data-purecounter-start="0" data-purecounter-end="1463" data-purecounter-duration="1" className="purecounter">{gitSuccess && gitdata && gitdata?.gitdata?.followers }</span>
              <p>Followers</p>
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

      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Modal"
        style={{
          overlay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#fff',
            borderRadius: '8px',
            padding: '20px',
            maxWidth: '400px',
          },
        }}
      >
        {/* Modal content */}
        <h2>Success!</h2>
        <p>Resume Update was Successfull.</p>
        <button onClick={closeModal} type='button' className='btn btn-success'>Close</button>
      </Modal>
        </main>
        
       
    }
    </>
  )
}
