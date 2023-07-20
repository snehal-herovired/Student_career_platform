import React from 'react'
import { Outlet, NavLink, useNavigate } from "react-router-dom"
import '../../styles/drawer.css'
export default function StudentLayout() {
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
        localStorage.removeItem("login");
        navigate('/login')
    }
    return (
        <div style={{ height: "100%", width: "100%" }}>
            {/* Header  */}
            <nav class="navbar sticky-top navbar-expand-lg  " style={headerstyle}>
                <div class="container-fluid">
                    <NavLink className="navbar-brand" to="/student/" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%',width:"20%", fontSize: '1.5rem' ,background:'#6b050b',borderRadius:"4px"}}>Scholar's Corner</NavLink>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <button class="btn " style={btnStyle} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                        <div style={{color:'#6b050b'}}><i class="fa fa-bars" ></i></div>

                    </button>

                    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div class="offcanvas-header drawer-header" style={{background:'white',color:'red'}}>
                            <h5 class="offcanvas-title" id="offcanvasExampleLabel" style={{fontWeight:"bolder"}}>Student Menu</h5>
                            <button type="button" class=" custom-btn-close" data-bs-dismiss="offcanvas" aria-label="Close"><i className='fa fa-share-square-o'></i></button>
                        </div>
                        <div class="offcanvas-body drawer-body" >
                            <div>
                                <ul class="menu-list">
                                    <li class="menu-item" onClick={()=>navigate('/student/resume')}>
                                        <i class="fa fa-edit menu-icon"></i> &nbsp; Create Resume
                                    </li>
                                    <li class="menu-item" onClick={()=>navigate('/student/home')}>
                                        <i class="fa fa-edit menu-icon"></i> &nbsp; View Editable Template
                                    </li>
                                    <li class="menu-item" onClick={()=>navigate('')}>
                                        <i class="fa fa-share menu-icon"></i> &nbsp; Projects
                                    </li>
                                    
                                    <li class="menu-item" onClick={()=>navigate('/student/uploadresume')}>
                                        <i class="fa fa-file-pdf-o menu-icon"></i> &nbsp; Upload Resume
                                    </li>
                                    <li class="menu-item" onClick={()=>navigate('/student/template')}>
                                        <i class="fa fa-share menu-icon"></i> &nbsp; View Final Template
                                    </li>
                                   
                                    <li class="menu-item" onClick={handleLogout}>
                                        <i class="fa fa-share menu-icon"></i> &nbsp; Logout
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
