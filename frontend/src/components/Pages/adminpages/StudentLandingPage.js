import React from 'react';
import { Link, useParams, useNavigate, NavLink } from 'react-router-dom';
import useGetRequest from '../../customeHooks/fetchData';
import useTimerRequest from '../../customeHooks/timerFetchData';
import { Url } from '../../../connection';
const StudentLandingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isError: getrequestError, isLoading: getrequestLoading, refetch, isSuccess } = useTimerRequest(`${Url}/student/github/${id}`)
    console.log(data, "this is Single Student Data");
    const blurredStyle = { filter: 'blur(2px)' };
    const visibleStyle = { filter: 'none' };
    // if (getrequestLoading) {
    //     return <div>Data Loading...</div>
    // }
    // if (getrequestError) {
    //     return <div>Error !! Either no data or Network error..<NavLink to='/admin' type='button' className="btn btn-danger">Dashboard</NavLink></div>
    // }
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 " style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    {/* Circular Image */}
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
                        isSuccess && data.gitdata ? <Link to={`/admin/resume/${data.studentData._id}`} style={getrequestLoading ? blurredStyle : visibleStyle}>
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
                        Student Details
                    </h4>
                    <div className="text-black" style={{ marginLeft: "5px", padding: "5px" }}>
                        <p><span style={{ fontWeight: 'bold' }}>Batch</span>: {isSuccess && data.studentData && data.studentData.batchId ? data.studentData.batchId.name : "No data"}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Email</span>: {isSuccess && data.studentData ? data.studentData.email : "No data"}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Username</span>: {isSuccess && data.studentData ? data.studentData.username : "No data"}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Batch Name</span>: {isSuccess && data.studentData ? data.studentData.batchId.name : "No data"}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Course</span>: {isSuccess && data.studentData ? data.studentData?.batchId.course : "No data"}</p>

                    </div>
                </div>
            </div>

            <div className="row mt-5">


                <div className="col-md-12 text-start" style={getrequestLoading ? blurredStyle : visibleStyle} >
                    {/* Batch Details */}
                    <h4 className="text-white  mb-2" style={{ backgroundColor: '#6b050b', padding: '4px', borderRadius: '10px' }}>
                        Github Details
                    </h4>
                    <div className=" row text-black" style={{ marginLeft: "5px", padding: "5px" }}>
                        <div className="col-6">
                            <p><span style={{ fontWeight: 'bold' }}>Username</span>: {isSuccess && data && data.gitdata ? data.gitdata.username : "No data"}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Name</span>: {isSuccess && data && data.gitdata ? data.gitdata.name : "No data"}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Account CreatedAt</span>: {isSuccess && data && data.gitdata ? data.gitdata.gitAccountCreated : "No data"}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Email</span>: {isSuccess && data && data.gitdata ? data.gitdata.email : "No data"}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Followers</span>: {isSuccess && data && data.gitdata ? data.gitdata.followers : "No data"}</p>
                        </div>
                        <div className="col-6">
                            <p><span style={{ fontWeight: 'bold' }}>Public Repos</span>: {isSuccess && data && data.gitdata ? data.gitdata.public_repos : "No data"}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Public Gists</span>: {isSuccess && data && data.gitdata ? data.gitdata.public_gists : "No data"}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Total Repo</span>: {isSuccess && data && data.gitdata ? data.gitdata.total_repositories : "No data"}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Bio</span>: {isSuccess && data && data.gitdata ? data.gitdata.bio : "No data"}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Url</span>: {isSuccess && data && data.gitdata ? <a href={`https://github.com/${data.gitdata.username}`} target="_blank" type='button' className='btn btn-danger' >Visit Github</a> : "No data"}</p>


                        </div>
                        {/* <p>Batch Name: {isSuccess && SingleStudentData.batchId.name }</p>
                        <p>Course: {isSuccess && SingleStudentData.batchId.course }</p> */}

                        {/* Add more batch details here */}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentLandingPage;
