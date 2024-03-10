import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { axiosInstance } from '../connection'
export default function AllHeader({ setLogin, login }) {

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

  const navigate = useNavigate();
  function handleLogout() {
    setLogin(false)
    localStorage.removeItem('login')
    navigate('/');
  }
  let btnStyle = {
    // border: "1px solid rgb(128,128,128,0.2)",
    height: '30px',
    width: '70px',
    color: '#6b050b',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding:'2px',
    marginLeft:'3px'

  }
  let headerstyle = {
    color: 'black',

    background: '#f9f4f4'


  }
  let cursorStyles = {
    cursor: 'pointer'
  }
  return (
    <div className="home-header">
      <header data-thq="thq-navbar" className="home-navbar-interactive">
        <span className="home-logo" onClick={() => navigate('/admin')} style={cursorStyles}>Viredstore</span>
        <div data-thq="thq-navbar-nav" className="home-desktop-menu">
          <nav className="home-links">
            <span className="home-nav4" data-bs-toggle="modal" data-bs-target="#exampleModal" style={cursorStyles}>Recent Activity<span className="badge rounded-pill bg-dark">{recentActivity.length}</span></span>
            <span className="home-nav5" onClick={() => navigate('/admin/projects')} style={cursorStyles}>Projects<span className="badge rounded-pill bg-dark">{allprojects.length}</span></span>
            <span className="home-nav2" onClick={() => navigate('/admin/controls')} style={cursorStyles}>Control Panel</span>
            
          </nav>
          {/* <div className="home-buttons">
            {
              login ?
                <button className="btn btn-danger" type='button' style={{borderRadius:'20px'}} onClick={handleLogout}>Logout</button>
                :
                <button className="btn btn-danger" type='button' style={{borderRadius:'20px'}}  onClick={() => navigate('/login')}>Login</button>

            }
          </div> */}
        </div>

        <button className="btn " style={btnStyle} type="button" data-bs-toggle="offcanvas" data-bs-target="#normaloffcanvasExample" aria-controls="normaloffcanvasExample">
          <div style={{}}>
            <i className="fa fa-bars" ></i>

          </div>

        </button>
      </header>
      <div className="offcanvas offcanvas-start" style={{ zIndex: 1050 }} tabIndex="-1" id="normaloffcanvasExample" aria-labelledby="normaloffcanvasExampleLabel">
        <div className="offcanvas-header drawer-header" style={{ background: 'white', color: 'red' }}>
          <h5 className="offcanvas-title" id="normaloffcanvasExampleLabel" style={{ fontWeight: "bolder" }}>Vired Menu</h5>
          <button type="button" className=" custom-btn-close" data-bs-dismiss="offcanvas" aria-label="Close"><i className='fa fa-share-square-o'></i></button>
        </div>
        <div className="offcanvas-body drawer-body" >
          <div>
            <ul className="menu-list">
              <li className="menu-item" onClick={() => navigate('/admin')}>
                <i className="fa fa-share menu-icon"></i> &nbsp; Dashboard
              </li>
              <li className="menu-item" onClick={() => navigate('/admin/batches')}>
                <i className="fa fa-share menu-icon"></i> &nbsp; View Batches
              </li>
              <li className="menu-item" onClick={() => navigate('/admin/students')}>
                <i className="fa fa-share menu-icon"></i> &nbsp; View Students
              </li>
              <li className="menu-item" onClick={() => navigate('/admin/controls')}>
                <i className="fa fa-share menu-icon"></i> &nbsp; Control Panel
              </li>

              {/* <li className="menu-item" onClick={() => navigate('/student/myresume')}>
                     <i className="fa fa-file-pdf-o menu-icon"></i> &nbsp; View Resumes 
                   </li> */}
              <li className="menu-item" onClick={handleLogout}>
                <i className="fa fa-share menu-icon"></i> &nbsp; Logout
              </li>
            </ul>
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
                    recentActivity?.map((activity, index) => (
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

    </div>
  )
}
