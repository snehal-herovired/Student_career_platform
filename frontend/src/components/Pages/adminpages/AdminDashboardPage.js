import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../connection';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
export default function AdminDashboardPage() {
    const navigate=useNavigate();
    const [recentActivity, setrecentActivity] = useState([])
    const [allprojects, setallprojects] = useState([])
    useEffect(() => {

        const fetchData = async () => {
            let response = await axiosInstance.get('/student/recent-activity');
            // console.log(resumeSkillData, "FROM MainControlPanel");
            // setResumeSkillData(response.data)
            // console.log(response.data);
            setrecentActivity(response.data)
            // fetchDataResume();
        }
        const fetchProjects = async () => {
            let response = await axiosInstance.get('/resume/projects');
            const filteredProjects = response.data.filter(project => project.student.email && project.student.username);
            // console.log(resumeSkillData, "FROM MainControlPanel");
            // setResumeSkillData(response.data)
            // console.log(response.data);
            setallprojects(filteredProjects)
            // fetchDataResume();
        }

        fetchData();
        fetchProjects()

    }, [])

    function convertToISTAndExtractHour(timestamp) {
        // Convert the timestamp string to a Date object
        const utcDate = new Date(timestamp);
      
        // Set the time zone to Indian Standard Time (IST)
        const istDate = new Date(utcDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      
        // Extract the hour and minutes from the IST date
        const istHour = istDate.getHours();
        const istMinutes = istDate.getMinutes();
      
        // Determine whether it's AM or PM
        const period = istHour >= 12 ? 'PM' : 'AM';
      
        // Convert to 12-hour format
        const hour12Format = istHour % 12 || 12; // 0 should be converted to 12 in 12-hour format
      
        // Return the formatted time
        return `${hour12Format}:${istMinutes < 10 ? '0' : ''}${istMinutes} ${period}`;
      }









    return (
        <>
            <div className="container" style={{ padding: '10px' }}>
                <div className="row">
                    <div className="col-sm-6" style={{ marginBottom: "5px" }}>
                        <div className="card" style={{ background: "rgb(255, 234, 221)" }}>
                            <div className="card-body">

                                <h2 className='card-title'>Recent Activities <span className="badge rounded-pill bg-dark">{recentActivity.length}</span></h2>


                                <button type='button' className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" >View</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="card" style={{ background: "rgb(255, 234, 221)" }}>
                            <div className="card-body">

                                <h2 className='card-title'>Total Projects <span className="badge rounded-pill bg-dark">{allprojects.length}</span></h2>
                                <button type='button' className="btn btn-danger" onClick={()=>navigate('/admin/projects')}>View</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"><strong>Recent Activities</strong></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container" style={{ padding: '10px' }}>
                                <div className="row">
                                    {
                                        recentActivity?.map((activity,index) => (
                                            <div className="col-sm-12" style={{ marginBottom: "4px" }} key={index} >
                                                <div className="card">
                                                    <div className="card-body">

                                                        <h5 className="card-title"><strong>Name:</strong> {activity.username}</h5>
                                                        <h6 className="card-title"><strong>Email:</strong> {activity.email}</h6>
                                                        <h6 className="card-title"><strong>Active at:</strong> {convertToISTAndExtractHour(activity.lastActivity)}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
