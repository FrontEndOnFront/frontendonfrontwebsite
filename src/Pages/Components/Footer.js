import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";

const Footer = () => {
   return (
      <MDBFooter color="unique-color-dark" className="font-small darken-3 pt-0">
         
         <div className="footer-copyright text-center py-3">
            <MDBContainer fluid>
               &copy; {new Date().getFullYear()} Copyright:{" "}
               <a href="https://frontendonfront.com/"> FrontEndonFront </a>
            </MDBContainer>
         </div>
      </MDBFooter>
   );
}

export default Footer;