import React, { useEffect, useState } from 'react'
import '../../App.css'
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import '../../styles/drawer.css'
export default function NormalLayout({login}) {
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

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* Header  */}
      <nav class="navbar sticky-top navbar-expand-lg  " style={headerstyle}>
        <div class="container-fluid">
          <NavLink className="navbar-brand" to="/student/" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: "20%", fontSize: '1.5rem', background: '#6b050b', borderRadius: "4px" }}>Vired's Corner</NavLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          
          {
            login &&   <button class="btn " style={btnStyle} type="button" data-bs-toggle="offcanvas" data-bs-target="#normaloffcanvasExample" aria-controls="normaloffcanvasExample">
            <div style={{}}>
            <i class="fa fa-bars" ></i>
            
            </div>

          </button>
            } 
  
          

          <div class="offcanvas offcanvas-start" tabindex="-1" id="normaloffcanvasExample" aria-labelledby="normaloffcanvasExampleLabel">
            <div class="offcanvas-header drawer-header" style={{ background: 'white', color: 'red' }}>
              <h5 class="offcanvas-title" id="normaloffcanvasExampleLabel" style={{ fontWeight: "bolder" }}>Vired Menu</h5>
              <button type="button" class=" custom-btn-close" data-bs-dismiss="offcanvas" aria-label="Close"><i className='fa fa-share-square-o'></i></button>
            </div>
            <div class="offcanvas-body drawer-body" >
              <div>
                <ul class="menu-list">
                  <li class="menu-item" onClick={() => navigate('/batches')}>
                    <i class="fa fa-edit menu-icon"></i> &nbsp; View Batches
                  </li>
                  <li class="menu-item" onClick={() => navigate('/students')}>
                    <i class="fa fa-edit menu-icon"></i> &nbsp; View Students
                  </li>
                  <li class="menu-item" onClick={() => navigate('')}>
                    <i class="fa fa-share menu-icon"></i> &nbsp; View all Projects
                  </li>
                  <li class="menu-item" onClick={() => navigate('/student/myresume')}>
                    <i class="fa fa-file-pdf-o menu-icon"></i> &nbsp; View Resumes 
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
