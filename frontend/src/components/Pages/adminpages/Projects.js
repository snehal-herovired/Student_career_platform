import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Url } from '../../../connection';
import "../../../styles/background.css"
import { axiosInstance } from '../../../connection';
const Projects = () => {
    const [projects, setallprojects] = useState([]);
    // console.log("student :", studentdata);
    const navigate = useNavigate();
   

    useEffect(()=>{

        const fetchProjects = async () => {
            let response = await axiosInstance.get('/resume/projects');
            // console.log(resumeSkillData, "FROM MainControlPanel");
            // setResumeSkillData(response.data)
            console.log(response.data);
            setallprojects(response.data)
            // fetchDataResume();
        }
        fetchProjects()
    },[])
    

    

    return (
        <div className="container" style={{ padding: '10px' }}>
                <div className="row">
                  {
                    projects.length !==0 ?
                    projects.map((project)=>(
                        <div className="col-sm-12" key={project._id} style={{marginBottom:"5px"}}>
                        <div className="card" style={{backgroundColor:"rgb(255, 234, 221)"}}>
                            <div className="card-body">
                            <h4 className="card-title">Title: {project.title}</h4>
                                    <a className="card-text" href={project.link} target='_blank' style={{textDecoration:"none"}}>Project Link</a>
                                    <p className="card-text"><strong>Description:</strong> {project.description}</p>
                                    

                            </div>
                        </div>
                    </div>
                    )):
                    <div>No projects...</div>
                  }
                    
                </div>
            </div>
    );
};

export default Projects;
