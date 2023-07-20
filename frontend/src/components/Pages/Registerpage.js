import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import usePostRequest from '../customeHooks/SendData';
import useGetRequest from '../customeHooks/fetchData';
import { Url } from '../../connection';
import "../../styles/normallayout.css"
export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  let ApiUrl = `${Url}/student/register`;
  const mutation = usePostRequest(ApiUrl);
  const { data: batchdata, isError: getrequestError, isLoading: getrequestLoading, refetch } = useGetRequest(`${Url}/batch/all`)
  console.log("batchData :", batchdata);
  const onSubmit = async (data) => {
    // Perform register logic here
    // using the custom component to deal with post request;
    console.log('Register:', data);

    try {
      await mutation.mutateAsync(data);
      // Mutation was successful
    } catch (error) {
      // Handle error
      console.log(error);
    }

  };

  if (getrequestLoading) {
    return <div>Data Loading...</div>;
  }
  if (getrequestError) {
    return <div>{`An Error has occurred!`}<br />{`${getrequestError.message}`}</div>
  }

  return (
    <div className="container " style={{ padding: '20px', height: "90%", width: '100%' }}>
      <div className="row" style={{ height: '100%', width: '100%' }}>
      <div className="col-md-6  masterlogo">

</div>
        <div className="col-md-6 " style={{ padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ textAlign: 'center' }}>Register</h2>
          {
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="mb-3">
                <label htmlFor="registerEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="registerEmail"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
              </div>
              <div className="mb-3" >
                <label htmlFor="registerUsername" className="form-label">
                  Username
                </label>
                <input
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                  type="text"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  id="registerUsername"
                  {...register('username', { required: 'Username is required' })}
                />
                {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="registerPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="registerPassword"
                  {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="registerPassword" className="form-label">
                  Batch
                </label>
                <select multiple style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }} className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="batch" name="batch"   {...register('batchId', { required: 'batch is required' })}>

                  {
                    batchdata.length !== 0 && batchdata.map((ele) => (
                      <option value={ele._id}

                      >{ele.name}</option>
                    ))
                  }

                </select>
                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}

              </div>
              <button type="submit" className="btn btn-danger">
                Register
              </button>
              {mutation.isSuccess && <h6 style={{ color: 'red' }}>Data inserted sucessfully</h6>}
              <span style={{ marginLeft: '3px' }}>Already registered?  <Link to='login' style={{textDecoration:'none'}}>Login here</Link></span>
            </form>
          }
        </div>
      
      </div>
    </div >
  );
}
