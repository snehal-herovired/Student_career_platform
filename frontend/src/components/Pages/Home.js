import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Home() {


  let beginner = {
    width: "20%"
  }
  let intermediate = {
    width: "40%"
  }
  let advance = {
    width: "80%"
  }
  let expert = {
    width: "100%"
  }
  return (
    <>
      <main id="main">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item " aria-current="page"><NavLink to='/student/uploadresume'>Upload Resume</NavLink></li>
            <li class="breadcrumb-item"><NavLink to='/student/template'>View Template</NavLink></li>
          </ol>
        </nav>
        <section id="about" className="about" style={{ marginBottom: "3px", background: '' }}>
          <div className="container" data-aos="fade-up">

            <div className="section-title" style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
              <br />
              <br />
              <h2 style={{ fontWeight: "bold" }}>About</h2>
              <p style={{ textAlign: "center" }}>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
            </div>

            <div className="row" style={{ background: "" }}>
              <div className="col-lg-4">
                <img src='/images/hero.jpg' alt="" style={{ height: "100%", width: "100%" }} />
              </div>
              <div className="col-lg-8 pt-4 pt-lg-0 content" style={{ padding: "2px" }}>
                <h3>Personal Information</h3>

                <div className="row" >
                  <div className="col-lg-6" >
                    <ul>
                      <li><i className="bi bi-rounded-right"></i> <strong>Email:</strong> 1 May 1995</li>
                      <li><i className="bi bi-rounded-right"></i> <strong>LindkedIn:</strong> www.example.com</li>
                      <li><i className="bi bi-rounded-right"></i> <strong>Phone:</strong> +123 456 7890</li>
                      <li><i className="bi bi-rounded-right"></i> <strong>Address:</strong> Address : New York, USA</li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul>

                      <li><i className="bi bi-rounded-right"></i> <strong>Twitter:</strong> email@example.com</li>
                      <li><i className="bi bi-rounded-right"></i> <strong>Github:</strong> Available</li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
            <br />
            <br />
          </div>
        </section>
        {/* <!-- End About Section --> */}

        {/* education section */}
        <section className="about" style={{ marginTop: "3px" }}>
          <div className="container" data-aos="fade-up">

            <div className="section-title" style={{ display: 'flex', flexDirection: 'column', alignItems: "center", marginTop: "2px" }}>
              <br />
              <h4 style={{ fontWeight: "bold" }}>Education Qualifications</h4>
            </div>

            <div className="row" style={{ background: "" }}>

              <div className="col-lg-8 pt-4 pt-lg-0 content" style={{ padding: "2px" }}>
                <h3>Education information</h3>

                <div className="row" >
                  <div className="col-lg-6" >
                    <ul>
                      <li><i className="bi bi-rounded-right"></i> <strong>Institution Name:</strong>Chandigrah University</li>
                      <li><i className="bi bi-rounded-right"></i> <strong>Qualification:</strong>B.E</li>
                      <li><i className="bi bi-rounded-right"></i> <strong>Year:</strong> 4 year</li>
                    </ul>
                  </div>


                </div>

              </div>
            </div>
            <br />
            <br />
          </div>
        </section>

        {/* experience section */}
        <section className="about" style={{ marginTop: "3px" }}>
          <div className="container" data-aos="fade-up">

            <div className="section-title" style={{ display: 'flex', flexDirection: 'column', alignItems: "center", marginTop: "2px" }}>
              <br />
              <h4 style={{ fontWeight: "bold" }}>Experience and Internships</h4>
            </div>

            <div className="row" style={{ background: "" }}>

              <div className="col-lg-8 pt-4 pt-lg-0 content" style={{ padding: "2px" }}>
                <h3>Experience</h3>

                <div className="row" >
                  <div className="col-lg-6" >
                    <ul>
                      <li><i className="bi bi-rounded-right"></i> <strong>Company Name:</strong>Chandigrah University</li>
                      <li><i className="bi bi-rounded-right"></i> <strong>Position:</strong>B.E</li>
                      <li><i className="bi bi-rounded-right"></i> <strong>Duration:</strong> 4 year</li>
                    </ul>
                  </div>


                </div>

              </div>
            </div>
            <br />
            <br />
          </div>
        </section>

        {/* Project section */}
        <section className="about" style={{ marginTop: "3px" }}>
          <div className="container" data-aos="fade-up">

            <div className="section-title" style={{ display: 'flex', flexDirection: 'column', alignItems: "center", marginTop: "2px" }}>
              <br />
              <h4 style={{ fontWeight: "bold" }}>Experience and Internships</h4>
            </div>

            <div className="row" style={{ background: "" }}>

              <div className="col-lg-8 pt-4 pt-lg-0 content" style={{ padding: "2px" }}>
                <h3>Projects</h3>

                <div className="row" >
                  <div className="col-lg-6" >
                    <ul>
                      <li><i className="bi bi-rounded-right"></i> <strong>Project Title:</strong>Chandigrah University</li>
                      <li><i className="bi bi-rounded-right"></i> <strong>Description:</strong>B.E</li>
                      <li><i className="bi bi-rounded-right"></i> <strong>Technologies:</strong>Nodejs,Reactjs,CSS</li>
                      <li><i className="bi bi-rounded-right"></i> <strong>Link:</strong><Link to='https://www.google.com/'>https://www.google.com/</Link></li>
                    </ul>
                  </div>


                </div>

              </div>
            </div>
            <br />
            <br />
          </div>
        </section>

        {/* <!-- ======= Skills Section ======= --> */}
        <section id="skills" className="skills">
          <div className="container" data-aos="fade-up">

            <div className="section-title">
              <h2>Skills</h2>
            </div>

            <div className="row skills-content">

              <div className="col-lg-6">

                <span className="skill">HTML </span>

                <div class="progress">
                  <div class="progress-bar" role="progressbar" style={beginner} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>


                <span className="skill">CSS </span>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" style={expert} aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                </div>



                <span className="skill">JavaScript</span>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" style={advance} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>

              </div>



            </div>
            <br />
            <br />
          </div>
        </section>
        {/* <!-- End Skills Section --> */}

        {/* <!-- ======= Github Section ======= --> */}
        <section id="facts" className="facts">
          <div className="container" data-aos="fade-up">

            <div className="section-title">
              <h2>Github</h2>
            </div>

            <div className="row counters">

              <div className="col-lg-3 col-6 text-center">
                <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="1" className="purecounter">20</span>
                <p>Total Contribution</p>
              </div>

              <div className="col-lg-3 col-6 text-center">
                <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="1" className="purecounter">90</span>
                <p>Number of Projects</p>
              </div>

              <div className="col-lg-3 col-6 text-center">
                <span data-purecounter-start="0" data-purecounter-end="1463" data-purecounter-duration="1" className="purecounter">200</span>
                <p>Total Contribution this Year</p>
              </div>



            </div>
            <br />
            <br />

          </div>
        </section>
        {/* <!-- End Facts Section --> */}

        {/* <!-- ======= Testimonials Section ======= --> */}
        <section id="testimonials" className="testimonials">
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
                  {/* End testimonial item */}

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
                <button className="carousel-control-prev" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="prev" style={{ color: "black" }}>
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
        </section>


      </main>
    </>
  )
}
