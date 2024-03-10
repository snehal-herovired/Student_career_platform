import React from 'react'
import { Outlet, NavLink, useNavigate } from "react-router-dom"
import '../../styles/drawer.css'
export default function StudentLayout({setStudentLogin}) {
    const navigate = useNavigate();
    let btnStyle = {
        border: "1px solid #6b050b",
        height: '30px',
        width: '70px',
        color: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    }
    let headerstyle = {
        boxShadow: "-4px 19px 28px -24px rgba(0,0,0,0.32)",
        color:'black',
        height: "10%",
        width: "100%",
       background:'white'
        

  }
    let fontstyle = {
        color: 'black',
        
    }

    function handleLogout() {
        setStudentLogin(false)
        localStorage.removeItem("login");
        navigate('/login')
    }
    return (
        <div style={{ height: "100%", width: "100%" }}>
            {/* Header  */}
            <nav className="navbar sticky-top navbar-expand-lg  " style={headerstyle}>
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/student/" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%',width:"20%", fontSize: '1.5rem' ,background:'#6b050b',borderRadius:"4px"}}>Scholar's Corner</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <button className="btn " style={btnStyle} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                        <div style={{color:'#6b050b'}}><i className="fa fa-bars" ></i></div>

                    </button>

                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div className="offcanvas-header drawer-header" style={{background:'white',color:'red'}}>
                            <h5 className="offcanvas-title" id="offcanvasExampleLabel" style={{fontWeight:"bolder"}}>Student Menu</h5>
                            <button type="button" className=" custom-btn-close" data-bs-dismiss="offcanvas" aria-label="Close"><i className='fa fa-share-square-o'></i></button>
                        </div>
                        <div className="offcanvas-body drawer-body" >
                            <div>
                                <ul className="menu-list">
                                    {/* <li class="menu-item" onClick={()=>navigate('/student/resume')}>
                                        <i class="fa fa-edit menu-icon"></i> &nbsp; Create Resume
                                    </li> */}
                                    <li className="menu-item" onClick={()=>navigate('/student/home')}>
                                        <i className="fa fa-edit menu-icon"></i> &nbsp; View Editable Template
                                    </li>
                                  
                                    
                                    <li className="menu-item" onClick={()=>navigate('/student/uploadresume')}>
                                        <i className="fa fa-file-pdf-o menu-icon"></i> &nbsp; Upload Resume
                                    </li>
                                    <li className="menu-item" onClick={()=>navigate('/student/template')}>
                                        <i className="fa fa-share menu-icon"></i> &nbsp; View Final Template
                                    </li>
                                   
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
