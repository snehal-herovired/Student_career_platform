import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../connection';
import { FaEdit } from 'react-icons/fa';
export default function MainControlPanel() {
    let [resumeSkillData, setResumeSkillData] = useState([]);
    let [singleStudentData, setSingleStudent] = useState([]);
    const [resume, setResume] = useState([]);
    let [skillName, setSkillName] = useState([]);
    const [newSkill, setNewSkill] = useState('');
    const [proficiency, setProficiency] = useState(1);
    const [skillsList, setSkillsList] = useState([]);


    useEffect(() => {

        const fetchData = async () => {
            let response = await axiosInstance.get('/student/students');
            // console.log(resumeSkillData, "FROM MainControlPanel");
            setResumeSkillData(response.data)

            // fetchDataResume();
        }
        fetchData()

    }, [])

    // Function to add a new skill to the list
    const handleAddSkill = () => {
        if (newSkill.trim() === '') {
            return; // Don't add empty skills
        }
        const newSkillObj = { name: newSkill, proficiency };
        setSkillsList([...skillsList, newSkillObj]);
        setNewSkill('');
        setProficiency(1);
    };

    // Function to remove a skill from the list
    const handleRemoveSkill = (index) => {
        const updatedSkills = skillsList.filter((_, i) => i !== index);
        setSkillsList(updatedSkills);
    };
    // Function to save skills to the server
    const handleSaveSkills = async () => {
        try {
            // Send skillsList to the server
            // You would need to implement this using your API
            let response = await axiosInstance.post('/resume/create', {
                skills: skillsList,
                studentId: singleStudentData.studentData._id,
                batchId: singleStudentData?.studentData?.batchId?._id,
                about: resume.about,
                experience: resume.experience,
                education: resume.education,
                projects: resume.projects,
                contactInformation:resume.contactInformation
            });
            // Handle success
            if (response.status === 200) {
                alert("Skills saved successfully!");
            }
        } catch (error) {
            // Handle error
            console.log(error);
        }
    };

    const fetchDataResume = async (id) => {
        try {
            // console.log(id, "STUDENTID SELECTED");
            let response = await axiosInstance.get(`/resume/${id}`);
            if (response.status !== 404 || response.status !== 500) {

                // console.log(response.data, "RESUME FOR THIS ID");
                setResume(response.data)
                // console.log(skillName, "skills");
                setSkillName(response.data.skills);
            }
        } catch (error) {
            console.log(error.message);
            alert('Resume not found')
            return;
        }


    }
    async function handleChange(e) {
        try {
            const id = e.target.name;
            const value = e.target.value;
            const response = await axiosInstance.get(`/student/students/${value}`)
            // setStudentId(value)
            if (!response.data.studentData) {
                alert('Invalid ID!')
                return;
            }
            // console.log(singleStudentData, "FROM handlechange Func..");
            setSingleStudent(response.data)
            fetchDataResume(value)
        } catch (error) {
            console.log(error.message);
        }
    }





    return (
        <>
            <div className="container" style={{ padding: '10px' }}>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                <i className='fa fa-edit' aria-label='hidden' style={{ fontSize: 'large', fontWeight: "bold" }}></i>

                                <h6 className="card-title">Manage Student Skills</h6>
                                <p className="card-text">This option enables manipulation of student skill based on Admin/Career Services feeddback.</p>
                                <button type='button' className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Manage</button>
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
                            {skillsList.map((skill, index) => (
                                <>
                                <div key={index} className="input-group mb-3">
                                    <input type="text" className="form-control" value={skill.name} disabled />
                                    
                                </div>
                                <div className='input-group mb-3'>
                                <select className="form-select" value={skill.proficiency} disabled>
                                        {Array.from({ length: 10 }, (_, i) => i + 1).map((level) => (
                                            <option key={level} value={level}>{level}</option>
                                        ))}
                                    </select>
                                    <button className="btn btn-primary" onClick={() => handleRemoveSkill(index)}>Delete</button>
                                </div>
                                </>
                            ))}
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Skill Name"
                                    aria-label="skillname"
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                />
                             
                            </div>
                            <div className='input-group mb-3'>
                            <select
                                    className="form-select"
                                    value={proficiency}
                                    onChange={(e) => setProficiency(e.target.value)}
                                >
                                    {Array.from({ length: 10 }, (_, i) => i + 1).map((level) => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                            </div>
                                <button className="btn btn-primary" onClick={handleAddSkill}>Add</button>

                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" onClick={handleSaveSkills}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
