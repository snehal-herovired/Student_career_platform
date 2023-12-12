import { useForm } from 'react-hook-form';
import { Link, redirect, useNavigate } from 'react-router-dom';
import usePostRequest from '../customeHooks/SendData';
import "../../styles/normallayout.css"
import { useEffect, useState } from 'react';
import axios from 'axios';
import {axiosInstance} from '../../connection';
export default function Login({ setLogin, login,setStudentLogin,studentlogin }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isStudent, setIsStudent] = useState(false);
  // const [login, setLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (login && !isStudent) {
     navigate('/admin')
    }
    if (studentlogin && isStudent) {
      navigate('/student')
    }
  }, [login, isStudent,studentlogin]);

  const onSubmit = async (data) => {
    try {
      const ApiUrl = isStudent ? `/student/login` : `/user/login`;
      const response = await axiosInstance.post(ApiUrl, data);
      const maindata = response.data;
      // console.log("LOGIN RES DATA", maindata);
      if (maindata && maindata.admin) {
        setLogin(true);
        setStudentLogin(false)
        localStorage.setItem('login', 'true');
        localStorage.setItem("token",  maindata.token);
      } else if (maindata && !maindata.admin) {
        
        setStudentLogin(true)
        setLogin(false)
        localStorage.setItem('studentlogin', 'true');
        localStorage.setItem("token",  maindata.token);
        localStorage.setItem('studentId', maindata.student._id);
        localStorage.setItem('batchId', maindata.student.batchId);
      }
      setErrorMessage('');
    } catch (error) {
      console.error('Login Error:', error.message);
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  function handleSet() {
    setIsStudent((prev) => !prev);
    setErrorMessage('')
  }
  return (



    <div className="animation-container">
      <div className="container" style={{ padding: '20px', height: "100%", width: '100%', }}>
        <div className="row" style={{ height: '100%', width: '100%' }}>
          <div className="col-md-6  ">

          </div>
          {
            !isStudent ? <div className="col-md-6 " style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <h5 style={{ textAlign: 'center', cursor: 'pointer' }} type="button" className='btn btn-danger' onClick={handleSet}>GO TO STUDENT LOGIN</h5>
              <h2 style={{ textAlign: 'center' }}>Admin/Career Login</h2>
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                <div className="mb-3">
                  <label htmlFor="registerEmail" className="form-label" style={{ marginLeft: "30px" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    style={{ width: '80%', marginLeft: "30px" }}
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="registerEmail"
                    {...register('email', { required: 'Email is required' })}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="registerPassword" className="form-label" style={{ marginLeft: "30px" }}>
                    Password
                  </label>
                  <input
                    style={{ width: '80%', marginLeft: "30px" }}
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="registerPassword"
                    {...register('password', { required: 'Password is required' })}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>
                <button type="submit" className="btn btn-danger" style={{ marginLeft: "30px" }}>
                  Login
                </button>
                {
                  login && <p style={{ color: 'red', margin: '2px' }}>Login Successfully</p>
                }
                {errorMessage && <p style={{ color: 'red', marginLeft: "30px", marginTop: '5px' }}>{errorMessage}</p>}
                
              </form>
            </div>
              :
              <div className="col-md-6 " style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <h5 style={{ textAlign: 'center', cursor: 'pointer' }} type="button" className='btn btn-danger' onClick={handleSet}>GO TO ADMIN LOGIN</h5>
                <h2 style={{ textAlign: 'center' }}>Student Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                  <div className="mb-3">
                    <label htmlFor="registerEmail" className="form-label" style={{ marginLeft: "30px" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      style={{ width: '80%', marginLeft: "30px" }}
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="registerEmail"
                      {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    
                  </div>

                  <div className="mb-3">
                    <label htmlFor="registerPassword" className="form-label" style={{ marginLeft: "30px" }}>
                      Password
                    </label>
                    <input
                      type="password"
                      style={{ width: '80%', marginLeft: "30px" }}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="registerPassword"
                      {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                  </div>
                  <button type="submit" className="btn btn-danger" style={{ marginLeft: "30px" }}>
                    Login
                  </button>
                  {
                    login && <p style={{ color: 'red', margin: '2px' }}>Login SuccessFull</p>
                  }
                  {errorMessage && <p style={{ color: 'red',marginLeft: "30px", marginTop: '2px' }}>{errorMessage}</p>}
                </form>
              </div>
          }
        </div>
      </div>
      <div className="lightning-container">
        <div className="lightning white"></div>
        <div className="lightning red"></div>
      </div>
      <div className="boom-container">
        <div className="shape circle big white"></div>
        <div className="shape circle white"></div>
        <div className="shape triangle big yellow"></div>
        <div className="shape disc white"></div>
        <div className="shape triangle blue"></div>
      </div>
      <div className="boom-container second">
        <div className="shape circle big white"></div>
        <div className="shape circle white"></div>
        <div className="shape disc white"></div>
        <div className="shape triangle blue"></div>
      </div>
      <div className="hero-text">Hero Vired
        <div className="sub-text">Be Made For Big Things</div>
      </div>
    </div>


  );
}
