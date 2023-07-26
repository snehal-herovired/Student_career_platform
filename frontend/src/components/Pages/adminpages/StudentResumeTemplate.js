import React from 'react'
import '../../templates/css/template.css'
import { useParams, useNavigate } from "react-router-dom"
import useGetRequest from '../../customeHooks/timerFetchData';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Url } from '../../../connection';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export default function StudentResumeTemplate() {
    const navigate = useNavigate()
    const { id } = useParams();
    const { data: resumeData, isLoading, isSuccess, isError, refetch } = useGetRequest(`${Url}/resume/${id}`)
    const { data: gitdata, isSuccess: gitSuccess } = useQuery(["gitdata"], async function () {
        const response = await axios.get(`${Url}/gitdata/${id}`);
        return response.data;
    })
    console.log(id, resumeData, gitdata, 'FORM TEMPLATE');
    // const isObjectIdEmpty = Object.keys(data).length === 0;
    //     console.log(isObjectIdEmpty,"isobjectempty");
    // Inside the StudentResumeTemplate component...
    const handleDownloadPDF = () => {
        const resumeSection = document.getElementById('resume-section');

        html2canvas(resumeSection).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const pdfWidth = 210; // A4 width in mm
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('resume.pdf');
        });
    };

    if (isLoading) {
        return <div>Loading data...</div>
    }
    function handlestate() {
        refetch();
        navigate('/admin')
    }
    if (isError) {
        return (
            <div>
                Error Loading data or the data is not available ...
                <button type='button' className='btn btn-danger' onClick={handlestate} style={{ cursor: 'pointer' }}>
                    Retry
                </button>
            </div>
        );
    }
    if (isSuccess && resumeData && gitdata && resumeData.studentId) {
        return (
            <>

                {
                    <div class="page-content" id="resume-section">
                        <div>
                            <div class="profile-page" >
                                <div class="wrapper">
                                    <div class="page-header page-header-small" filter-color="green">
                                        <div class="page-header-image" data-parallax="true" >
                                        </div>
                                        <div class="container" style={{ width: '1200px' }}>
                                            <div class="content-center" >
                                                <div class="cc-profile-image" ><a href="#"><img crossOrigin="anonymous" src={gitSuccess ? `${gitdata?.userData?.avatar}` : `${Url}/${resumeData?.image}`} alt="Image" style={{ boxShadow: " 0px 7px 12px -3px #6b050b" }} /></a></div>
                                                <div class="h4 " style={{ marginLeft: '', marginTop: "10px" }}>{resumeData?.studentId?.username.toUpperCase()}  </div>

                                                <p class="category" style={{ color: 'black' }}></p>
                                                {/* <a
                                                    className="btn btn-danger"
                                                    href="#"
                                                    style={{ marginLeft: "3px", marginRight: "3px" }}
                                                    onClick={handleDownloadPDF}
                                                >
                                                    Download CV
                                                </a> */}



                                                <a
                                                    class="btn btn-default btn-round btn-lg btn-icon" href={resumeData?.contactInformation?.github} target='_blank' rel="tooltip"
                                                    title="Visit me on Github"><i class="fa fa-github"></i></a>
                                                <a
                                                    class="btn btn-default btn-round btn-lg btn-icon" href={resumeData?.contactInformation?.linkedIn} target='_blank' rel="tooltip"
                                                    title="Follow me on LinkedIn"><i class="fa fa-linkedin"></i></a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="section" id="about">
                                <div class="container" >
                                    <div class="card" style={{ boxShadow: " 0px 7px 12px -3px #6b050b" }}>
                                        <div class="row">
                                            <div class="col-lg-6 col-md-12">
                                                <div class="card-body">
                                                    <div class="h4 mt-0 title">About</div>
                                                    {/* <p>Hello! I am {resumeData.studentId.username.toUpperCase()}.</p> */}
                                                    <p>{resumeData?.about} </p>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-12">
                                                <div class="card-body">
                                                    <div class="h4 mt-0 title">Basic Information</div>

                                                    <div class="row mt-3">
                                                        <div class="col-sm-4"><strong class="text-uppercase">Email:</strong></div>
                                                        <div class="col-sm-8">{resumeData?.studentId?.email}</div>
                                                    </div>
                                                    <div class="row mt-3">
                                                        <div class="col-sm-4"><strong class="text-uppercase">Phone:</strong></div>
                                                        <div class="col-sm-8">{resumeData?.contactInformation?.phone}</div>
                                                    </div>
                                                    <div class="row mt-3">
                                                        <div class="col-sm-4"><strong class="text-uppercase">Address:</strong></div>
                                                        <div class="col-sm-8">{resumeData?.contactInformation?.address}</div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="section" id="skill">
                                <div class="container">
                                    <div class="h4 text-center mb-4 title">Technical Skills</div>
                                    <div class="card" style={{ boxShadow: " 0px 7px 12px -3px #6b050b" }}>
                                        {
                                            gitSuccess && (
                                                <div class="card-body">
                                                    <div class="row">
                                                        {Object.entries(gitdata.averageLanguagesPercentage).map(([key, value], index) => (
                                                            <div class="col-md-6" key={key}>
                                                                <div class="progress-container">
                                                                    <span class="progress-label">{key}</span>
                                                                    <div class="custom-progress-bar">
                                                                        <div
                                                                            class="progress-fill"
                                                                            style={{ width: `${value}%`, backgroundColor: '#6b050b' }}
                                                                        ></div>
                                                                    </div>
                                                                    <span class="progress-value">{value}%</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        }


                                    </div >
                                </div >
                            </div >
                            <div class="education-section" style={{ marginTop: '50px' }}>
                                <div class="container">
                                    <div class="education-heading text-center mb-4">
                                        <h4 class="title" >Education</h4>
                                    </div>
                                    <div class="card animate" style={{ boxShadow: " 0px 7px 12px -3px #6b050b" }}>
                                        {
                                            resumeData?.education?.map((edu, i) => (
                                                <div class="row" key={i}>
                                                    <div class="col-md-3 " style={{ display: 'flex', alignItems: 'center', backgroundColor: '#6b050b' }}>
                                                        <div class="card-body cc-education-header" >

                                                            <h5>{edu.degree}</h5>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-9">
                                                        <div class="card-body">
                                                            <h5>{edu.degree}</h5>
                                                            <p class="category">Institution: {edu.institution}</p>
                                                            <p>Passing Year: {edu.year} years</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>

                                </div>
                            </div>
                            <div class="experience-section">
                                <div class="container">
                                    <div class="experience-heading text-center mb-4">
                                        <h4 class="title">Work Experience</h4>
                                    </div>
                                    {
                                        resumeData?.experience?.map((exp) => (
                                            <div class="card" style={{ boxShadow: " 0px 7px 12px -3px #6b050b" }}>
                                                <div class="row">
                                                    <div class="col-md-3 " style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#6b050b' }}>
                                                        <div class="card-body experience-header" >
                                                            <h5>{exp.company}</h5>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-9">
                                                        <div class="card-body">
                                                            <h5>{exp.position}</h5>
                                                            <p>Duration : {exp.duration} years</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                            <div class="portfolio-section" style={{ marginBottom: "50px" }}>
                                <div class="container">

                                    <div class="tab-content gallery mt-5">
                                        <h2 class="title">Portfolio</h2>
                                        <div class="tab-pane active" id="web-development">
                                            <div class="ml-auto mr-auto">
                                                <div class="row">
                                                    {
                                                        resumeData?.projects?.map((project) => (
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





                            {/* <section id="testimonials" class="testimonials">
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
                            </section> */}



                            {/* <div class="section" id="contact">
                                <div class="cc-contact-information" style={{ backgroundImage: "url('/images/staticmap.png')" }}>
                                    <div class="container">
                                        <div class="cc-contact">
                                            <div class="row">
                                                <div class="col-md-9">
                                                    <div class="card mb-0">
                                                        <div class="h4 text-center title">Contact Me</div>
                                                        <div class="row">
                                                            <div class="col-md-12">
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

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div > */}

                        </div >
                    </div >

                }
                {/* <footer class="footer">

                    <div class="text-center text-muted">
                        <p>&copy; Creative CV. All rights reserved.</p>

                    </div>
                </footer> */}
            </>
        )
    }
}
