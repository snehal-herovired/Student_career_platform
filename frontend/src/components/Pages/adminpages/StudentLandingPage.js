import React from 'react';
import { Link, useParams, useNavigate, NavLink } from 'react-router-dom';
import useGetRequest from '../../customeHooks/fetchData';
import useTimerRequest from '../../customeHooks/timerFetchData';
import { Url } from '../../../connection';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { axiosInstance } from '../../../connection';
const StudentLandingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isError: getrequestError, isLoading: getrequestLoading, refetch, isSuccess: studentSuccess, error: studentdataerror } = useQuery(['studentdata'], async () => {
        let response = await axiosInstance.get(`/student/students/${id}`)
        return response.data
    })
    // console.log(data, "this is Single Student Data");
    const { data: gitdata, isError, isLoading, isSuccess } = useQuery(["gitdata"], async () => {
        let response = await axiosInstance.get(`/gitdata/${id}`)
        return response.data
    })
    const blurredStyle = { filter: 'blur(2px)' };
    const visibleStyle = { filter: 'none' };
    // if (getrequestLoading) {
    //     return <div>Data Loading...</div>
    // }
    if (getrequestError) {
        return <div>Error !! {studentdataerror.message}..<button type='button' className='btn btn-danger' onClick={() => navigate('/admin')}>Sync Data</button></div>
    }
    function convertToIndianStandardTime(dateString) {
        // Check if dateString is not provided or is not a valid date
        if (!dateString || isNaN(new Date(dateString))) {
            return "No date";
        }

        // Parse the given date string into a Date object
        const dateObj = new Date(dateString);

        // Create a new Date object with the Indian Standard Time (IST) offset
        // India Standard Time is 5 hours and 30 minutes ahead of UTC.
        const istOffset = 5.5 * 60 * 60 * 1000;
        const istDateObj = new Date(dateObj.getTime() + istOffset);

        // Format date as dd-mm-yyyy
        const dd = String(istDateObj.getDate()).padStart(2, '0');
        const mm = String(istDateObj.getMonth() + 1).padStart(2, '0'); // January is 0
        const yyyy = istDateObj.getFullYear();

        // Format time as hour:min:sec
        const hours = String(istDateObj.getHours() % 12 || 12).padStart(2, '0');
        const minutes = String(istDateObj.getMinutes()).padStart(2, '0');
        const seconds = String(istDateObj.getSeconds()).padStart(2, '0');

        // Determine AM or PM
        const amOrPm = istDateObj.getHours() >= 12 ? 'PM' : 'AM';

        // Determine the day of the week
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = days[istDateObj.getDay()];

        // Return the formatted date and time as a string
        return `${dayOfWeek}, ${dd}-${mm}-${yyyy} ${hours}:${minutes}:${seconds} ${amOrPm}`;
    }





    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 " style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    {/* Circular Image */}
                    {
                        getrequestLoading && <>
                            <div class="spinner-border m-5" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </>
                    }
                    <div
                        className="rounded-circle  text-light d-inline-block p-4"
                        style={{ width: '150px', height: '150px', border: '1px solid #6b050b ', boxShadow: " 0px 7px 12px -3px #6b050b" }}
                    >
                        {/* You can put your circular image here */}
                        <img
                            src="/images/heroRed.png"
                            alt="Student"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                        />
                    </div>
                    {
                        isSuccess && gitdata ? <Link to={`/admin/resume/${data?.studentData?._id}`} style={getrequestLoading ? blurredStyle : visibleStyle}>
                            <button className="btn btn-danger  mt-4" style={{ boxShadow: " 0px 7px 12px -3px #6b050b", fontWeight: 'bold' }} >Go to Resume</button>
                        </Link> :
                            <Link to={`/admin`} style={getrequestLoading ? blurredStyle : visibleStyle}>
                                <button className="btn btn-danger  mt-4" style={{ boxShadow: " 0px 7px 12px -3px #6b050b", fontWeight: 'bold' }} >Dashboard</button>
                            </Link>
                    }
                </div>
                <div className="col-md-6 text-start" style={getrequestLoading ? blurredStyle : visibleStyle}>
                    {/* Student Data */}
                    <h4 className="text-white  mb-2" style={{ backgroundColor: '#6b050b', padding: '4px', borderRadius: '10px' }}>
                        <i className="fa fa-user" aria-hidden="true"></i>
                    </h4>
                    <div className="text-black" style={{ marginLeft: "5px", padding: "5px" }}>
                        <p><span style={{ fontWeight: 'bold' }}>Batch</span>: {studentSuccess && data?.studentData && data.studentData.batchId ? data.studentData.batchId.name : "No data"}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Email</span>: {studentSuccess && data?.studentData ? data.studentData.email : "No data"}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Name</span>: {studentSuccess && data?.studentData ? data.studentData.username : "No data"}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Batch Name</span>: {studentSuccess && data?.studentData ? data.studentData.batchId.name : "No data"}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Course</span>: {studentSuccess && data?.studentData ? data.studentData?.batchId.course : "No data"}</p>

                    </div>
                </div>
            </div>

            <div className="row mt-5">


                <div className="col-md-12 text-start" style={isLoading ? blurredStyle : visibleStyle} >
                    {/* Batch Details */}
                    <h4 className="text-white  mb-2" style={{ backgroundColor: '#6b050b', padding: '4px', borderRadius: '10px' }}>
                        <i className='fa fa-github'></i>
                    </h4>
                    <div className=" row text-black" style={{ marginLeft: "5px", padding: "5px" }}>
                        <div className="col-6">
                            <p><span style={{ fontWeight: 'bold' }}>Username</span>: {isSuccess && gitdata ? gitdata?.userData?.username : "No data"}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Account CreatedAt</span>: {isSuccess && gitdata ? gitdata?.userData?.gitAccountCreated : "No data"}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Email</span>: {isSuccess && data && gitdata ? gitdata?.userData?.email : "No data"}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Followers</span>: {isSuccess && gitdata ? gitdata?.userData?.followers : "No data"}</p>
                        </div>
                        <div className="col-6">
                            <p><span style={{ fontWeight: 'bold' }}>Public Repos</span>: {isSuccess && gitdata ? gitdata?.userData?.public_repos : "No data"}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Public Gists</span>: {isSuccess && gitdata ? gitdata?.userData?.public_gists : "No data"}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Total Repo</span>: {isSuccess && gitdata ? gitdata?.userData?.total_repositories : "No data"}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Bio</span>: {isSuccess && gitdata ? gitdata?.userData?.bio : "No data"}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Url</span>: {isSuccess && gitdata ? <a href={gitdata?.userData?.githubLink} target="_blank" type='button' className='btn btn-danger' >Visit Github</a> : "No data"}</p>


                        </div>


                    </div>
                </div>
                <div className='col-md-12 text-start' style={isLoading ? blurredStyle : visibleStyle}>
                    <h4 className="text-white  mb-2" style={{ backgroundColor: '#6b050b', padding: '4px', borderRadius: '10px' }}>
                        <i className='fa fa-github'></i> &nbsp; Total Commits : {isSuccess && gitdata?.totalCommits}
                    </h4>
                    <table class="table">
                        <thead>
                            <tr>

                                <th scope="col">Repo Name</th>

                                <th scope="col">Recent Commit history</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                isSuccess && gitdata && gitdata.repositoriesData?.map((ele, index) => (
                                    <tr key={index}>

                                        <td>{ele.name}</td>

                                        <td>{convertToIndianStandardTime(ele.commitHistory[0]?.date)}</td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
                <div class="col-md-12">
                    <div class="h4 text-center mb-4 title">Technical Skills</div>
                    <div class="card" style={{ boxShadow: " 0px 7px 12px -3px #6b050b" }}>
                        {
                            isSuccess && gitdata && (
                                <div class="card-body">
                                    <div class="row">
                                        {Object.entries(gitdata.averageLanguagesPercentage).map(([key, value], index) => (
                                            <div class="col-md-6" key={key}>
                                                <div class="progress-container">
                                                    <span class="progress-label">{key}</span>
                                                    <div class="custom-progress-bar">
                                                        <div
                                                            class="progress-fill"
                                                            style={{ width: `${value}%`, backgroundColor: '#6b050b' }}
                                                        ></div>
                                                    </div>
                                                    <span class="progress-value">{value}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }


                    </div >
                </div >
            </div>
        </div>
    );
};

export default StudentLandingPage;
