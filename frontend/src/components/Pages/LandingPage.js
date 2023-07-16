import React from 'react'
import {useNavigate} from "react-router-dom"
export default function LandingPage() {
  const navigate = useNavigate();

  return (
      <div className='homepage'>
          <img src="/images/hero.jpg" alt="background_image" style={{ height:"100%",width: "100%",overflow:"hidden",zIndex:"-1"}} />
          <div className="homepage-details" >
              <div style={{fontSize:"2rem",fontWeight:"bolder"}}>Welcome...</div>
              <div style={{fontSize:"1.3rem"}}>Your journey with us begins here...</div>
              <div style={{fontSize:"2rem",fontWeight:"bolder",color:'red'}}>Hero Vired</div>
          <button type="button" class="btn btn-success" onClick={()=>navigate('home')}>Home</button>
          </div>
    </div>
  )
}
