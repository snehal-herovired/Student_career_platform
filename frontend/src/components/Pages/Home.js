import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa';
import { Url } from "../../connection"
import usePostRequest from '../customeHooks/SendData';
import useGetRequest from '../customeHooks/fetchData';
import fetchData from '../customeHooks/timerFetchData';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {axiosInstance} from '../../connection';
import { useQuery } from '@tanstack/react-query';
export default function Home() {
  const [upload, setUpload] = useState(false)
  const APiUrl = upload ? `/resume/upload` : `/resume/create`
  const mutation = usePostRequest(APiUrl)
  const studentId = localStorage.getItem('studentId')
  // const { data: gitdata, isSuccess: gitSuccess } = fetchData(`${Url}/student/github/${studentId}`);
  const { data, isLoading, isSuccess, isError, refetch, error } = useQuery(["resumeDataforStudent"], async function () {
    const response = await axiosInstance.get(`/resume/${studentId}`);
    return response.data;
  });
  const { data: gitdata, isSuccess: gitSuccess } = useQuery(["datafromgit"], async function () {
    const response = await axiosInstance.get(`/gitdata/${studentId}`);
    return response.data;
  })


  // console.log("RESUME : ", data, "GItdata :", gitdata);
  const [resumeData, setResumeData] = useState({
    

    image: '',


  });
  const [idStudent, setStudentId] = useState('');
  const [idBatch, setBatchId] = useState('');
  const [about, setAbout] = useState('');
  const [contactInformation, setContactInformation] = useState({
    email: '',
    phone: '',
    address: '',
    github: '',
    linkedIn: ''
  });
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);


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
    // mutation.mutate({ ...data, batchId: batchId, studentId: studentId })
    if (isSuccess && data) {
      setStudentId(data.studentId || studentId);
      setBatchId(data.batchId || batchId)
     setResumeData(data?.image || '')
      setAbout(data.about || '');
      setContactInformation(data.contactInformation || {
        email: '',
        phone: '',
        address: '',
        github: '',
        linkedIn: ''
      });
      setEducation(data.education || []);
      setExperience(data.experience || []);
      setProjects(data.projects || []);
    }
    
  }, [isSuccess,data])

  // PROFILE PICTURE UPLOAD LOGIC
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeData((prev) => (
      {
        ...prev,
        image: file
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
      formData.append('studentId', localStorage.getItem('studentId'))
      formData.append('batchId', localStorage.getItem('batchId'))
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





  // // ABOUT CHANGE FUNCTION
  // const handleAboutChange = (e) => {
  //   setResumeData((prevData) => ({
  //     ...prevData,
  //     about: e.target.value,
  //   }));
  // };

  // const saveAboutChanges = () => {
  //   // Save about section changes to backend or update state as required
  //   setIsEditingAbout(false);
  //   mutation.mutate(resumeData)

  // };
  // // *******************************************************************************************
  // // ABOUT PERSONAL INFORMATION FUNCTION
  // const handleContactChange = (field, value) => {
  //   setResumeData((prevData) => ({
  //     ...prevData,
  //     contactInformation: {
  //       ...prevData.contactInformation,
  //       [field]: value,
  //     },
  //   }));
  // };

  // const saveContactChanges = () => {
  //   // Save contact information changes to backend or update state as required
  //   setIsEditingPersonal(false);
  //   mutation.mutate(resumeData)

  // };
  // // ****************************************************************************************************
  // //  EDUCATION CHANGES
  // const handleEducationChange = (index, field, value) => {
  //   setResumeData((prevData) => {
  //     const updatedEducation = [...prevData.education];
  //     updatedEducation[index] = {
  //       ...updatedEducation[index],
  //       [field]: value,
  //     };
  //     return {
  //       ...prevData,
  //       education: updatedEducation,
  //     };
  //   });
  // };

  // const handleAddEducation = () => {
  //   setResumeData((prevData) => ({
  //     ...prevData,
  //     education: [
  //       ...prevData.education,
  //       {
  //         institution: '',
  //         degree: '',
  //         year: 0,
  //       },
  //     ],
  //   }));
  // };


  // const handleDeleteEducation = (index) => {
  //   setResumeData((prevData) => {
  //     const updatedEducation = [...prevData.education];
  //     updatedEducation.splice(index, 1);
  //     return {
  //       ...prevData,
  //       education: updatedEducation,
  //     };
  //   });
  // };

  // const saveEducationChanges = () => {
  //   // Save education section changes to backend or update state as required
  //   setIsEditingEducation(false);
  //   mutation.mutate(resumeData)

  // };

  // ABOUT CHANGE FUNCTION
  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };

  const saveAboutChanges = () => {
    setIsEditingAbout(false);
    const updatedResumeData = { ...data, about: about,studentId:idStudent,batchId:idBatch };
    mutation.mutate(updatedResumeData);
  };

  // ABOUT PERSONAL INFORMATION FUNCTION
  const handleContactChange = (field, value) => {
    setContactInformation((prevContactInfo) => ({
      ...prevContactInfo,
      [field]: value,
    }));
  };

  const saveContactChanges = () => {
    setIsEditingPersonal(false);
    const updatedResumeData = { ...data, contactInformation: contactInformation };
    mutation.mutate(updatedResumeData);
  };

  //  EDUCATION CHANGES
  const handleEducationChange = (index, field, value) => {
    setEducation((prevEducation) => {
      const updatedEducation = [...prevEducation];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [field]: value,
      };
      return updatedEducation;
    });
  };

  const handleAddEducation = () => {
    setEducation((prevEducation) => [
      ...prevEducation,
      {
        institution: '',
        degree: '',
        year: 0,
      },
    ]);
  };

  const handleDeleteEducation = (index) => {
    setEducation((prevEducation) => {
      const updatedEducation = [...prevEducation];
      updatedEducation.splice(index, 1);
      return updatedEducation;
    });
  };

  const saveEducationChanges = () => {
    setIsEditingEducation(false);
    const updatedResumeData = { ...data, education: education };
    mutation.mutate(updatedResumeData);
  };


  // ***************************************************************************************
  //  Experience CHANGES
  const handleExperinceChange = (index, field, value) => {
    setExperience((prev) => {
      const updatedExperience = [...prev];
      updatedExperience[index] = {
        ...updatedExperience[index],
        [field]: value,
      };
      return updatedExperience;
    });
  };

  const handleAddExperience = () => {
    setExperience((prev) => [
      ...prev,
      {
        company: '',
        position: '',
        duration: '',
        description: ''

      },
    ]);
  };

  const handleDeleteExperience = (index) => {
    setExperience((prev) => {
      const updatedExperience = [...prev];
      updatedExperience.splice(index, 1);
      return updatedExperience;
    });
  };

  const saveExperienceChanges = () => {
    setIsEditingEducation(false);
    const updatedResumeData = { ...data, experience: experience };
    mutation.mutate(updatedResumeData);
  };
  // EXPERIENCE CHANGE
  // const handleExperinceChange = (index, field, value) => {
  //   setResumeData((prevData) => {
  //     const updatedExperience = [...prevData.experience];
  //     updatedExperience[index] = {
  //       ...updatedExperience[index],
  //       [field]: value,
  //     };
  //     return {
  //       ...prevData,
  //       experience: updatedExperience,
  //     };
  //   });
  // };

  // const handleAddExperience = () => {
  //   setResumeData((prevData) => ({
  //     ...prevData,
  //     experience: [
  //       ...prevData.experience,
  //       {
  //         company: '',
  //         position: '',
  //         duration: 0,
  //         description: ''
  //       },
  //     ],
  //   }));
  // };


  // const handleDeleteExperience = (index) => {
  //   setResumeData((prevData) => {
  //     const updatedExperience = [...prevData.experience];
  //     updatedExperience.splice(index, 1);
  //     return {
  //       ...prevData,
  //       experience: updatedExperience,
  //     };
  //   });
  // };

  // const saveExperienceChanges = () => {
  //   // Save education section changes to backend or update state as required
  //   setIsEditingExperience(false);
  //   mutation.mutate(resumeData)

  // };





  // *******************************************************************************************************
  // PROJECT CHANGES LOGIC

  const handleProjectChange = (index, field, value) => {
    setProjects((prev) => {
      const updatedProjects = [...prev];
      if (field === "technologies") {
        updatedProjects[index][field] = value;
      } else {
        updatedProjects[index] = {
          ...updatedProjects[index],
          [field]: value,
        };
      }

      return updatedProjects;
    });
  };

  const addNewProject = () => {
    setProjects((prev) => [
      ...prev,
      {
        title: '',
        description: '',
        technologies: [],
        link: '',
      },
    ]);
  };

  const deleteProject = (index) => {
    setProjects((prev) => {
      const updatedProjects = [...prev];
      updatedProjects.splice(index, 1);
      return updatedProjects;
    });
  };



  const saveProjectChanges = () => {
    setIsEditingEducation(false);
    const updatedResumeData = { ...data, projects: projects };
    mutation.mutate(updatedResumeData);
  };

  // const handleProjectChange = (index, field, value) => {
  //   setResumeData((prevData) => {
  //     const updatedProjects = [...prevData.projects];
  //     if (field === "technologies") {
  //       updatedProjects[index][field] = value;
  //     } else {
  //       updatedProjects[index] = {
  //         ...updatedProjects[index],
  //         [field]: value,
  //       };
  //     }
  //     return {
  //       ...prevData,
  //       projects: updatedProjects,
  //     };
  //   });
  // };

  // const saveProjectChanges = (index) => {
  //   // Save project changes to backend or update state as required
  //   setIsEditingProjects(false);
  //   mutation.mutate(resumeData)

  // };

  // const addNewProject = () => {
  //   setResumeData((prevData) => ({
  //     ...prevData,
  //     projects: [
  //       ...prevData.projects,
  //       {
  //         title: '',
  //         description: '',
  //         technologies: [],
  //         link: '',
  //       },
  //     ],
  //   }));
  // };

  // const deleteProject = (index) => {
  //   setResumeData((prevData) => {
  //     const updatedProjects = [...prevData.projects];
  //     updatedProjects.splice(index, 1);
  //     return {
  //       ...prevData,
  //       projects: updatedProjects,
  //     };
  //   });
  // };

  // ******************************************************************************************************



  return (
    <>
      
      
      {
        isLoading && <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      }
      {
        isError && <div>Resume not found...</div>
      }
      {

      isSuccess && data ?
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
                  value={about}
                  onChange={handleAboutChange}
                />
              ) : (
                <p style={{ textAlign: "center" }}>{data.about}</p>
              )}
              {isEditingAbout && (
                <button type='button' className='btn btn-success' onClick={saveAboutChanges}>Save</button>
              )}

            </div>

            <div className="row" style={{}}>
              <h4 style={{ fontWeight: "bold", textAlign: 'center', marginTop: '4px', marginBottom: '4px' }}>Personal Information</h4>
              <div className="col-lg-4">
                <img crossOrigin="anonymous" src={gitSuccess ? `${gitdata?.userData?.avatar}` : `${Url}/${resumeData?.image}`} alt="image here" style={{ height: "100%", width: "100%", }} />
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
                    <button type="button" className="btn btn-success" style={{ margin: "3px" }} onClick={handleImageUpload}>Upload Image</button>
                    {/* Add other elements for image upload or cancel */}
                  </div>
                )}

              </div>
              <div className="col-lg-8 pt-4 pt-lg-0 content" style={{ padding: "2px", textAlign: 'start' }}>

                <h6 style={{ fontWeight: "bold", position: 'relative', marginTop: '20px' }}>
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

                            <div class="input-group mb-3">
                              <input class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                type="email"
                                placeholder='email'
                                value={contactInformation.email}
                                onChange={(e) =>
                                  handleContactChange("email", e.target.value)
                                }
                              />
                            </div>
                          </li>
                          <li>

                            <div class="input-group mb-3">
                              <input class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" type="number"
                                placeholder='phone'
                                value={contactInformation.phone}
                                onChange={(e) =>
                                  handleContactChange("phone", e.target.value)
                                } />
                            </div>

                          </li>
                          <li>

                            <div class="form-floating">
                              <textarea class="form-control" placeholder="address" id="floatingTextarea2" style={{ height: "100px" }} value={contactInformation.address} onChange={(e) =>
                                handleContactChange("address", e.target.value)
                              }></textarea>
                              <label for="floatingTextarea2">Address</label>
                            </div>
                          </li>
                          <li>

                            <div class="input-group flex-nowrap">
                              <input type="text" class="form-control" aria-label="Username" aria-describedby="addon-wrapping"

                                value={contactInformation.linkedIn}
                                placeholder='linkedin link'
                                onChange={(e) =>
                                  handleContactChange("linkedIn", e.target.value)
                                }
                              />
                            </div>
                          </li>
                        </ul>




                      </div>
                      <div className="col-lg-6" >
                        <ul>
                          <li>

                            <div class="input-group flex-nowrap">
                              <input type="text" class="form-control" aria-label="Username" aria-describedby="addon-wrapping"
                                value={contactInformation.github}
                                placeholder='github'
                                onChange={(e) =>
                                  handleContactChange("github", e.target.value)
                                }

                              />
                            </div>
                          </li>


                        </ul>





                      </div>
                      <button onClick={saveContactChanges} type='button' className='btn btn-success'>Save</button>
                    </div>

                    :
                    <div className="row" >
                      <div className="col-lg-6" >
                        <ul>
                          <li><i className="bi bi-rounded-right"></i> <strong>Email:</strong> {data?.contactInformation?.email}</li>
                          <li><i className="bi bi-rounded-right"></i> <strong>LinkedIn:</strong> {data?.contactInformation?.linkedIn}</li>
                          <li><i className="bi bi-rounded-right"></i> <strong>Phone:</strong> {data?.contactInformation?.phone}</li>
                          <li><i className="bi bi-rounded-right"></i> <strong>Address:</strong>{data?.contactInformation?.address}</li>
                        </ul>
                      </div>
                      <div className="col-lg-6">
                        <ul>

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
                      {education.map((edu, index) => (
                        <div key={index}>

                          <div class="input-group flex-nowrap">
                            <input type="text" class="form-control" placeholder="Institution" aria-label="Institution" aria-describedby="addon-wrapping"
                              value={edu.institution}
                              style={{ marginRight: '3px' }}
                              onChange={(e) =>
                                handleEducationChange(index, "institution", e.target.value)
                              }
                            />
                          </div>

                          <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="example :B.E(Mechanical Eng.)" aria-label="Degree" value={edu.degree}
                              style={{ marginRight: '3px' }}
                              onChange={(e) =>
                                handleEducationChange(index, "degree", e.target.value)
                              } />
                            <input type="text" class="form-control" placeholder="YYYY-YYYY" aria-label="Seryearver" value={edu.year}
                              pattern="[0-9]{4}-[0-9]{4}" // Enforce the format YYYY-YYYY
                              style={{ marginRight: '3px' }}
                              onChange={(e) => handleEducationChange(index, "year", e.target.value)} />
                          </div>

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
                      {experience.map((exp, index) => (
                        <div key={index}>

                          <div class="input-group flex-nowrap">
                            <input type="text" class="form-control" placeholder="Company" aria-label="Company" aria-describedby="addon-wrapping"
                              value={exp.company}
                              style={{ marginRight: '3px' }}
                              onChange={(e) =>
                                handleExperinceChange(index, "company", e.target.value)
                              }
                            />
                          </div>

                          <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Position" aria-label="Position"
                              value={exp.position}
                              style={{ marginRight: '3px' }}
                              onChange={(e) =>
                                handleExperinceChange(index, "position", e.target.value)
                              }
                            />
                            <input type="text" class="form-control" placeholder="YYYY-YYYY " aria-label="Duration"
                              value={exp.duration}
                              
                              pattern="[0-9]{4}-[0-9]{4}" // Enforce the format YYYY-YYYY
                              style={{ marginRight: '3px' }}
                              onChange={(e) => handleExperinceChange(index, "duration", e.target.value)}
                            />
                          </div>
                          <div class="form-floating">
                            <textarea class="form-control" id="floatingTextarea2" style={{ height: "100px", margin: '3px' }}
                              value={exp.description}

                              onChange={(e) =>
                                handleExperinceChange(index, "description", e.target.value)
                              }
                            ></textarea>
                            <label for="floatingTextarea2">Description about job role</label>
                          </div>
                          <button onClick={() => handleDeleteExperience(index)} style={{ margin: '3px' }} type='button' className='btn btn-success'>Delete</button>
                        </div>
                      ))}
                      <button onClick={handleAddExperience} style={{ margin: '3px' }} type='button' className='btn btn-success'>Add Experince</button>
                      {isEditingExperience && <button onClick={saveExperienceChanges} type='button' className='btn btn-success'>Save</button>}

                    </div>
                  ) : (
                    <div  >
                      <ul>
                        {data?.experience?.map((exp, index) => (
                          <li key={index}>
                            {exp.company} - {exp.position} ({exp.duration})
                            <p>{exp.description}</p>
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
                    {projects?.map((project, index) => (
                      <div key={index}>


                        <div class="input-group mb-3">
                          <input type="text" class="form-control" aria-label="Project Title"
                            value={project.title}
                            placeholder='Project Title'
                            style={{ margin: '3px' }}
                            onChange={(e) =>
                              handleProjectChange(index, "title", e.target.value)
                            }
                          />
                          <input type="text" class="form-control" aria-label="Project Link" aria-describedby="addon-wrapping"
                            value={project.link}
                            style={{ margin: '3px' }}
                            placeholder='Project Link'
                            onChange={(e) =>
                              handleProjectChange(index, "link", e.target.value)
                            }
                          />
                        </div>

                        <div class="form-floating">
                          
                          <textarea class="form-control" id="floatingTextarea2" style={{ height: "100px", margin: '3px' }} aria-label="Project Description"
                            value={project.description}
                            placeholder='Project Description'
                            maxLength={400}
                            onChange={(e) =>
                              handleProjectChange(index, "description", e.target.value)
                            }
                          ></textarea>
                          <label for="floatingTextarea2">Description of the Project</label>
                        </div>


                        <div class="form-floating">
                          <textarea class="form-control" id="floatingTextarea2" style={{ height: "100px", margin: '3px' }}
                            value={project.technologies?.join(", ")}

                            placeholder='techlogies in format reatjs,nodejs'
                            onChange={(e) =>
                              handleProjectChange(
                                index,
                                "technologies",
                                e.target.value.split(", ")
                              )
                            }
                          ></textarea>
                          <label for="floatingTextarea2">Technologies Used in Project</label>
                        </div>
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



        {/* <!-- ======= Github Section ======= --> */}
        <section id="facts" className="facts">
          <div className="container" data-aos="fade-up">

            <div className="section-title">
              <h2>Github</h2>
            </div>

            <div className="row counters">

              <div className="col-lg-3 col-6 text-center">
                <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" className="purecounter">{gitSuccess && gitdata?.userData?.total_repositories}</span>
                <p>Total Repositories</p>
              </div>

              <div className="col-lg-3 col-6 text-center">
                <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1" className="purecounter">{gitSuccess && gitdata && gitdata?.userData?.public_repos}</span>
                <p>Total Public Repositories</p>
              </div>

              <div className="col-lg-3 col-6 text-center">
                <span data-purecounter-start="0" data-purecounter-end="1463" data-purecounter-duration="1" className="purecounter">{gitSuccess && gitdata && gitdata?.userData?.followers}</span>
                <p>Followers</p>
              </div>
              <div className="col-lg-3 col-6 text-center">
                <span data-purecounter-start="0" data-purecounter-end="1463" data-purecounter-duration="1" className="purecounter">{gitSuccess && gitdata && gitdata?.totalCommits}</span>
                <p>Total Commits</p>
              </div>



            </div>
            <br />
            <br />

          </div>
        </section>
        {/* <!-- End Facts Section --> */}


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
        :
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
                  value={about}
                  onChange={handleAboutChange}
                />
              ) : (
                <p style={{ textAlign: "center" }}>{about}</p>
              )}
              {isEditingAbout && (
                <button type='button' className='btn btn-success' onClick={saveAboutChanges}>Save</button>
              )}

            </div>

            <div className="row" style={{}}>
              <h4 style={{ fontWeight: "bold", textAlign: 'center', marginTop: '4px', marginBottom: '4px' }}>Personal Information</h4>
              <div className="col-lg-4">
                <img crossOrigin="anonymous" src='' alt="image here" style={{ height: "100%", width: "100%", }} />
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
                    <button type="button" className="btn btn-success" style={{ margin: "3px" }} onClick={handleImageUpload}>Upload Image</button>
                    {/* Add other elements for image upload or cancel */}
                  </div>
                )}

              </div>
              <div className="col-lg-8 pt-4 pt-lg-0 content" style={{ padding: "2px", textAlign: 'start' }}>

                <h6 style={{ fontWeight: "bold", position: 'relative', marginTop: '20px' }}>
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

                            <div class="input-group mb-3">
                              <input class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                                type="email"
                                placeholder='email'
                                value={contactInformation.email}
                                onChange={(e) =>
                                  handleContactChange("email", e.target.value)
                                }
                              />
                            </div>
                          </li>
                          <li>

                            <div class="input-group mb-3">
                              <input class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" type="number"
                                placeholder='phone'
                                value={contactInformation.phone}
                                onChange={(e) =>
                                  handleContactChange("phone", e.target.value)
                                } />
                            </div>

                          </li>
                          <li>

                            <div class="form-floating">
                              <textarea class="form-control" placeholder="address" id="floatingTextarea2" style={{ height: "100px" }} value={contactInformation.address} onChange={(e) =>
                                handleContactChange("address", e.target.value)
                              }></textarea>
                              <label for="floatingTextarea2">Address</label>
                            </div>
                          </li>
                          <li>

                            <div class="input-group flex-nowrap">
                              <input type="text" class="form-control" aria-label="Username" aria-describedby="addon-wrapping"

                                value={contactInformation.linkedIn}
                                placeholder='linkedin link'
                                onChange={(e) =>
                                  handleContactChange("linkedIn", e.target.value)
                                }
                              />
                            </div>
                          </li>
                        </ul>




                      </div>
                      <div className="col-lg-6" >
                        <ul>
                          <li>

                            <div class="input-group flex-nowrap">
                              <input type="text" class="form-control" aria-label="Username" aria-describedby="addon-wrapping"
                                value={contactInformation.github}
                                placeholder='github'
                                onChange={(e) =>
                                  handleContactChange("github", e.target.value)
                                }

                              />
                            </div>
                          </li>


                        </ul>





                      </div>
                      <button onClick={saveContactChanges} type='button' className='btn btn-success'>Save</button>
                    </div>

                    :
                    <div className="row" >
                      <div className="col-lg-6" >
                        <ul>
                          <li><i className="bi bi-rounded-right"></i> <strong>Email:</strong> {contactInformation?.email}</li>
                          <li><i className="bi bi-rounded-right"></i> <strong>LinkedIn:</strong> {contactInformation?.linkedIn}</li>
                          <li><i className="bi bi-rounded-right"></i> <strong>Phone:</strong> {contactInformation?.phone}</li>
                          <li><i className="bi bi-rounded-right"></i> <strong>Address:</strong>{contactInformation?.address}</li>
                        </ul>
                      </div>
                      <div className="col-lg-6">
                        <ul>

                          <li><i className="bi bi-rounded-right"></i> <strong>Github:</strong>{contactInformation?.github}</li>
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
                      {education?.map((edu, index) => (
                        <div key={index}>

                          <div class="input-group flex-nowrap">
                            <input type="text" class="form-control" placeholder="Institution" aria-label="Institution" aria-describedby="addon-wrapping"
                              value={edu.institution}
                              style={{ marginRight: '3px' }}
                              onChange={(e) =>
                                handleEducationChange(index, "institution", e.target.value)
                              }
                            />
                          </div>

                          <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Degree" aria-label="Degree" value={edu.degree}
                              style={{ marginRight: '3px' }}
                              onChange={(e) =>
                                handleEducationChange(index, "degree", e.target.value)
                              } />
                            <input type="text" class="form-control" placeholder="year" aria-label="Seryearver" value={edu.year}
                              pattern="[0-9]{4}-[0-9]{4}" // Enforce the format YYYY-YYYY
                              style={{ marginRight: '3px' }}
                              onChange={(e) => handleEducationChange(index, "year", e.target.value)} />
                          </div>

                          <button onClick={() => handleDeleteEducation(index)} style={{ margin: '3px' }} type='button' className='btn btn-success'>Delete</button>
                        </div>
                      ))}
                      <button onClick={handleAddEducation} style={{ margin: '3px' }} type='button' className='btn btn-success'>Add Education</button>
                      {isEditingEducation && <button onClick={saveEducationChanges} type='button' className='btn btn-success'>Save</button>}

                    </div>
                  ) : (
                    <div  >
                      <ul>
                        {education?.map((edu, index) => (
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
                      {experience?.map((exp, index) => (
                        <div key={index}>

                          <div class="input-group flex-nowrap">
                            <input type="text" class="form-control" placeholder="Company" aria-label="Company" aria-describedby="addon-wrapping"
                              value={exp.company}
                              style={{ marginRight: '3px' }}
                              onChange={(e) =>
                                handleExperinceChange(index, "company", e.target.value)
                              }
                            />
                          </div>

                          <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Position" aria-label="Position"
                              value={exp.position}
                              style={{ marginRight: '3px' }}
                              onChange={(e) =>
                                handleExperinceChange(index, "position", e.target.value)
                              }
                            />
                            <input type="text" class="form-control" placeholder="Duration" aria-label="Duration"
                              value={exp.duration}
                              pattern="[0-9]{4}-[0-9]{4}" // Enforce the format YYYY-YYYY
                              style={{ marginRight: '3px' }}
                              onChange={(e) => handleExperinceChange(index, "duration", e.target.value)}
                            />
                          </div>
                          <div class="form-floating">
                            <textarea class="form-control" id="floatingTextarea2" style={{ height: "100px", margin: '3px' }}
                              value={exp.description}

                              onChange={(e) =>
                                handleExperinceChange(index, "description", e.target.value)
                              }
                            ></textarea>
                            <label for="floatingTextarea2">Description about job role</label>
                          </div>
                          <button onClick={() => handleDeleteExperience(index)} style={{ margin: '3px' }} type='button' className='btn btn-success'>Delete</button>
                        </div>
                      ))}
                      <button onClick={handleAddExperience} style={{ margin: '3px' }} type='button' className='btn btn-success'>Add Experince</button>
                      {isEditingExperience && <button onClick={saveExperienceChanges} type='button' className='btn btn-success'>Save</button>}

                    </div>
                  ) : (
                    <div  >
                      <ul>
                        {experience?.map((exp, index) => (
                          <li key={index}>
                            {exp.company} - {exp.position} ({exp.duration})
                            <p>{exp.description}</p>
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
                    {projects?.map((project, index) => (
                      <div key={index}>


                        <div class="input-group mb-3">
                          <input type="text" class="form-control" aria-label="Project Title"
                            value={projects.title}
                            placeholder='Project Title'
                            style={{ margin: '3px' }}
                            onChange={(e) =>
                              handleProjectChange(index, "title", e.target.value)
                            }
                          />
                          <input type="text" class="form-control" aria-label="Project Description"
                            value={projects.description}
                            placeholder='Project Description'
                            style={{ margin: '3px' }}
                            onChange={(e) =>
                              handleProjectChange(index, "description", e.target.value)
                            }
                          />
                        </div>

                        <div class="input-group flex-nowrap">
                          <input type="text" class="form-control" aria-label="Project Link" aria-describedby="addon-wrapping"
                            value={projects.link}
                            style={{ margin: '3px' }}
                            placeholder='Project Link'
                            onChange={(e) =>
                              handleProjectChange(index, "link", e.target.value)
                            }
                          />
                        </div>

                        <div class="form-floating">
                          <textarea class="form-control" id="floatingTextarea2" style={{ height: "100px", margin: '3px' }}
                            value={projects?.technologies?.join(", ")}

                            placeholder='techlogies in format reatjs,nodejs'
                            onChange={(e) =>
                              handleProjectChange(
                                index,
                                "technologies",
                                e.target.value.split(", ")
                              )
                            }
                          ></textarea>
                          <label for="floatingTextarea2">Technologies Used in Project</label>
                        </div>
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
                    {projects?.map((project, index) => (
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



        {/* <!-- ======= Github Section ======= --> */}
        {/* <section id="facts" className="facts">
          <div className="container" data-aos="fade-up">

            <div className="section-title">
              <h2>Github</h2>
            </div>

            <div className="row counters">

              <div className="col-lg-3 col-6 text-center">
                <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" className="purecounter">{gitSuccess && gitdata?.userData?.total_repositories}</span>
                <p>Total Repositories</p>
              </div>

              <div className="col-lg-3 col-6 text-center">
                <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1" className="purecounter">{gitSuccess && gitdata && gitdata?.userData?.public_repos}</span>
                <p>Total Public Repositories</p>
              </div>

              <div className="col-lg-3 col-6 text-center">
                <span data-purecounter-start="0" data-purecounter-end="1463" data-purecounter-duration="1" className="purecounter">{gitSuccess && gitdata && gitdata?.userData?.followers}</span>
                <p>Followers</p>
              </div>
              <div className="col-lg-3 col-6 text-center">
                <span data-purecounter-start="0" data-purecounter-end="1463" data-purecounter-duration="1" className="purecounter">{gitSuccess && gitdata && gitdata?.totalCommits}</span>
                <p>Total Commits</p>
              </div>



            </div>
            <br />
            <br />

          </div>
        </section> */}
        {/* <!-- End Facts Section --> */}


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
