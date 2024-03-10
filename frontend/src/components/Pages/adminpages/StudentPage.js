import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Url } from '../../../connection';
import "../../../styles/background.css"
import useGetRequest from '../../customeHooks/fetchData';
import { axiosInstance } from '../../../connection';
const StudentPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: studentdata, isError: getrequestError, isLoading: getrequestLoading, refetch, isSuccess } = useGetRequest(`${Url}/student/students`)
    // console.log("student :", studentdata);
    const navigate = useNavigate();
    let filteredStudents = [];
    // Sample batch data (replace this with your actual batch data)
    //   const studentData = [
    //     {  _id:'1',email: 'hero@hero.com',username:"Pegasis",batch:"batch 8" },

    //     // Add more batches as needed
    //   ];


    // Function to handle search input change
    const handleSearchChange = (e) => {
        const searchString = e.target.value.toLowerCase();
        setSearchTerm(searchString);
    };
    const [removeStatus, setremoveStatus] = useState(false);


    // Function to filter batches based on search term

    if (isSuccess && studentdata.length > 0) {
        filteredStudents = studentdata.filter((student) => {
            const StudentbyEmail = student.email?.toLowerCase();
            return StudentbyEmail?.includes(searchTerm);
        });
    }
    if (getrequestLoading) {
        return <div>Data Loading...</div>
    }
    if (getrequestError) {
        return <div>Error loading data...</div>
    }

    async function deletestudent(studentId) {
        try {
            const response = await axiosInstance.delete(`/student/students/${studentId}`);
            if (response.status == 200) {
                alert("Student has been removed")

                return;
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <div className="container mt-5">
                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Batch Name..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {filteredStudents.length !== 0 ?
                        filteredStudents.map((student, id) => (
                            <div key={student._id} className="col">
                                {/* <div className="card shadow-sm" style={{ backgroundColor: '#6b050b', borderRadius: '10px' }}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-3">

                                    <img src="/images/heroRed.png" alt="" srcSet="" style={{ height: "80%", width: '100%', borderRadius: '10px' }} />
                                        </div>
                                        <div className="col-9">
                                        <h6 className="card-title text-white"> {student.email}</h6>
                                    <h6 className="card-title text-white">  {student.username}</h6>
                                    <h6 className="card-title text-white"> {student?.batchId?.name}</h6>
                                    <Link to={`/admin/${student._id}`}>
                                        <button type="button" className="btn btn-danger" onClick={()=>navigate('')}>
                                            View Student Detail
                                        </button>
                                    </Link>
                                        </div>
                                    </div>
                                  
                                </div>
                            </div> */}
                                <div className="card  " style={{ backgroundColor: '#FFEADD', boxShadow: '15px 18px 15px -3px rgba(0,0,0,0.1)', borderRadius: '10px', fontFamily: 'Poppins' }}>
                                    <div className="card-body " >
                                        <h5 className="card-title">Name: {student.username}</h5>
                                        <p className="card-text"> {student.email}</p>
                                        <p className="card-text">{student?.batchId?.name}</p>
                                        <Link to={`/admin/${student._id}`} className="btn btn-danger">View Student Detail</Link>
                                        <i class="fa fa-trash-o" style={{ fontSize: "24px", marginLeft: "100px", cursor: "pointer" }}
                                            onClick={() => deletestudent(student._id)}

                                        ></i>
                                    </div>

                                </div>

                            </div>


                        ))
                        :
                        <p>No Student data found !!</p>
                    }
                </div>
            </div>

        </>
    );
};

export default StudentPage;
