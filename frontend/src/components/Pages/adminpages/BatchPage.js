import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useGetRequest from '../../customeHooks/fetchData';
import { Url } from '../../../connection';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {axiosInstance} from '../../../connection';
const BatchPage = () => {
    const { data: batchdata, isError: getrequestError, isLoading: getrequestLoading, refetch, isSuccess,error } = useQuery(['singlebatch'], async () => {
        let response = await axiosInstance.get(`/batch/all`)
        return response.data
    })
    // console.log("batchData :", batchdata);
    let filteredBatches = [];
    // Sample batch data (replace this with your actual batch data)
    // const batchData = [
    //     { id: 1, name: 'Batch 1' },
    //     { id: 2, name: 'Batch 2' },
    //     { id: 3, name: 'Batch 3' },
    //     // Add more batches as needed
    // ];

    const [searchTerm, setSearchTerm] = useState('');

    // Function to handle search input change
    const handleSearchChange = (e) => {
        const searchString = e.target.value.toLowerCase().replace(/\s+/g, '');
        setSearchTerm(searchString);
    };

    // Function to filter batches based on search term
    if (isSuccess && batchdata.length > 0) {
        filteredBatches = batchdata.filter((batch) => {
            const batchNameWithoutSpaces = batch.name?.toLowerCase().replace(/\s+/g, '');
            return batchNameWithoutSpaces?.includes(searchTerm);
        });
    }

    if (getrequestLoading) {
        return <div>Data Loading...</div>
    }
    if (getrequestError) {
        return <div>{error.message }...<button type='button' className='btn btn-success' onClick={refetch}>Reload data</button></div>
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
                {filteredBatches.length !== 0 ?
                    filteredBatches.map((batch) => (
                        <div key={batch.id} className="col">
                            < div class="card  " style={{ backgroundColor: '#FFEADD', boxShadow: '15px 18px 15px -3px rgba(0,0,0,0.1)', borderRadius: '10px', fontFamily: 'Poppins' }}>
                                <div class="card-body " >

                                    <h5 class="card-title">Batch: {batch.name}</h5>

                                    <Link to={`/admin/batch/${batch._id}`} class="btn btn-danger">View Student Detail</Link>
                                </div>
                            </div>
                        </div>

                    ))
                    :
                    <p>No batch data found !!</p>
                }
            </div>
        </div>
    );
};

export default BatchPage;
