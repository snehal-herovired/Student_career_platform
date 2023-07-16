import React from 'react'
import '../../App.css'
import { NavLink, Outlet } from "react-router-dom"
export default function NormalLayout() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* Header  */}
      <nav class="navbar sticky-top navbar-expand-lg navbar-dark  bg-dark" style={{ height: "10%", width: "100%" }}>
        <div class="container-fluid">
          <NavLink className="navbar-brand" to="">PortFolios</NavLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              
              <li class="nav-item">
                <NavLink className="nav-link " aria-current="page" to=''>Dashboard</NavLink>
              </li>

              <li class="nav-item">
                <NavLink className="nav-link " aria-current="page">Batches</NavLink>

              </li>
              <li class="nav-item">
                <NavLink className="nav-link " aria-current="page" to='login'>Login</NavLink>

              </li>
              <li class="nav-item">
                <NavLink className="nav-link " aria-current="page" to='/'>Register</NavLink>

              </li>
            </ul>
            {/* <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
          </div>
        </div>
      </nav>

      {/* other outlets here :------ */}

        <Outlet />
      
    </div>
  )
}
