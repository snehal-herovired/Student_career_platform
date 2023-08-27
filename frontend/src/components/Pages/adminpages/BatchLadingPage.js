import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Url } from '../../../connection';
import useGetRequest from '../../customeHooks/fetchData';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {axiosInstance} from '../../../connection';
const BatchLandingPage = () => {
    const { id } = useParams()
    const [searchTerm, setSearchTerm] = useState('');
    const { data, isError: getrequestError, isLoading: getrequestLoading, refetch, isSuccess,error } = useQuery(['batchdata'], async () => {
        let response = await axiosInstance.get(`/batch/${id}`)
        return response.data
    })
    // console.log("batchdata :", data);
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

    // Function to filter batches based on search term

    if (isSuccess && data && data.batch && data.batch.students) {
        filteredStudents = data.batch.students.filter((student) => {
            const StudentbyEmail = student.email?.toLowerCase();
            return StudentbyEmail?.includes(searchTerm);
        });
    }
    if (getrequestLoading) {
        return <div>Data Loading...</div>
    }
    if (getrequestError) {
        return <div>Error loading data : {error.message}</div>
    }

    return (
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
                {filteredStudents.length !== 0 &&
                    filteredStudents.map((student, id) => (
                        <div key={student._id} className="col">
                            < div className="card  " style={{ backgroundColor: '#FFEADD', boxShadow: '15px 18px 15px -3px rgba(0,0,0,0.1)', borderRadius: '10px', fontFamily: 'Poppins' }}>
                                <div className="card-body " >

                                    <h5 className="card-title">Batch: {data.batch.name}</h5>
                                    <p className="card-text">{student.email}</p>
                                    <p className="card-text">{student.username}</p>
                                    <Link to={`/admin/${student._id}`} className="btn btn-danger">View Student Detail</Link>
                                </div>
                            </div>
                        </div>

                    ))


                }
            </div>
        </div >
    );
};

export default BatchLandingPage;
