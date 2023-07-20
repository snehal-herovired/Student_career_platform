import React from 'react'
import { useNavigate } from "react-router-dom"
export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className='homepage'>
      {/* <img src="/images/hero.jpg" alt="background_image" style={{ height:"100%",width: "100%",overflow:"hidden",zIndex:"-2", filter: "blur(2px)",}} /> */}
      <div className="blurry-image" style={{ height: "100%", width: "100%", overflow: "hidden", position: "relative" }}>
        <div
          className="background-overlay"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: '#6b050b'}}
        />
   
        {/* <div style={{
          height: "100%",
          width: "50%",
          position: "absolute",
          top: "50%",
          left: "50%",
          backgroundColor: '#6b050b',
          transform: "translate(-50%, -50%)",
          filter: "blur(4px)", // Apply the blur effect with 10px radius
        }}></div> */}
      </div>
      <div className="homepage-details" >
        {/* <div
          className="animated-text"
          style={{
            fontSize: "2rem",
            fontWeight: "bolder",
            color: "red",
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "80%",
            position: "relative",
          }}
        >
          <div
            className="animation-text"
            style={{
              position: "absolute",
              bottom: "-100%",
              animation: "fade-in-out 4s linear",
              width: "100%",
              textAlign: "center",
            }}
          >
            Welcome!! To the Scholar's Corner.
          </div>
        </div> */}
        <div className='landing-page-back' style={{ color: 'white', width: "60%", height: '70%', marginTop: '10px', display: 'flex', alignItems: 'center', textAlign: 'center', flexDirection: 'column', justifyContent: 'center', fontSize: 'larger' }}>
          Welcome to Student Corner, your gateway to tracking students' resumes and showcasing their project portfolios! We empower students to shine by providing a platform to display their achievements and skills, making it easier for recruiters to discover top talent. Join us on this journey of excellence, where potential meets opportunity. Let's build a brighter future together!


        </div>
        <div style={{

          width: '60%', marginTop: '10px', display: 'flex', justifyContent: 'center', position: 'relative', left: '20px', top: '50px'

        }}>
          <button type="button" style={{ background: 'red', color: 'white', textAlign: 'center' }} className="btn " onClick={() => navigate('home')}>
            Home
          </button>


        </div>
        {/* <div style={{ fontSize: "2rem", fontWeight: "bolder", color: 'red' }}>Hero Vired</div> */}

      </div>
    </div>
  )
}
