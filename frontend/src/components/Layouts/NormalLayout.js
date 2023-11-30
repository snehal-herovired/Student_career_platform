import React, { useEffect, useState } from 'react'
import '../../App.css'
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import '../../styles/drawer.css'
export default function NormalLayout({ setLogin }) {
  const navigate = useNavigate();

  let btnStyle = {
    border: "1px solid rgb(128,128,128,0.2)",
    height: '30px',
    width: '70px',
    color: '#6b050b',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  }
  let headerstyle = {
    boxShadow: "-4px 19px 28px -24px rgba(0,0,0,0.32)",
    color: 'black',
    height: "10%",
    width: "100%",
    background: 'white'


  }
  function handleLogout() {
    setLogin(false)
    localStorage.removeItem('login')
    navigate('/login');
  }
  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* Header  */}
      <nav className="navbar sticky-top navbar-expand-lg  " style={headerstyle}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/admin" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: "20%", fontSize: '1.5rem', background: '#6b050b', borderRadius: "4px" }}>Vired's Corner</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>


          <button className="btn " style={btnStyle} type="button" data-bs-toggle="offcanvas" data-bs-target="#normaloffcanvasExample" aria-controls="normaloffcanvasExample">
            <div style={{}}>
              <i className="fa fa-bars" ></i>

            </div>

          </button>




          <div className="offcanvas offcanvas-start" tabIndex="-1" id="normaloffcanvasExample" aria-labelledby="normaloffcanvasExampleLabel">
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


        </div>
      </nav>

      {/* other outlets here :------ */}
      <Outlet />
    </div>
  )
}
