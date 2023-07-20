import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useGetRequest from '../../customeHooks/fetchData';
import useTimerRequest from '../../customeHooks/timerFetchData';
import { Url } from '../../../connection';
const StudentLandingPage = () => {
    const { id } = useParams();
    const { data: SingleStudentData, isError: getrequestError, isLoading: getrequestLoading, refetch, isSuccess } = useTimerRequest(`${Url}/student/students/${id}`)
    console.log(SingleStudentData,"this is Single Student Data");
    const blurredStyle = { filter: 'blur(2px)' };
  const visibleStyle = { filter: 'none' };
      return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 " style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    {/* Circular Image */}
                    <div
                        className="rounded-circle  text-light d-inline-block p-4"
                        style={{ width: '150px', height: '150px',border:'1px solid #6b050b ',boxShadow:" 0px 7px 12px -3px #6b050b" }}
                    >
                        {/* You can put your circular image here */}
                        <img
                            src="/images/heroRed.png"
                            alt="Student"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                        />
                    </div>
                </div>
                <div className="col-md-6 text-center" style={getrequestLoading ? blurredStyle : visibleStyle}>
                    {/* Student Data */}
                    <h1 className="text-center text-white mb-4" style={{ backgroundColor: '#6b050b', padding: '10px',borderRadius:'10px' }}>
                        Student Details
                    </h1>
                    <div className="text-black">
                        <p>Batch: {isSuccess && SingleStudentData.batchId.name }</p>
                        <p>Email: {isSuccess && SingleStudentData.email}</p>
                        <p>Username: {isSuccess && SingleStudentData.username }</p>
                        <p>LinkedIn: linkedin.com/student</p>
                        {/* Add more student data here */}
                    </div>
                </div>
            </div>

            <div className="row mt-5">

                <div className='col-md-6 ' style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Link to="/resume">
                        <button className="btn btn-danger  mt-4" style={{boxShadow:" 0px 7px 12px -3px #6b050b",fontWeight:'bold'}}>Go to Resume</button>
                    </Link>
                </div>
                <div className="col-md-6 text-center" style={getrequestLoading ? blurredStyle : visibleStyle} >
                    {/* Batch Details */}
                    <h1 className="text-white mb-2" style={{ backgroundColor: '#6b050b', padding: '4px',borderRadius:'10px' }}>
                        Batch Details
                    </h1>
                    <div className="text-black">
                        <p>Batch Name: {isSuccess && SingleStudentData.batchId.name }</p>
                        <p>Course: {isSuccess && SingleStudentData.batchId.course }</p>
                          <p>Start Date: { isSuccess && SingleStudentData.batchId.startDate}</p>
                        <p>End Date: 31 December 2023</p>
                        {/* Add more batch details here */}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentLandingPage;
