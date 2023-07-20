import React from 'react'
import './css/template.css'
import { useParams } from "react-router-dom"
import useGetRequest from '../customeHooks/fetchData';
import { Url } from '../../connection';
export default function Template() {
    const { id } = useParams();
    const studentId = localStorage.getItem('studentId')
    const { data, isLoading, isSuccess, isError, refetch } = useGetRequest(`${Url}/resume/${studentId}`)
    console.log(id, data, 'FORM TEMPLATE');
    

    if (isLoading) {
        return <div>Loading data...</div>
    }
    return (
        <>

            {
                isSuccess
                    ?
                    <div class="page-content">
                        <div>
                            <div class="profile-page" >
                                <div class="wrapper">
                                    <div class="page-header page-header-small" filter-color="green">
                                        <div class="page-header-image" data-parallax="true" >
                                        </div>
                                        <div class="container" style={{ width: '1200px' }}>
                                            <div class="content-center" >
                                                <div class="cc-profile-image" ><a href="#"><img crossOrigin="anonymous" src={`${Url}/${data.image}`} alt="Image" style={{boxShadow:" 0px 7px 12px -3px #6b050b"}}/></a></div>
                                                <div class="h4 " style={{ marginLeft: '30px' ,marginTop:"10px"}}>{data.studentId.username.toUpperCase()}  </div>

                                                <p class="category" style={{ color: 'black' }}></p><a
                                                    class="btn btn-danger smooth-scroll mr-2" href="#contact">Hire Me</a>
                                                <a
                                                    class="btn btn-danger" href="#" style={{ marginLeft: "3px", marginRight: "3px" }}>Download CV</a>

                                                <a class="btn btn-default btn-round btn-lg btn-icon" href={data.contactInformation.facebook}
                                                    rel="tooltip" title="Follow me on Facebook"><i class="fa fa-facebook"></i></a>
                                                <a
                                                    class="btn btn-default btn-round btn-lg btn-icon" href={data.contactInformation.twitter} rel="tooltip"
                                                    title="Follow me on Twitter"><i class="fa fa-twitter"></i></a>
                                                <a
                                                    class="btn btn-default btn-round btn-lg btn-icon" href={data.contactInformation.github} rel="tooltip"
                                                    title="Follow me on Google+"><i class="fa fa-github"></i></a>
                                                <a
                                                    class="btn btn-default btn-round btn-lg btn-icon" href={data.contactInformation.linkedIn} rel="tooltip"
                                                    title="Follow me on Instagram"><i class="fa fa-linkedin"></i></a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="section" id="about">
                                <div class="container" >
                                    <div class="card" style={{boxShadow:" 0px 7px 12px -3px #6b050b"}}>
                                        <div class="row">
                                            <div class="col-lg-6 col-md-12">
                                                <div class="card-body">
                                                    <div class="h4 mt-0 title">About</div>
                                                    <p>Hello! I am {data.studentId.username.toUpperCase()}.I am a Web Developer, Graphic Designer and Photographer.</p>
                                                    <p>{data.about} </p>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-12">
                                                <div class="card-body">
                                                    <div class="h4 mt-0 title">Basic Information</div>

                                                    <div class="row mt-3">
                                                        <div class="col-sm-4"><strong class="text-uppercase">Email:</strong></div>
                                                        <div class="col-sm-8">{data.studentId.email}</div>
                                                    </div>
                                                    <div class="row mt-3">
                                                        <div class="col-sm-4"><strong class="text-uppercase">Phone:</strong></div>
                                                        <div class="col-sm-8">{data.contactInformation.phone}</div>
                                                    </div>
                                                    <div class="row mt-3">
                                                        <div class="col-sm-4"><strong class="text-uppercase">Address:</strong></div>
                                                        <div class="col-sm-8">{data.contactInformation.address}</div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="section" id="skill">
                                <div class="container">
                                    <div class="h4 text-center mb-4 title">Professional Skills</div>
                                    <div class="card" style={{boxShadow:" 0px 7px 12px -3px #6b050b"}}>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="progress-container progress-primary"><span class="progress-badge">HTML</span>
                                                        <div class="progress">
                                                            <div class="progress-bar progress-bar-primary"
                                                                role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }}>
                                                            </div><span class="progress-value">80%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="progress-container progress-primary"><span class="progress-badge">CSS</span>
                                                        <div class="progress">
                                                            <div class="progress-bar progress-bar-primary"
                                                                role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "75%" }}>
                                                            </div><span class="progress-value">75%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="progress-container progress-primary"><span class="progress-badge">JavaScript</span>
                                                        <div class="progress">
                                                            <div class="progress-bar progress-bar-primary"
                                                                role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "60%" }}>
                                                            </div><span class="progress-value">60%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="progress-container progress-primary"><span class="progress-badge">SASS</span>
                                                        <div class="progress">
                                                            <div class="progress-bar progress-bar-primary"
                                                                role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "60%" }}>
                                                            </div><span class="progress-value">60%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="progress-container progress-primary"><span class="progress-badge">Bootstrap</span>
                                                        <div class="progress">
                                                            <div class="progress-bar progress-bar-primary"
                                                                role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "75%" }}>
                                                            </div><span class="progress-value">75%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="progress-container progress-primary"><span class="progress-badge">Photoshop</span>
                                                        <div class="progress">
                                                            <div class="progress-bar progress-bar-primary"
                                                                role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "70%" }}>
                                                            </div><span class="progress-value">70%</span>
                                                        </div>
                                                    </div>
                                                </div >
                                            </div >
                                        </div >
                                    </div >
                                </div >
                            </div >
                            <div class="portfolio-section" style={{ marginBottom: "50px" }}>
                                <div class="container">

                                    <div class="tab-content gallery mt-5">
                                        <h2 class="title">Portfolio</h2>
                                        <div class="tab-pane active" id="web-development">
                                            <div class="ml-auto mr-auto">
                                                <div class="row">
                                                    {
                                                        data?.projects.map((project) => (
                                                            <div class="col-md-6">
                                                                <div class="portfolio-item">
                                                                    <a href={project.link} target='_blank' >
                                                                        <figure class="effect">
                                                                            <img src="/images/project-1.jpg" alt="Image" />
                                                                            <figcaption>
                                                                                <h4 class="title">{project.title}</h4>
                                                                                <p>{project.description}</p>
                                                                                
                                                                            </figcaption>
                                                                        </figure>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            
                                                        ))
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="experience-section">
                                <div class="container">
                                    <div class="experience-heading text-center mb-4">
                                        <h4 class="title">Work Experience</h4>
                                    </div>
                                    {
                                        data?.experience.map((exp) => (
                                            <div class="card" style={{boxShadow:" 0px 7px 12px -3px #6b050b"}}>
                                            <div class="row">
                                                <div class="col-md-3 " style={{ display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#6b050b'}}>
                                                        <div class="card-body experience-header" >
                                                            <h5>{exp.company }</h5>
                                                    </div>
                                                </div>
                                                <div class="col-md-9">
                                                    <div class="card-body">
                                                            <h5>{ exp.position}</h5>
                                                            <p>Duration : { exp.duration} years</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        ))
                                   }
                                   
                                </div>
                            </div>

                            <div class="education-section"style={{marginTop:'50px'}}>
                                <div class="container">
                                    <div class="education-heading text-center mb-4">
                                        <h4 class="title" >Education</h4>
                                    </div>
                                    <div class="card animate" style={{boxShadow:" 0px 7px 12px -3px #6b050b"}}>
                                        {
                                            data?.education.map((edu,i) => (
                                                <div class="row" key={i}>
                                                <div class="col-md-3 " style={{display:'flex',alignItems:'center',backgroundColor:'#6b050b'}}>
                                                    <div class="card-body cc-education-header" >
                                                   
                                                            <h5>{edu.degree}</h5>
                                                    </div>
                                                </div>
                                                <div class="col-md-9">
                                                    <div class="card-body">
                                                            <h5>{edu.degree}</h5>
                                                            <p class="category">Institution : { edu.institution}</p>
                                                            <p>Duration :{ edu.year} years</p>
                                                    </div>
                                                </div>
                                            </div>
                                            ))
                                       }
                                    </div>
                                   
                                </div>
                            </div>

                            <section id="testimonials" class="testimonials">
                                <div class="container" data-aos="fade-up">
                                    <div class="section-title">
                                        <h2>Testimonials</h2>
                                    </div>

                                    <div class="testimonials-slider" data-aos="fade-up" data-aos-delay="100">
                                        <div id="testimonialsCarousel" class="carousel slide" data-bs-ride="carousel">
                                            <div class="carousel-inner">
                                                <div class="carousel-item active">
                                                    <div class="testimonial-item text-center">
                                                        <img src="/images/hero.jpg" alt="" class="testimonial-img" />
                                                        <h3>Saul Goodman</h3>
                                                        <h4>Ceo &amp; Founder</h4>
                                                        <p>
                                                            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                                            Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.
                                                            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                                                        </p>
                                                    </div>
                                                </div>


                                                <div class="carousel-item">
                                                    <div class="testimonial-item text-center">
                                                        <img src="/images/hero.jpg" alt="" class="testimonial-img" />
                                                        <h3>Sara Wilsson</h3>
                                                        <h4>Designer</h4>
                                                        <p>
                                                            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                                            Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.
                                                            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div class="carousel-item">
                                                    <div class="testimonial-item text-center">
                                                        <img src="/images/hero.jpg" alt="" class="testimonial-img" />
                                                        <h3>Jena Karlis</h3>
                                                        <h4>Store Owner</h4>
                                                        <p>
                                                            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                                            Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.
                                                            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div class="carousel-item">
                                                    <div class="testimonial-item text-center">
                                                        <img src="/images/hero.jpg" alt="img" class="testimonial-img" />
                                                        <h3>Matt Brandon</h3>
                                                        <h4>Freelancer</h4>
                                                        <p>
                                                            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                                            Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.
                                                            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div class="carousel-item">
                                                    <div class="testimonial-item text-center">
                                                        <img src="/images/hero.jpg" alt="img_here" class="testimonial-img" />
                                                        <h3>John Larson</h3>
                                                        <h4>Entrepreneur</h4>
                                                        <p>
                                                            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                                            Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.
                                                            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <button class="carousel-control-prev" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Previous</span>
                                            </button>
                                            <button class="carousel-control-next" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </section>



                            <div class="section" id="contact">
                                <div class="cc-contact-information" style={{ backgroundImage: "url('/images/staticmap.png')" }}>
                                    <div class="container">
                                        <div class="cc-contact">
                                            <div class="row">
                                                <div class="col-md-9">
                                                    <div class="card mb-0">
                                                        <div class="h4 text-center title">Contact Me</div>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="card-body">
                                                                    <form action="https://formspree.io/your@email.com" method="POST">
                                                                        <div class="p pb-3"><strong>Feel free to contact me </strong></div>
                                                                        <div class="row mb-3">
                                                                            <div class="col">
                                                                                <div class="input-group"><span class="input-group-addon"><i
                                                                                    class="fa fa-user-circle"></i></span>
                                                                                    <input class="form-control" type="text" name="name" placeholder="Name"
                                                                                        required="required" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row mb-3">
                                                                            <div class="col">
                                                                                <div class="input-group"><span class="input-group-addon"><i
                                                                                    class="fa fa-file-text"></i></span>
                                                                                    <input class="form-control" type="text" name="Subject" placeholder="Subject"
                                                                                        required="required" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row mb-3">
                                                                            <div class="col">
                                                                                <div class="input-group"><span class="input-group-addon"><i
                                                                                    class="fa fa-envelope"></i></span>
                                                                                    <input class="form-control" type="email" name="_replyto" placeholder="E-mail"
                                                                                        required="required" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row mb-3">
                                                                            <div class="col">
                                                                                <div class="form-group">
                                                                                    <textarea class="form-control" name="message" placeholder="Your Message"
                                                                                        required="required"></textarea>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col">
                                                                                <button class="btn btn-primary" type="submit">Send</button>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="card-body">
                                                                    <p class="mb-0"><strong>Address </strong></p>
                                                                    <p class="pb-2">140, City Center, New York, U.S.A</p>
                                                                    <p class="mb-0"><strong>Phone</strong></p>
                                                                    <p class="pb-2">+1718-111-0011</p>
                                                                    <p class="mb-0"><strong>Email</strong></p>
                                                                    <p>anthony@company.com</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </div >
                    </div >
                    :
                    <div class="page-content">
                        <div>
                            <div class="profile-page" >
                                <div class="wrapper">
                                    <div class="page-header page-header-small" filter-color="green">
                                        <div class="page-header-image" data-parallax="true" style={{ backgroundImage: "url('images/cc-bg-1.jpg')" }}>
                                        </div>
                                        <div class="container" style={{ width: '1200px' }}>
                                            <div class="content-center" >
                                                <div class="cc-profile-image"><a href="#"><img src="/images/anthony.jpg" alt="Image" /></a></div>
                                                <div class="h4 " >Anthony Barnett</div>
                                                <p class="category" style={{ color: 'black' }}>Web Developer, Graphic Designer, Photographer</p><a
                                                    class="btn btn-design smooth-scroll mr-2" href="#contact">Hire Me</a>
                                                <a
                                                    class="btn btn-design" href="#" style={{ marginLeft: "3px", marginRight: "3px" }}>Download CV</a>

                                                <a class="btn btn-default btn-round btn-lg btn-icon" href="#"
                                                    rel="tooltip" title="Follow me on Facebook"><i class="fa fa-facebook"></i></a>
                                                <a
                                                    class="btn btn-default btn-round btn-lg btn-icon" href="#" rel="tooltip"
                                                    title="Follow me on Twitter"><i class="fa fa-twitter"></i></a>
                                                <a
                                                    class="btn btn-default btn-round btn-lg btn-icon" href="#" rel="tooltip"
                                                    title="Follow me on Google+"><i class="fa fa-google-plus"></i></a>
                                                <a
                                                    class="btn btn-default btn-round btn-lg btn-icon" href="#" rel="tooltip"
                                                    title="Follow me on Instagram"><i class="fa fa-instagram"></i></a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="section" id="about">
                                <div class="container">
                                    <div class="card">
                                        <div class="row">
                                            <div class="col-lg-6 col-md-12">
                                                <div class="card-body">
                                                    <div class="h4 mt-0 title">About</div>
                                                    <p>Hello! I am Anthony Barnett. Web Developer, Graphic Designer and Photographer.</p>
                                                    <p>Creative CV is a HTML resume template for professionals. Built with Bootstrap 4, Now UI Kit and
                                                        FontAwesome, this modern and responsive design template is perfect to showcase your portfolio,
                                                        skills and experience. <a href="https://templateflip.com/templates/creative-cv/"
                                                            target="_blank">Learn More</a></p>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-12">
                                                <div class="card-body">
                                                    <div class="h4 mt-0 title">Basic Information</div>
                                                    <div class="row">
                                                        <div class="col-sm-4"><strong class="text-uppercase">Age:</strong></div>
                                                        <div class="col-sm-8">24</div>
                                                    </div>
                                                    <div class="row mt-3">
                                                        <div class="col-sm-4"><strong class="text-uppercase">Email:</strong></div>
                                                        <div class="col-sm-8">anthony@company.com</div>
                                                    </div>
                                                    <div class="row mt-3">
                                                        <div class="col-sm-4"><strong class="text-uppercase">Phone:</strong></div>
                                                        <div class="col-sm-8">+1718-111-0011</div>
                                                    </div>
                                                    <div class="row mt-3">
                                                        <div class="col-sm-4"><strong class="text-uppercase">Address:</strong></div>
                                                        <div class="col-sm-8">140, City Center, New York, U.S.A</div>
                                                    </div>
                                                    <div class="row mt-3">
                                                        <div class="col-sm-4"><strong class="text-uppercase">Language:</strong></div>
                                                        <div class="col-sm-8">English, German, French</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="section" id="skill">
                                <div class="container">
                                    <div class="h4 text-center mb-4 title">Professional Skills</div>
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="progress-container progress-primary"><span class="progress-badge">HTML</span>
                                                        <div class="progress">
                                                            <div class="progress-bar progress-bar-primary"
                                                                role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "80%" }}>
                                                            </div><span class="progress-value">80%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="progress-container progress-primary"><span class="progress-badge">CSS</span>
                                                        <div class="progress">
                                                            <div class="progress-bar progress-bar-primary"
                                                                role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "75%" }}>
                                                            </div><span class="progress-value">75%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="progress-container progress-primary"><span class="progress-badge">JavaScript</span>
                                                        <div class="progress">
                                                            <div class="progress-bar progress-bar-primary"
                                                                role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "60%" }}>
                                                            </div><span class="progress-value">60%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="progress-container progress-primary"><span class="progress-badge">SASS</span>
                                                        <div class="progress">
                                                            <div class="progress-bar progress-bar-primary"
                                                                role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "60%" }}>
                                                            </div><span class="progress-value">60%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="progress-container progress-primary"><span class="progress-badge">Bootstrap</span>
                                                        <div class="progress">
                                                            <div class="progress-bar progress-bar-primary"
                                                                role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "75%" }}>
                                                            </div><span class="progress-value">75%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="progress-container progress-primary"><span class="progress-badge">Photoshop</span>
                                                        <div class="progress">
                                                            <div class="progress-bar progress-bar-primary"
                                                                role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "70%" }}>
                                                            </div><span class="progress-value">70%</span>
                                                        </div>
                                                    </div>
                                                </div >
                                            </div >
                                        </div >
                                    </div >
                                </div >
                            </div >
                            <div class="portfolio-section" style={{ marginBottom: "50px" }}>
                                <div class="container">

                                    <div class="tab-content gallery mt-5">
                                        <h2 class="title">Portfolio</h2>
                                        <div class="tab-pane active" id="web-development">
                                            <div class="ml-auto mr-auto">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="portfolio-item">
                                                            <a href="#web-development">
                                                                <figure class="effect">
                                                                    <img src="/images/project-1.jpg" alt="Image" />
                                                                    <figcaption>
                                                                        <h4 class="title">Recent Project</h4>
                                                                        <p>Web Development</p>
                                                                    </figcaption>
                                                                </figure>
                                                            </a>
                                                        </div>
                                                        <div class="portfolio-item">
                                                            <a href="#web-development">
                                                                <figure class="effect">
                                                                    <img src="/images/project-2.jpg" alt="Image" />
                                                                    <figcaption>
                                                                        <h4 class="title">Startup Project</h4>
                                                                        <p>Web Development</p>
                                                                    </figcaption>
                                                                </figure>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="portfolio-item">
                                                            <a href="#web-development">
                                                                <figure class="effect">
                                                                    <img src="/images/project-3.jpg" alt="Image" />
                                                                    <figcaption>
                                                                        <h4 class="title">Food Order Project</h4>
                                                                        <p>Web Development</p>
                                                                    </figcaption>
                                                                </figure>
                                                            </a>
                                                        </div>
                                                        <div class="portfolio-item">
                                                            <a href="#web-development">
                                                                <figure class="effect">
                                                                    <img src="/images/project-4.jpg" alt="Image" />
                                                                    <figcaption>
                                                                        <h4 class="title">Web Advertising Project</h4>
                                                                        <p>Web Development</p>
                                                                    </figcaption>
                                                                </figure>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="experience-section">
                                <div class="container">
                                    <div class="experience-heading text-center mb-4">
                                        <h4 class="title">Work Experience</h4>
                                    </div>
                                    <div class="card">
                                        <div class="row">
                                            <div class="col-md-3 bg-primary">
                                                <div class="card-body experience-header">
                                                    <p>March 2016 - Present</p>
                                                    <h5>CreativeM</h5>
                                                </div>
                                            </div>
                                            <div class="col-md-9">
                                                <div class="card-body">
                                                    <h5>Front End Developer</h5>
                                                    <p>Euismod massa scelerisque suspendisse fermentum habitant vitae ullamcorper magna quam iaculis, tristique sapien taciti mollis interdum sagittis libero nunc inceptos tellus, hendrerit vel eleifend primis lectus quisque cubilia sed mauris. Lacinia porta vestibulum diam integer quisque eros pulvinar curae, curabitur feugiat arcu vivamus parturient aliquet laoreet at, eu etiam pretium molestie ultricies sollicitudin dui.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="row">
                                            <div class="col-md-3 bg-primary">
                                                <div class="card-body experience-header">
                                                    <p>April 2014 - March 2016</p>
                                                    <h5>WebNote</h5>
                                                </div>
                                            </div>
                                            <div class="col-md-9">
                                                <div class="card-body">
                                                    <h5>Web Developer</h5>
                                                    <p>Euismod massa scelerisque suspendisse fermentum habitant vitae ullamcorper magna quam iaculis, tristique sapien taciti mollis interdum sagittis libero nunc inceptos tellus, hendrerit vel eleifend primis lectus quisque cubilia sed mauris. Lacinia porta vestibulum diam integer quisque eros pulvinar curae, curabitur feugiat arcu vivamus parturient aliquet laoreet at, eu etiam pretium molestie ultricies sollicitudin dui.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="row">
                                            <div class="col-md-3 bg-primary">
                                                <div class="card-body experience-header">
                                                    <p>April 2013 - February 2014</p>
                                                    <h5>WEBM</h5>
                                                </div>
                                            </div>
                                            <div class="col-md-9">
                                                <div class="card-body">
                                                    <h5>Intern</h5>
                                                    <p>Euismod massa scelerisque suspendisse fermentum habitant vitae ullamcorper magna quam iaculis, tristique sapien taciti mollis interdum sagittis libero nunc inceptos tellus, hendrerit vel eleifend primis lectus quisque cubilia sed mauris. Lacinia porta vestibulum diam integer quisque eros pulvinar curae, curabitur feugiat arcu vivamus parturient aliquet laoreet at, eu etiam pretium molestie ultricies sollicitudin dui.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="education-section">
                                <div class="container">
                                    <div class="education-heading text-center mb-4">
                                        <h4 class="title">Education</h4>
                                    </div>
                                    <div class="card animate">
                                        <div class="row">
                                            <div class="col-md-3 bg-primary">
                                                <div class="card-body cc-education-header">
                                                    <p>2013 - 2015</p>
                                                    <h5>Master's Degree</h5>
                                                </div>
                                            </div>
                                            <div class="col-md-9">
                                                <div class="card-body">
                                                    <h5>Master of Information Technology</h5>
                                                    <p class="category">University of Computer Science</p>
                                                    <p>Euismod massa scelerisque suspendisse fermentum habitant vitae ullamcorper magna quam iaculis, tristique sapien taciti mollis interdum sagittis libero nunc inceptos tellus, hendrerit vel eleifend primis lectus quisque cubilia sed mauris. Lacinia porta vestibulum diam integer quisque eros pulvinar curae, curabitur feugiat arcu vivamus parturient aliquet laoreet at, eu etiam pretium molestie ultricies sollicitudin dui.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card animate">
                                        <div class="row">
                                            <div class="col-md-3 bg-primary">
                                                <div class="card-body cc-education-header">
                                                    <p>2009 - 2013</p>
                                                    <h5>Bachelor's Degree</h5>
                                                </div>
                                            </div>
                                            <div class="col-md-9">
                                                <div class="card-body">
                                                    <h5>Bachelor of Computer Science</h5>
                                                    <p class="category">University of Computer Science</p>
                                                    <p>Euismod massa scelerisque suspendisse fermentum habitant vitae ullamcorper magna quam iaculis, tristique sapien taciti mollis interdum sagittis libero nunc inceptos tellus, hendrerit vel eleifend primis lectus quisque cubilia sed mauris. Lacinia porta vestibulum diam integer quisque eros pulvinar curae, curabitur feugiat arcu vivamus parturient aliquet laoreet at, eu etiam pretium molestie ultricies sollicitudin dui.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card animate">
                                        <div class="row">
                                            <div class="col-md-3 bg-primary">
                                                <div class="card-body cc-education-header">
                                                    <p>2007 - 2009</p>
                                                    <h5>High School</h5>
                                                </div>
                                            </div>
                                            <div class="col-md-9">
                                                <div class="card-body">
                                                    <h5>Science and Mathematics</h5>
                                                    <p class="category">School of Secondary board</p>
                                                    <p>Euismod massa scelerisque suspendisse fermentum habitant vitae ullamcorper magna quam iaculis, tristique sapien taciti mollis interdum sagittis libero nunc inceptos tellus, hendrerit vel eleifend primis lectus quisque cubilia sed mauris. Lacinia porta vestibulum diam integer quisque eros pulvinar curae, curabitur feugiat arcu vivamus parturient aliquet laoreet at, eu etiam pretium molestie ultricies sollicitudin dui.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <section id="testimonials" class="testimonials">
                                <div class="container" data-aos="fade-up">
                                    <div class="section-title">
                                        <h2>Testimonials</h2>
                                    </div>

                                    <div class="testimonials-slider" data-aos="fade-up" data-aos-delay="100">
                                        <div id="testimonialsCarousel" class="carousel slide" data-bs-ride="carousel">
                                            <div class="carousel-inner">
                                                <div class="carousel-item active">
                                                    <div class="testimonial-item text-center">
                                                        <img src="/images/hero.jpg" alt="" class="testimonial-img" />
                                                        <h3>Saul Goodman</h3>
                                                        <h4>Ceo &amp; Founder</h4>
                                                        <p>
                                                            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                                            Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.
                                                            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                                                        </p>
                                                    </div>
                                                </div>


                                                <div class="carousel-item">
                                                    <div class="testimonial-item text-center">
                                                        <img src="/images/hero.jpg" alt="" class="testimonial-img" />
                                                        <h3>Sara Wilsson</h3>
                                                        <h4>Designer</h4>
                                                        <p>
                                                            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                                            Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.
                                                            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div class="carousel-item">
                                                    <div class="testimonial-item text-center">
                                                        <img src="/images/hero.jpg" alt="" class="testimonial-img" />
                                                        <h3>Jena Karlis</h3>
                                                        <h4>Store Owner</h4>
                                                        <p>
                                                            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                                            Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.
                                                            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div class="carousel-item">
                                                    <div class="testimonial-item text-center">
                                                        <img src="/images/hero.jpg" alt="img" class="testimonial-img" />
                                                        <h3>Matt Brandon</h3>
                                                        <h4>Freelancer</h4>
                                                        <p>
                                                            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                                            Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.
                                                            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div class="carousel-item">
                                                    <div class="testimonial-item text-center">
                                                        <img src="/images/hero.jpg" alt="img_here" class="testimonial-img" />
                                                        <h3>John Larson</h3>
                                                        <h4>Entrepreneur</h4>
                                                        <p>
                                                            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                                                            Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.
                                                            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <button class="carousel-control-prev" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Previous</span>
                                            </button>
                                            <button class="carousel-control-next" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </section>



                            <div class="section" id="contact">
                                <div class="cc-contact-information" style={{ backgroundImage: "url('/images/staticmap.png')" }}>
                                    <div class="container">
                                        <div class="cc-contact">
                                            <div class="row">
                                                <div class="col-md-9">
                                                    <div class="card mb-0">
                                                        <div class="h4 text-center title">Contact Me</div>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="card-body">
                                                                    <form action="https://formspree.io/your@email.com" method="POST">
                                                                        <div class="p pb-3"><strong>Feel free to contact me </strong></div>
                                                                        <div class="row mb-3">
                                                                            <div class="col">
                                                                                <div class="input-group"><span class="input-group-addon"><i
                                                                                    class="fa fa-user-circle"></i></span>
                                                                                    <input class="form-control" type="text" name="name" placeholder="Name"
                                                                                        required="required" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row mb-3">
                                                                            <div class="col">
                                                                                <div class="input-group"><span class="input-group-addon"><i
                                                                                    class="fa fa-file-text"></i></span>
                                                                                    <input class="form-control" type="text" name="Subject" placeholder="Subject"
                                                                                        required="required" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row mb-3">
                                                                            <div class="col">
                                                                                <div class="input-group"><span class="input-group-addon"><i
                                                                                    class="fa fa-envelope"></i></span>
                                                                                    <input class="form-control" type="email" name="_replyto" placeholder="E-mail"
                                                                                        required="required" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row mb-3">
                                                                            <div class="col">
                                                                                <div class="form-group">
                                                                                    <textarea class="form-control" name="message" placeholder="Your Message"
                                                                                        required="required"></textarea>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col">
                                                                                <button class="btn btn-primary" type="submit">Send</button>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="card-body">
                                                                    <p class="mb-0"><strong>Address </strong></p>
                                                                    <p class="pb-2">140, City Center, New York, U.S.A</p>
                                                                    <p class="mb-0"><strong>Phone</strong></p>
                                                                    <p class="pb-2">+1718-111-0011</p>
                                                                    <p class="mb-0"><strong>Email</strong></p>
                                                                    <p>anthony@company.com</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        </div >
                    </div >
            }
            <footer class="footer">

                <div class="text-center text-muted">
                    <p>&copy; Creative CV. All rights reserved.</p>

                </div>
            </footer>
        </>
    )
}
