import React, { useEffect, useState } from 'react'
import '../../App.css'
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import '../../styles/drawer.css'
import AllHeader from '../../views/AllHeader';
export default function NormalLayout({ setLogin ,login}) {
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
      <AllHeader setLogin={setLogin} login={login} />
      {/* other outlets here :------ */}
      <Outlet />
    </div>
  )
}

      