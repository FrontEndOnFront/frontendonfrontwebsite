import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBMask, MDBRow, MDBCol, MDBBtn, MDBView, MDBContainer, MDBAnimation, MDBIcon, MDBCardBody, MDBSmoothScroll } from "mdbreact";
import "./CSS/Home.css";

import MDBParallaxWrapper from './Components/MDBParallaxWrapper'

class Home extends Component {
   state = {
      collapsed: false
   };

   handleTogglerClick = () => {
      this.setState({
         collapsed: !this.state.collapsed
      });
   };

   render() {
      const overlay = (
         <div
            id="sidenav-overlay"
            style={{ backgroundColor: "transparent" }}
            onClick={this.handleTogglerClick}
         />
      );
      return (
         <div id="apppage" className="gradient">

            {/* Mobile Version */}
            <div className="d-block d-sm-none">
               <Router>
                  <div>
                     <MDBNavbar
                        color="unique-color-dark"
                        dark
                        expand="md"
                        fixed="top"
                        scrolling
                        transparent
                     >
                        <MDBContainer>
                           <MDBNavbarBrand>
                              <img src="./assets/images/Logo1.png" height="30" alt="" />
                           </MDBNavbarBrand>
                           <MDBNavbarToggler onClick={this.handleTogglerClick} />
                           <MDBCollapse isOpen={this.state.collapsed} navbar>
                              <MDBNavbarNav left>
                                 <MDBNavItem>
                                    <MDBSmoothScroll to="About Us Mobile" offset={-350}>
                                       About us
                                 </MDBSmoothScroll>
                                 </MDBNavItem>
                                 <MDBNavItem>
                                    <MDBSmoothScroll to="Our Services Mobile" offset={-250}>
                                       Our Services
                                 </MDBSmoothScroll>
                                 </MDBNavItem>
                                 <MDBNavItem>
                                    <MDBSmoothScroll to="Our Technologies Mobile" offset={-150}>
                                       Our Technologies
                                 </MDBSmoothScroll>
                                 </MDBNavItem>
                                 <MDBNavItem>
                                    <MDBSmoothScroll to="Contact Us Mobile">
                                       Contact Us
                                 </MDBSmoothScroll>
                                 </MDBNavItem>
                              </MDBNavbarNav>
                           </MDBCollapse>
                        </MDBContainer>
                     </MDBNavbar>
                     {this.state.collapsed && overlay}
                  </div>
               </Router>
               <MDBView>
                  <MDBMask className="d-flex justify-content-center align-items-center headerColor">


                     <MDBContainer>
                        <MDBRow>
                           <MDBCol sm="12" className="mt-xl-5 pt-5">
                              <img src="./assets/images/Logo2.png" alt="Logo" className="img-fluid" />
                           </MDBCol>
                        </MDBRow>

                        <MDBRow>
                           <MDBCol sm="12" className="white-text text-center text-md-left mt-xl-5 mb-5">
                              <h1 className="h1-responsive text-left font-weight-bold mt-sm-5">
                                 <MDBAnimation type="fadeInLeft" delay="1s">
                                    <MDBIcon icon="chevron-right" /> Websites
                                 </MDBAnimation>
                                 <MDBAnimation type="fadeInLeft" delay="1.4s">
                                    <MDBIcon icon="chevron-right" /> Portfolios
                                 </MDBAnimation>
                                 <MDBAnimation type="fadeInLeft" delay="1.8s">
                                    <MDBIcon icon="chevron-right" /> Applications
                                 </MDBAnimation>
                              </h1>
                              <MDBAnimation type="fadeIn" delay="3s">
                                 <h1 className="h1-responsive font-weight-bold mt-sm-5">
                                    For the Current Generation.
                                 </h1>
                              </MDBAnimation>

                              <MDBAnimation type="fadeIn" delay="3.3s">
                                 <hr className="hr-light" />
                              </MDBAnimation>

                              <MDBRow center>
                                 <MDBAnimation type="fadeInUp" delay="4.1s">
                                    <MDBSmoothScroll to="About Us" offset={-200}>
                                       <MDBBtn rounded outline color="white">
                                          Learn More
                                       </MDBBtn>
                                    </MDBSmoothScroll>
                                 </MDBAnimation>
                                 <MDBAnimation type="fadeInUp" delay="4.3s">
                                    <MDBSmoothScroll to="Contact Us">
                                       <MDBBtn rounded outline color="white">
                                          Contact Us
                                       </MDBBtn>
                                    </MDBSmoothScroll>
                                 </MDBAnimation>
                              </MDBRow>

                           </MDBCol>


                        </MDBRow>
                     </MDBContainer>
                  </MDBMask>
               </MDBView>

               <div className="deep-blue-gradient">
                  <MDBParallaxWrapper
                     className="parallax-Height"
                     image='./assets/images/SiteCode.png'
                     speed='.1'
                  />

                  <MDBContainer>
                     <MDBRow className="py-5">
                        <MDBCol md="12" className="text-center">
                           <MDBAnimation reveal type="fadeInDown">
                              <h1 id="About Us Mobile">
                                 <strong>Welcome to Front End on Front</strong>
                              </h1>
                           </MDBAnimation>

                           <MDBAnimation reveal type="fadeInUp" delay=".3s">
                              <h4>
                                 We are a proudly Canadian Tech Company based in Toronto, Ontario.
                              </h4>
                              <hr className="hr-dark" />
                           </MDBAnimation>

                           <MDBAnimation reveal type="fadeInUp" delay=".5s">
                              <h5 className="pt-3 pb-4">
                                 Front End On Front develops Web applications featuring state-of-the-art User Experiences (UX) and User Interfaces (UI)
                              </h5>

                              <p>
                                 Need help building a portfolio? Want to stand out by building a website? Need an application built online?
                           </p>
                              <p>
                                 We're here to help! We don't use templates or site building tools to build our sites. We build each website from scratch
                                 right down to the code! This means you won't be limited to what colors or features the template.
                           </p>
                              <h5>
                                 We Design, Develop and Deploy Websites and Web Applications.
                           </h5>
                              <h5>
                                 In more technical terms, We develop<strong> Front End Websites, Back End Api Systems, or Full Stack Applications </strong>for various clients, small buisnesses, or large corporations!
                           </h5>
                           </MDBAnimation>


                        </MDBCol>
                     </MDBRow>
                  </MDBContainer>
               </div>
               <div className="night-fade-gradient">
                  <MDBParallaxWrapper
                     className="parallax-Height"
                     image='./assets/images/DesignTools.png'
                     speed='.1'
                  />
                  <MDBContainer>
                     <MDBRow className="py-5">
                        <MDBCol md="12">

                           <MDBAnimation reveal type="fadeInUp">
                              <h3 className="my-5 text-center" id="Our Services Mobile">
                                 <MDBIcon icon="wrench" className="sectionIcons" />
                              </h3>
                              <h3 className="my-5 text-center">
                                 <strong> Services We Offer </strong>
                              </h3>
                           </MDBAnimation>

                           <MDBAnimation reveal type="fadeInUp" delay=".3s">
                              <h3 className="text-center">There are 4 main Services we provide</h3>
                              <hr className="hr-dark" />
                           </MDBAnimation>

                           <div className="text-center">
                              <MDBAnimation reveal type="fadeInUp" delay=".8s">
                                 <MDBIcon icon="globe-americas" className="serviceIconsMobile" />
                                 <p>Website Design / Development / Deployment (Portfilio Building or Small Buisness Sites) </p>
                              </MDBAnimation>
                              <MDBAnimation reveal type="fadeInUp" delay=".9s">
                                 <MDBIcon icon="exchange-alt" className="serviceIconsMobile" />
                                 <p>Website Conversion / Upgrading</p>
                              </MDBAnimation>
                              <MDBAnimation reveal type="fadeInUp" delay="1s">
                                 <MDBIcon icon="code" className="serviceIconsMobile" />
                                 <p>Web Application Design / Development / Deployment (Full Stack Web Applications)</p>
                              </MDBAnimation>
                              <MDBAnimation reveal type="fadeInUp" delay="1.1s">
                                 <MDBIcon icon="database" className="serviceIconsMobile" />
                                 <p>Back-End Api Design / Development / Deployment (Database Design and Development)</p>
                              </MDBAnimation>
                           </div>


                        </MDBCol>
                     </MDBRow>
                     <div className="largePadding"></div>
                     <hr className="hr-light" />
                     <div className="largePadding"></div>
                     <MDBRow >
                        <MDBCol md="12">
                           <MDBAnimation reveal type="fadeInUp">
                              <h3 className="my-5 text-center" id="Our Technologies Mobile">
                                 <MDBIcon icon="laptop" className="sectionIcons" />
                              </h3>
                              <h3 className="my-5 text-center" >
                                 <strong> Technologies We Use </strong>
                              </h3>
                           </MDBAnimation>

                           <MDBAnimation reveal type="fadeInUp" delay=".3s">
                              <p className="text-center"><strong>We only use whats current.</strong></p>
                              <p className="text-center"><strong>Never old technologies.</strong></p>
                              <h4 className="text-center">It's how we keep you in front of the competition.</h4>
                              <hr className="hr-dark" />
                           </MDBAnimation>

                           <MDBAnimation reveal type="fadeInUp" delay=".5s">
                              <MDBRow className="py-5">
                                 <MDBCol sm="12" className="text-center">
                                    <MDBIcon fab icon="js"
                                       className="technologyIconsMobile" />
                                    <MDBIcon fab icon="node" className="technologyIconsMobile" />
                                    <MDBIcon fab icon="react" className="technologyIconsMobile" />
                                 </MDBCol>
                                 <MDBCol sm="12" className="text-center">
                                    <MDBIcon fab icon="mdb" className="technologyIconsMobile" />
                                    <MDBIcon fab icon="aws" className="technologyIconsMobile" />
                                    <MDBIcon icon="database" className="technologyIconsMobile" />
                                 </MDBCol>
                              </MDBRow>
                           </MDBAnimation>

                           <MDBAnimation reveal type="fadeIn" delay=".8s">
                              <p className="text-center">
                                 Majority of our sties are coded in <strong>JS ES6, the most current and commonly used Javascript Version to date.</strong> This allows for
                           wide compatability and future proofing of our sites. ES6 also allows us to use modern frameworks such as <strong>React</strong> which help
                           us develop sites quicker and more efficently. Our backend servers are usually built through <strong>Node and ExpressJS</strong> along side
                           <strong> MongoDB or MySQL</strong> as the Database. These sites can be deployed on very reliable cloud services such as <strong>AWS</strong> to ensure
                                                                                                                  reliability and peace of mind.
                           </p>

                              <h5 className="text-center">
                                 Building with this technology stack ensures the best services for our clients allowing them to focus on what matters most.
                           </h5>
                              <h5 className="text-center"><strong>Their Buisnesses</strong></h5>
                           </MDBAnimation>

                        </MDBCol>
                     </MDBRow>

                     <div className="largePadding"></div>
                     <hr className="hr-light" />
                     <div className="largePadding"></div>

                     <MDBRow className="py-5">
                        <MDBCol md="12">

                           <MDBAnimation reveal type="fadeIn">
                              <h3 className="my-5 text-center" id="Contact Us Mobile">
                                 <MDBIcon icon="envelope" className="sectionIcons" />
                              </h3>
                              <h3 className="my-5 text-center">
                                 <strong> Contact Us </strong>
                              </h3>
                           </MDBAnimation>

                           <MDBAnimation reveal type="fadeIn" delay=".5s">
                              <h4 className="text-center">Ready to put your plan to action?</h4>
                              <hr className="hr-dark" />
                           </MDBAnimation>
                           <MDBAnimation reveal type="fadeIn" delay="1.5s">
                              <p className="text-center">
                                 All you need is an idea! When you're ready, give us a shout!
                                 Were here when you are!
                           </p>
                              <MDBCol sm="12">
                                 <MDBCardBody className="contact text-center h-100">
                                    <ul className="text-center list-unstyled ml-4">
                                       <li>
                                          <p>
                                             <MDBIcon icon="envelope" className="pr-2 contactIcon" />
                                             FrontEndOnFront@outlook.com
                                    </p>
                                       </li>
                                    </ul>
                                    <MDBBtn tag="a" href="mailto:FrontEndOnFront@outlook.com" rounded outline color="black">Send us an EMail</MDBBtn>
                                 </MDBCardBody>
                              </MDBCol>
                           </MDBAnimation>

                        </MDBCol>
                     </MDBRow>
                  </MDBContainer>
               </div>

            </div>

            {/* Desktop Version */}
            <div className="d-none d-sm-block">
               <Router>
                  <div>
                     <MDBNavbar
                        color="unique-color-dark"
                        dark
                        expand="md"
                        fixed="top"
                        scrolling
                        transparent
                     >
                        <MDBContainer>
                           <MDBNavbarBrand>
                              <img src="./assets/images/Logo1.png" height="30" alt="" />
                           </MDBNavbarBrand>
                           <MDBNavbarToggler onClick={this.handleTogglerClick} />
                           <MDBCollapse isOpen={this.state.collapsed} navbar>
                              <MDBNavbarNav left>
                                 <MDBNavItem>
                                    <MDBSmoothScroll to="About Us" offset={-350}>
                                       About us
                                 </MDBSmoothScroll>
                                 </MDBNavItem>
                                 <MDBNavItem>
                                    <MDBSmoothScroll to="Our Services" offset={-250}>
                                       Our Services
                                 </MDBSmoothScroll>
                                 </MDBNavItem>
                                 <MDBNavItem>
                                    <MDBSmoothScroll to="Our Technologies" offset={-150}>
                                       Our Technologies
                                 </MDBSmoothScroll>
                                 </MDBNavItem>
                                 <MDBNavItem>
                                    <MDBSmoothScroll to="Contact Us">
                                       Contact Us
                                 </MDBSmoothScroll>
                                 </MDBNavItem>
                              </MDBNavbarNav>
                           </MDBCollapse>
                        </MDBContainer>
                     </MDBNavbar>
                     {this.state.collapsed && overlay}
                  </div>
               </Router>
               <MDBView>
                  <MDBMask className="d-flex justify-content-center align-items-center headerColor">
                     <MDBContainer>
                        <MDBRow>
                           <MDBCol md="6" className="mt-xl-5">
                              <MDBAnimation type="fadeInLeft" delay=".3s">
                                 <img src="./assets/images/Logo2.png" alt="Logo" className="img-fluid" />
                              </MDBAnimation>
                           </MDBCol>

                           <MDBCol md="6" className="white-text text-center text-md-left mt-xl-5 mb-5">
                              <h1 className="h1-responsive font-weight-bold mt-sm-5">
                                 <MDBAnimation type="fadeInRight" delay="1s">
                                    <MDBIcon icon="chevron-right" /> Websites
                                 </MDBAnimation>
                                 <MDBAnimation type="fadeInRight" delay="1.4s">
                                    <MDBIcon icon="chevron-right" /> Portfolios
                                 </MDBAnimation>
                                 <MDBAnimation type="fadeInRight" delay="1.8s">
                                    <MDBIcon icon="chevron-right" /> Web Applications
                                 </MDBAnimation>
                              </h1>
                              <MDBAnimation type="fadeIn" delay="3s">
                                 <h1 className="h1-responsive font-weight-bold mt-sm-5">
                                    For the Current Generation.
                                 </h1>
                              </MDBAnimation>

                              <MDBAnimation type="fadeInUp" delay="3.3s">
                                 <hr className="hr-light" />
                              </MDBAnimation>

                              <MDBRow center>
                                 <MDBAnimation type="fadeInUp" delay="4.1s">
                                    <MDBSmoothScroll to="About Us" offset={-350}>
                                       <MDBBtn rounded outline color="white">
                                          Learn More
                                       </MDBBtn>
                                    </MDBSmoothScroll>
                                 </MDBAnimation>
                                 <MDBAnimation type="fadeInUp" delay="4.3s">
                                    <MDBSmoothScroll to="Contact Us">
                                       <MDBBtn rounded outline color="white">
                                          Contact Us
                                       </MDBBtn>
                                    </MDBSmoothScroll>
                                 </MDBAnimation>
                              </MDBRow>
                           </MDBCol>


                        </MDBRow>
                     </MDBContainer>
                  </MDBMask>
               </MDBView>

               <div className="deep-blue-gradient">
                  <MDBParallaxWrapper
                     className="parallax-Height"
                     image='./assets/images/SiteCode.png'
                     speed='.1'
                  />

                  <MDBContainer>
                     <MDBRow className="py-5">
                        <MDBCol md="12" className="text-center">
                           <MDBAnimation reveal type="fadeInDown">
                              <h1 className="h1-responsive my-5" id="About Us">
                                 Welcome to Front End on Front
                           </h1>
                           </MDBAnimation>

                           <MDBAnimation reveal type="fadeInUp" delay=".3s">
                              <h3>
                                 We are a proudly Canadian Tech Company based in Toronto, Ontario.
                           </h3>
                              <hr className="hr-dark" />
                           </MDBAnimation>

                           <MDBAnimation reveal type="fadeInUp" delay=".5s">
                              <h5 className="pt-3 pb-4">
                                 Front End On Front develops Web applications featuring state-of-the-art User Experiences (UX) and User Interfaces (UI)
                           </h5>

                              <p>
                                 Need help building a portfolio? Want to stand out by building a website? Need an application built online?
                           </p>
                              <p>
                                 We're here to help! We don't use templates or site building tools to build our sites. We build each website from scratch
                                 right down to the code! This means you won't be limited to what colors or features the template.
                           </p>
                              <h5>
                                 We Design, Develop and Deploy Websites and Web Applications.
                           </h5>
                              <h5>
                                 In more technical terms, We develop<strong> Front End Websites, Back End Api Systems, or Full Stack Applications </strong>for various clients, small buisnesses, or large corporations!
                           </h5>
                           </MDBAnimation>


                        </MDBCol>
                     </MDBRow>
                  </MDBContainer>
               </div>
               <div className="night-fade-gradient">
                  <MDBParallaxWrapper
                     className="parallax-Height"
                     image='./assets/images/DesignTools.png'
                     speed='.1'
                  />
                  <MDBContainer>
                     <MDBRow className="py-5">
                        <MDBCol md="12">

                           <MDBAnimation reveal type="fadeInUp">
                              <h3 className="my-5 text-center" id="Our Services">
                                 <MDBIcon icon="wrench" className="sectionIcons" />
                              </h3>
                              <h3 className="my-5 text-center">
                                 <strong> Services We Offer </strong>
                              </h3>
                           </MDBAnimation>

                           <MDBAnimation reveal type="fadeInUp" delay=".3s">
                              <h3 className="text-center">There are 4 main Services we provide</h3>
                              <hr className="hr-dark" />
                           </MDBAnimation>

                           <MDBAnimation reveal type="fadeInUp" delay=".8s">
                              <p> <MDBIcon icon="globe-americas" className="serviceIcons" />Website Design / Development / Deployment (Portfilio Building or Small Buisness Sites) </p>
                           </MDBAnimation>
                           <MDBAnimation reveal type="fadeInUp" delay=".9s">
                              <p> <MDBIcon icon="exchange-alt" className="serviceIcons" />Website Conversion / Upgrading</p>
                           </MDBAnimation>
                           <MDBAnimation reveal type="fadeInUp" delay="1s">
                              <p> <MDBIcon icon="code" className="serviceIcons" />Web Application Design / Development / Deployment (Full Stack Web Applications)</p>
                           </MDBAnimation>
                           <MDBAnimation reveal type="fadeInUp" delay="1.1s">
                              <p> <MDBIcon icon="database" className="serviceIcons" />Back-End Api Design / Development / Deployment (Database Design and Development)</p>
                           </MDBAnimation>

                        </MDBCol>
                     </MDBRow>
                     <div className="largePadding"></div>
                     <hr className="hr-light" />
                     <div className="largePadding"></div>
                     <MDBRow >
                        <MDBCol md="12">
                           <MDBAnimation reveal type="fadeInUp">
                              <h3 className="my-5 text-center" id="Our Technologies">
                                 <MDBIcon icon="laptop" className="sectionIcons" />
                              </h3>
                              <h3 className="my-5 text-center">
                                 <strong> Technologies We Use </strong>
                              </h3>
                           </MDBAnimation>

                           <MDBAnimation reveal type="fadeInUp" delay=".3s">
                              <p className="text-center"><strong>We only use whats current. Never old technologies.</strong></p>
                              <h4 className="text-center">It's how we keep you in front of the competition.</h4>
                              <hr className="hr-dark" />
                           </MDBAnimation>

                           <MDBAnimation reveal type="fadeInUp" delay=".5s">
                              <MDBRow className="py-5">
                                 <MDBCol md="2" className="text-center">
                                    <MDBIcon fab icon="js" className="technologyIcons" />
                                 </MDBCol>
                                 <MDBCol md="2" className="text-center">
                                    <MDBIcon fab icon="node" className="technologyIcons" />
                                 </MDBCol>
                                 <MDBCol md="2" className="text-center">
                                    <MDBIcon fab icon="react" className="technologyIcons" />
                                 </MDBCol>
                                 <MDBCol md="2" className="text-center">
                                    <MDBIcon fab icon="mdb" className="technologyIcons" />
                                 </MDBCol>
                                 <MDBCol md="2" className="technologyIcons text-center">
                                    <MDBIcon fab icon="aws" />
                                 </MDBCol>
                                 <MDBCol md="2" className="technologyIcons text-center">
                                    <MDBIcon icon="database" />
                                 </MDBCol>
                              </MDBRow>
                           </MDBAnimation>

                           <MDBAnimation reveal type="fadeInUp" delay=".8s">
                              <p className="text-center">
                                 Majority of our sties are coded in <strong>JS ES6, the most current and commonly used Javascript Version to date.</strong> This allows for
                           wide compatability and future proofing of our sites. ES6 also allows us to use modern frameworks such as <strong>React</strong> which help
                           us develop sites quicker and more efficently. Our backend servers are usually built through <strong>Node and ExpressJS</strong> along side
                           <strong> MongoDB or MySQL</strong> as the Database. These sites can be deployed on very reliable cloud services such as <strong>AWS</strong> to ensure
                                                                                                                  reliability and peace of mind.
                           </p>

                              <h5 className="text-center">
                                 Building with this technology stack ensures the best services for our clients allowing them to focus on what matters most.
                           </h5>
                              <h5 className="text-center"><strong>Their Buisnesses</strong></h5>
                           </MDBAnimation>

                        </MDBCol>
                     </MDBRow>

                     <div className="largePadding"></div>
                     <hr className="hr-light" />
                     <div className="largePadding"></div>

                     <MDBRow className="py-5">
                        <MDBCol md="12">

                           <MDBAnimation reveal type="fadeIn">
                              <h3 className="my-5 text-center" id="Contact Us">
                                 <MDBIcon icon="envelope" className="sectionIcons" />
                              </h3>
                              <h3 className="my-5 text-center">
                                 <strong> Contact Us </strong>
                              </h3>
                           </MDBAnimation>

                           <MDBAnimation reveal type="fadeIn" delay=".5s">
                              <h4 className="text-center">Ready to put your plan to action?</h4>
                              <hr className="hr-dark" />
                           </MDBAnimation>
                           <MDBAnimation reveal type="fadeIn" delay="1.5s">
                              <p className="text-center">
                                 All you need is an idea! When you're ready, give us a shout!
                                 Were here when you are!
                           </p>
                              <MDBCol sm="12">
                                 <MDBCardBody className="contact text-center h-100">
                                    <ul className="text-center list-unstyled ml-4">
                                       <li>
                                          <p>
                                             <MDBIcon icon="envelope" className="pr-2 contactIcon" />
                                             FrontEndOnFront@outlook.com
                                    </p>
                                       </li>
                                    </ul>
                                    <MDBBtn tag="a" href="mailto:FrontEndOnFront@outlook.com" rounded outline color="black">Send us an EMail</MDBBtn>
                                 </MDBCardBody>
                              </MDBCol>
                           </MDBAnimation>

                        </MDBCol>
                     </MDBRow>
                  </MDBContainer>
               </div>
            </div>

         </div >
      );
   }
}

export default Home;