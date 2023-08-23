import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../connection';
import { FaEdit } from 'react-icons/fa';
export default function MainControlPanel() {
    let [resumeSkillData, setResumeSkillData] = useState([]);
    let [singleStudentData, setSingleStudent] = useState([]);
    let [studentId, setStudentId] = useState('');
    let [skillName, setSkillName] = useState([]);
    const [isEditingSkill, setIsEditingSkill] = useState(false);

    
    useEffect(() => {
        
        const fetchData = async () => {
            let response = await axiosInstance.get('/student/students');
            console.log(resumeSkillData, "FROM MainControlPanel");
            setResumeSkillData(response.data)
          
            // fetchDataResume();
        }
        fetchData()
        
    }, [])
    
    const fetchDataResume = async () => {
        let response = await axiosInstance.get(`/resume/${studentId}`);
        console.log(response.data, "FROM USEEFFECT");
        setSkillName(response.data || []);


    }
    async function handleChange(e) {
        const id = e.target.name;
        const value = e.target.value;
        const response = await axiosInstance.get(`/student/students/${value}`)
 setStudentId(value)
        if (!response.data.studentData) {
            alert('Invalid ID!')
            return;
        }
        console.log(singleStudentData, "FROM handlechange Func..");
        setSingleStudent(response.data)
        fetchDataResume()
    }

    const handleSkillChange = (index, field, value) => {
        setSkillName((prevSkill) => {
          const updatedSkill = [...prevSkill];
          updatedSkill[index] = {
            ...updatedSkill[index],
            [field]: value,
          };
          return updatedSkill;
        });
      };
    
      const handleAddSkill = () => {
        setSkillName((prevSkill) => [
          ...prevSkill,
          {
            name: '',
            proficiency: 0,
          },
        ]);
      };
    
      const handleDeleteSkill = (index) => {
        setSkillName((prevSkill) => {
          const updatedSkill = [...prevSkill];
          updatedSkill.splice(index, 1);
          return updatedSkill;
        });
      };
    
      const saveSkillChanges =async () => {
        setIsEditingSkill(false);
        const updatedSkill = { ...skillName, skills: skillName };
          let response = await axiosInstance.post(`/resume/create`, updatedSkill);
          console.log(response.data);
      };
    return (
        <>
            <div className="container" style={{ padding: '10px' }}>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <i className='fa fa-edit' aria-label='hidden' style={{ fontSize: 'large', fontWeight: "bold" }}></i>

                                <h6 className="card-title">Manage Student Skills</h6>
                                <p className="card-text">This option enables manipulation of student skill based on Admin/Career Services feeddback.</p>
                                <button type='button' className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Manage</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <i className='fa fa-users' aria-label='hidden' style={{ fontSize: 'large' }}></i>

                                <h6 className="card-title">Manage Student Status</h6>
                                <p className="card-text">This option enables manipulation of student status based on Admin feedback </p>
                                <a href="#" className="btn btn-danger">Manage</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* <!-- Modal --> */}
            <div className="modal " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Manage Student Skills</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div style={{ color: 'red' }}>Select Student</div>
                            <select className="form-select" aria-label="Default select example" onChange={handleChange} name='_id'>
                                <option selected>Select student</option>

                                {
                                    resumeSkillData?.map((ele, index) => (
                                        <>
                                            <option value={ele._id} key={index} >{ele?.email}: {ele._id}</option>
                                        </>
                                    ))
                                }
                            </select>
                            <div style={{ color: 'red' }}>Student Details</div>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Username" aria-label="Username" value={singleStudentData?.studentData?.username || ''} />
                                <input type="email" class="form-control" placeholder="Email" aria-label="Email" value={singleStudentData?.studentData?.email || ''} />
                            </div>
                            <div style={{ color: 'red' }}>Batch Details</div>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="BatchId" aria-label="Username" value={singleStudentData?.studentData?.batchId?._id || ''} />
                                <input type="email" class="form-control" placeholder="Batch" aria-label="Email" value={singleStudentData?.studentData?.batchId?.name || ''} />
                            </div>
                            <div style={{ color: 'red' }}>Skill Details</div>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="skillname" aria-label="skillname" aria-describedby="basic-addon1" />
                            </div>
                            <section className="about" style={{ marginTop: "3px" }}>
                                <div className="container" data-aos="fade-up">

                                    <div className="section-title" style={{ display: 'flex', flexDirection: 'column', alignItems: "center", marginTop: "2px" }}>
                                        <br />
                                        <h4 style={{ fontWeight: "bold", position: 'relative' }}>
                                            Skill Information
                                            <span
                                                style={{ position: 'absolute', top: '-14px', fontSize: '30px', cursor: 'pointer', color: 'rgb(128,128,128,0.6)', marginLeft: '3px' }}
                                                onClick={() => setIsEditingSkill(!isEditingSkill)}
                                            >
                                                <FaEdit />
                                            </span>

                                        </h4>
                                    </div>

                                    <div className="row" style={{ background: "" }}>

                                        <div className="col-lg-8 pt-4 pt-lg-0 content" style={{ padding: "2px" }}>
                                            <h3>Skill information</h3>

                                            <div className="row" >
                                                {isEditingSkill ? (
                                                    <div  >
                                                        {skillName?.map((edu, index) => (
                                                            <div key={index}>

                                                                <div class="input-group flex-nowrap">
                                                                    <input type="text" class="form-control" placeholder="name" aria-label="name" aria-describedby="addon-wrapping"
                                                                        value={edu.name}
                                                                        style={{ marginRight: '3px' }}
                                                                        onChange={(e) =>
                                                                            handleSkillChange(index, "name", e.target.value)
                                                                        }
                                                                    />
                                                                </div>

                                                                <div class="input-group mb-3">
                                                                    <input type="number" class="form-control" placeholder="proficiency" aria-label="proficiency" value={edu.proficiency}
                                                                        style={{ marginRight: '3px' }}
                                                                        onChange={(e) =>
                                                                            handleSkillChange(index, "proficiency", e.target.value)
                                                                        } />
                                                                 
                                                                </div>

                                                                <button onClick={() => handleDeleteSkill(index)} style={{ margin: '3px' }} type='button' className='btn btn-success'>Delete</button>
                                                            </div>
                                                        ))}
                                                        <button onClick={handleAddSkill} style={{ margin: '3px' }} type='button' className='btn btn-success'>Add Skill</button>
                                                        {isEditingSkill && <button onClick={saveSkillChanges} type='button' className='btn btn-success'>Save</button>}

                                                    </div>
                                                ) : (
                                                    <div  >
                                                        <ul>
                                                            {skillName?.skills?.map((edu, index) => (
                                                                <li key={index}>
                                                                    {edu.name} - {edu.proficiency}
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
                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Understood</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
