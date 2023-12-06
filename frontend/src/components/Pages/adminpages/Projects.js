import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Url } from '../../../connection';
import "../../../styles/background.css"
import { axiosInstance } from '../../../connection';
const Projects = () => {
    const [projects, setallprojects] = useState([]);
    const [projectDelTrigger,setprojectDelTrigger]=useState(false)
    // console.log("student :", studentdata);
    const navigate = useNavigate();


    useEffect(() => {

        const fetchProjects = async () => {
            let response = await axiosInstance.get('/resume/projects');
            // console.log(resumeSkillData, "FROM MainControlPanel");
            // setResumeSkillData(response.data)
            console.log(response.data);
            setallprojects(response.data)
            // fetchDataResume();
        }
        fetchProjects()
    }, [projectDelTrigger])

    async function removeproject(resumeId, projectId) {
        try {
            const userConfirmation = window.confirm('Do you want to proceed?');

            if (userConfirmation) {
                
                const response = await axiosInstance.post('/resume/deleteproject', { resumeId, projectId });
                if(response.status==200){
                    alert('Project has been removed !')
                    setprojectDelTrigger((prev)=>!prev)
                    return;
                }
            }
    
        } catch (error) {
            alert(error.message)
        }
       
    }


    return (
        <div className="container" style={{ padding: '10px' }}>
            <div className="row">
                {
                    projects.length !== 0 ?
                        projects?.map((project) => (
                            // Check if email and username are present before rendering the card
                            project.student?.email && project.student?.username && (
                                <div className="col-sm-12" key={project._id} style={{ marginBottom: "5px" }}>
                                    <div className="card" style={{ backgroundColor: "rgb(255, 234, 221)" }}>
                                        <div className="card-body row">
                                            {/* Project Details (col-8) */}
                                            <div className='col-8'>
                                                <h4 className="card-title"><strong>Title:</strong> {project.projectInfo.title}</h4>
                                                <span><strong>Project Link: </strong></span><a className="card-text" href={project.projectInfo.link} target='_blank' style={{ textDecoration: "none" }}>{project.projectInfo.link}</a>
                                                <p className="card-text"><strong>Description:</strong> {project.projectInfo.description}</p>
                                                <button className='btn btn-danger'
                                                 type='button'
                                                onClick={()=>removeproject(project.student.resumeId,project.projectInfo._id)}
                                                >Remove Project</button>
                                            </div>

                                            {/* Student Details (col-4) */}
                                            <div className='col-4' style={{ borderLeft: "1px solid red" }}>
                                                <p className="card-text"><strong>Username:</strong> {project.student.username}</p>
                                                <p className="card-text"><strong>Email:</strong> {project.student.email}</p>
                                                <p className="card-text"><strong>Batch:</strong> {project.student.batch}</p>
                                                <Link  style={{color:'red'}} to={`/admin/${project.student.studentID._id}`}>Go to Student Profile <i className='fa fa-angle-right'></i></Link>
                                                {/* Add more student details as needed */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )

                        )) :
                        <div>No projects...</div>
                }

            </div>
        </div>
    );
};

export default Projects;
