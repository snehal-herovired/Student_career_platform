import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Link, redirect, useNavigate } from 'react-router-dom';
import usePostRequest from '../customeHooks/SendData';
import { Url } from '../../connection';
export default function Login({setLogin,login}) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const [isStudent, setIsStudent] = React.useState(false)
  const ApiUrl = isStudent ? `${Url}/student/login` : `${Url}/user/login`
  const mutation = usePostRequest(ApiUrl);
  const onSubmit = (data) => {
    mutation.mutate(data)
    if (mutation.isSuccess) {
      
      setLogin(true)
      localStorage.setItem('login','true')
      if (!isStudent) {
        navigate('/admin')
        return;
      }
      const { data: maindata } = mutation;
      console.log(maindata, "MAINDATA");
      localStorage.setItem("token", JSON.stringify({ token: maindata.token }))
      localStorage.setItem('studentId', maindata._id)
      localStorage.setItem('batchId', maindata.batchId)


      navigate('/student')
    }
  };

  return (
    <div className="container" style={{ padding: '20px', height: "90%", width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="row" style={{ height: '100%', width: '100%' }}>
        <div className="col-md-6  masterlogo">

        </div>
          {
            !isStudent ? <div className="col-md-6 " style={{ background: '#ffffff', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',display:'flex',justifyContent: 'center',alignItems:'center',flexDirection:'column' }}>
              <h5 style={{ textAlign: 'center' }} onClick={() => setIsStudent((prev) => !prev)}>GO TO STUDENT LOGIN</h5>
              <h2 style={{ textAlign: 'center' }}>Admin/Career Login</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="registerEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="registerEmail"
                    {...register('email', { required: 'Email is required' })}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="registerPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="registerPassword"
                    {...register('password', { required: 'Password is required' })}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>
                <button type="submit" className="btn btn-danger">
                  Login
                </button>
                {
                  mutation.isSuccess && <h6 style={{ color: 'red' }}>Login SuccessFull</h6>
                }
                <span style={{ marginLeft: '3px' }}>Not registered?  <Link to='/' style={{textDecoration:'none'}}>Register here</Link></span>
              </form>
            </div>
              :
              <div className="col-md-6 " style={{ background: '#ffffff', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',display:'flex',justifyContent: 'center',alignItems:'center',flexDirection:'column' }}>
                <h5 style={{ textAlign: 'center' }} onClick={() => setIsStudent((prev) => !prev)}>GO TO ADMIN LOGIN</h5>
                <h2 style={{ textAlign: 'center' }}>Student Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label htmlFor="registerEmail" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="registerEmail"
                      {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="registerPassword" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="registerPassword"
                      {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                  </div>
                  <button type="submit" className="btn btn-danger">
                    Login
                  </button>
                  {
                    mutation.isSuccess && <h6 style={{ color: 'red' }}>Login SuccessFull</h6>
                  }
                  <span style={{ marginLeft: '3px' }}>Not registered?  <Link to='/' style={{textDecoration:'none'}}>Register here</Link></span>
                </form>
              </div>
          }
        </div>
    </div>


  );
}
