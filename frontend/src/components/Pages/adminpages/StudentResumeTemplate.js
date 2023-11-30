import React, { useRef, useState } from 'react'
import '../../templates/css/template.css'
import { useParams, useNavigate } from "react-router-dom"
import useGetRequest from '../../customeHooks/timerFetchData';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { axiosInstance } from '../../../connection';
import { Url } from '../../../connection';
import { TwitterIcon, EmailIcon, FacebookIcon, LinkedinIcon } from 'react-share';
import { TwitterShareButton, EmailShareButton, FacebookShareButton, LinkedinShareButton } from 'react-share';
const LoadingOverlay = () => {
    return (
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};

export default function StudentResumeTemplate() {
    const navigate = useNavigate()
    const [pdfdownloadLoading, setPdfLoading] = useState(false);
    const [pdf, setPdfUrl] = useState('');
    const { id } = useParams();
    const { data: resumeData, isLoading, isSuccess, isError, refetch } = useQuery(["resumedata"], async function () {
        const response = await axiosInstance.get(`/resume/${id}`);
        return response.data;
    })
    const { data: gitdata, isSuccess: gitSuccess } = useQuery(["githubdata"], async function () {
        const response = await axiosInstance.get(`/gitdata/${id}`);
        return response.data;
    })
    // console.log(id, resumeData, gitdata, 'FORM TEMPLATE');



    const Share = async () => {
        try {
            setPdfLoading(true);
            const response = await axiosInstance.get(`/gitdata/generate-pdf/${id}`);
            const { pdfUrl } = response.data;
            // console.log(pdfUrl, "from response");
            setPdfLoading(false);
            setPdfUrl(pdfUrl);


        } catch (error) {
            console.error('Error fetching PDF link:', error);
        }
    }



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

    return (
        <>

            {
                isSuccess && resumeData && gitdata && resumeData.studentId && (
                    <div className="page-content" id="resume-section">
                        <div>
                            <div className="profile-page" >
                                <div className="wrapper">
                                    <div className="page-header page-header-small" filter-color="green">
                                        <div className="page-header-image" data-parallax="true" >
                                        </div>
                                        <div className="container" style={{ width: '1200px' }}>
                                            <div className="content-center" >
                                                <div className="cc-profile-image" ><a href="#"><img crossOrigin="anonymous" src={gitSuccess ? `${gitdata?.userData?.avatar}` : `${Url}/${resumeData?.image}`} alt="Image" style={{ boxShadow: " 0px 7px 12px -3px #6b050b" }} /></a></div>
                                                <div className="h4 " style={{ marginLeft: '', marginTop: "10px" }}>{resumeData?.studentId?.username.toUpperCase()}  </div>

                                                <p className="category" style={{ color: 'black' }}></p>

                                                {
                                                    pdfdownloadLoading && <div>Loading...</div>
                                                }

                                                {pdfdownloadLoading && <LoadingOverlay />}

                                                
                                                <a
                                                    className="btn btn-default btn-round btn-lg btn-icon" href={resumeData?.contactInformation?.linkedIn} target='_blank' rel="tooltip"
                                                    title="Follow me on LinkedIn"><i className="fa fa-linkedin"></i></a>

                                                {pdf ? (
                                                    <>


                                                        <a href={pdf} target="_blank" rel="noopener noreferrer" className='btn btn-danger' type='button'>Dowload PDF</a>

                                                        
                                                    </>
                                                ) : (
                                                    <button onClick={Share} className='btn btn-danger' type='button'>Generate PDF and Get Link</button>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="section" id="about">
                                <div className="container" >
                                    <div className="card" style={{ boxShadow: " 0px 7px 12px -3px #6b050b" }}>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-12">
                                                <div className="card-body">
                                                    <div className="h4 mt-0 title">About</div>
                                                    {/* <p>Hello! I am {resumeData.studentId.username.toUpperCase()}.</p> */}
                                                    <p>{resumeData?.about} </p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="card-body">
                                                    <div className="h4 mt-0 title">Basic Information</div>

                                                    <div className="row mt-3">
                                                        <div className="col-sm-4"><strong className="text-uppercase">Email:</strong></div>
                                                        <div className="col-sm-8">{resumeData?.studentId?.email}</div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-sm-4"><strong className="text-uppercase">Phone:</strong></div>
                                                        <div className="col-sm-8">{resumeData?.contactInformation?.phone}</div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-sm-4"><strong className="text-uppercase">Address:</strong></div>
                                                        <div className="col-sm-8">{resumeData?.contactInformation?.address}</div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="section" id="skill">
                                <div className="container">
                                    <div className="h4 text-center mb-4 title">Technical Skills</div>
                                    <div className="card" style={{ boxShadow: " 0px 7px 12px -3px #6b050b" }}>

                                        <div className="card-body">
                                            <div className="row">
                                                {resumeData?.skills.map((ele, index) => (
                                                    <div className="col-md-6" key={index}>
                                                        <div className="progress-container">
                                                            <span className="progress-label">{ele.name}</span>
                                                            <div className="custom-progress-bar">
                                                                <div


                                                                    className="progress-fill"
                                                                    style={{ width: `${ele.proficiency*10}%`, backgroundColor: '#6b050b' }}
                                                                ></div>
                                                            </div>
                                                            <span className="progress-value">{ele.proficiency*10}%</span>
                                                        </div>
                                                    </div>
                                                ))
                                                }
                                            </div>
                                        </div>


                                    </div >
                                </div >
                            </div >
                            <div className="education-section" style={{ marginTop: '50px' }}>
                                <div className="container">
                                    <div className="education-heading text-center mb-4">
                                        <h4 className="title" >Education</h4>
                                    </div>
                                    <div className="card animate" style={{ boxShadow: " 0px 7px 12px -3px #6b050b" }}>
                                        {
                                            resumeData?.education?.map((edu, i) => (
                                                <div className="row" key={i}>
                                                    <div className="col-md-3 " style={{ display: 'flex', alignItems: 'center', backgroundColor: '#6b050b' }}>
                                                        <div className="card-body cc-education-header" >

                                                            <h5>{edu.degree}</h5>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <div className="card-body">
                                                            <h5>{edu.degree}</h5>
                                                            <p className="category">Institution: {edu.institution}</p>
                                                            <p>Duration: {edu.year} </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>

                                </div>
                            </div>
                            <div className="experience-section">
                                <div className="container">
                                    <div className="experience-heading text-center mb-4">
                                        <h4 className="title">Work Experience</h4>
                                    </div>
                                    {
                                        resumeData?.experience?.map((exp,i) => (
                                            <div className="card" style={{ boxShadow: " 0px 7px 12px -3px #6b050b" }} key={i}>
                                                <div className="row">
                                                    <div className="col-md-3 " style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#6b050b' }}>
                                                        <div className="card-body experience-header" >
                                                            <h5>{exp.company}</h5>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <div className="card-body">
                                                            <h5>{exp.position}</h5>
                                                            <p>Duration: {exp.duration} </p>
                                                            <p>Description: {exp.description} </p>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                            <div className="portfolio-section" style={{ marginBottom: "50px" }}>
                                <div className="container">

                                    <div className="tab-content gallery mt-5">
                                        <h2 className="title">Portfolio</h2>
                                        <div className="tab-pane active" id="web-development">
                                            <div className="ml-auto mr-auto">
                                                <div className="row">
                                                    {
                                                        resumeData?.projects?.map((project,index) => (
                                                            <div className="col-md-6" key={index}>
                                                                <div className="portfolio-item">
                                                                    <a href={project.link} target='_blank' >
                                                                        <figure className="effect">
                                                                            <img src="/images/projects.jpg" alt="Image" />
                                                                            <figcaption>
                                                                                <h4 className="title">{project.title}</h4>
                                                                                <p>{project.description}</p>
                                                                                {
                                                                                    project?.technologies.map((skill, index) => (
                                                                                        <ul key={index} style={{ color: '#FAF3F0' }}>
                                                                                            <li>{skill}</li>
                                                                                        </ul>
                                                                                    ))
                                                                                }
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





                            {/* <section id="testimonials" className="testimonials">
                                <div className="container" data-aos="fade-up">
                                    <div className="section-title">
                                        <h2>Testimonials</h2>
                                    </div>

                                    <div className="testimonials-slider" data-aos="fade-up" data-aos-delay="100">
                                        <div id="testimonialsCarousel" className="carousel slide" data-bs-ride="carousel">
                                            <div className="carousel-inner">
                                                <div className="carousel-item active">
                                                    <div className="testimonial-item text-center">
                                                        <img src="/images/hero.jpg" alt="" className="testimonial-img" />
                                                        <h3>Saul Goodman</h3>
                                                        <h4>Ceo &amp; Founder</h4>
                                                        <p>
                                                            <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                                                            Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.
                                                            <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                                                        </p>
                                                    </div>
                                                </div>


                                                <div className="carousel-item">
                                                    <div className="testimonial-item text-center">
                                                        <img src="/images/hero.jpg" alt="" className="testimonial-img" />
                                                        <h3>Sara Wilsson</h3>
                                                        <h4>Designer</h4>
                                                        <p>
                                                            <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                                                            Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.
                                                            <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="carousel-item">
                                                    <div className="testimonial-item text-center">
                                                        <img src="/images/hero.jpg" alt="" className="testimonial-img" />
                                                        <h3>Jena Karlis</h3>
                                                        <h4>Store Owner</h4>
                                                        <p>
                                                            <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                                                            Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.
                                                            <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="carousel-item">
                                                    <div className="testimonial-item text-center">
                                                        <img src="/images/hero.jpg" alt="img" className="testimonial-img" />
                                                        <h3>Matt Brandon</h3>
                                                        <h4>Freelancer</h4>
                                                        <p>
                                                            <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                                                            Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.
                                                            <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="carousel-item">
                                                    <div className="testimonial-item text-center">
                                                        <img src="/images/hero.jpg" alt="img_here" className="testimonial-img" />
                                                        <h3>John Larson</h3>
                                                        <h4>Entrepreneur</h4>
                                                        <p>
                                                            <i className="bx bxs-quote-alt-left quote-icon-left"></i>
                                                            Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.
                                                            <i className="bx bxs-quote-alt-right quote-icon-right"></i>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="carousel-control-prev" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </section> */}



                            {/* <div className="section" id="contact">
                                <div className="cc-contact-information" style={{ backgroundImage: "url('/images/staticmap.png')" }}>
                                    <div className="container">
                                        <div className="cc-contact">
                                            <div className="row">
                                                <div className="col-md-9">
                                                    <div className="card mb-0">
                                                        <div className="h4 text-center title">Contact Me</div>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="card-body">
                                                                    <form action="https://formspree.io/your@email.com" method="POST">
                                                                        <div className="p pb-3"><strong>Feel free to contact me </strong></div>
                                                                        <div className="row mb-3">
                                                                            <div className="col">
                                                                                <div className="input-group"><span className="input-group-addon"><i
                                                                                    className="fa fa-user-circle"></i></span>
                                                                                    <input className="form-control" type="text" name="name" placeholder="Name"
                                                                                        required="required" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mb-3">
                                                                            <div className="col">
                                                                                <div className="input-group"><span className="input-group-addon"><i
                                                                                    className="fa fa-file-text"></i></span>
                                                                                    <input className="form-control" type="text" name="Subject" placeholder="Subject"
                                                                                        required="required" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mb-3">
                                                                            <div className="col">
                                                                                <div className="input-group"><span className="input-group-addon"><i
                                                                                    className="fa fa-envelope"></i></span>
                                                                                    <input className="form-control" type="email" name="_replyto" placeholder="E-mail"
                                                                                        required="required" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mb-3">
                                                                            <div className="col">
                                                                                <div className="form-group">
                                                                                    <textarea className="form-control" name="message" placeholder="Your Message"
                                                                                        required="required"></textarea>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col">
                                                                                <button className="btn btn-primary" type="submit">Send</button>
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
                )
            }
            {/* <footer className="footer">

                    <div className="text-center text-muted">
                        <p>&copy; Creative CV. All rights reserved.</p>

                    </div>
                </footer> */}
        </>
    )

}
