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
            // console.log(resumeSkillData, "FROM MainControlPanel");
            setResumeSkillData(response.data)

            // fetchDataResume();
        }
        fetchData()

    }, [])

    const fetchDataResume = async (id) => {
       try {
        console.log(id, "STUDENTID SELECTED");
        let response = await axiosInstance.get(`/resume/${id}`);
        if(response.status !== 404 || response.status !== 500){
          
            console.log(response.data,"RESUME FOR THIS ID");
            console.log(skillName, "skills");
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
        setStudentId(value)
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
