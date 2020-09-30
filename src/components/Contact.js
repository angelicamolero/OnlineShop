import React from 'react';
///////////////////////////

const Contact = () => {
    return ( 
        <div className="container">
          <div className="row contact-headline">
              <h3>Contact Us</h3>
              <p>Get in touch with us in any of our Social Media below.</p>
          </div>
          <div className="row social-contact">
            <div className="icon instagram">
                <i className="fab fa-instagram"></i>
            </div>
            <div className="icon facebook">
                <i className="fab fa-facebook-f"></i>
            </div>
            <div className="icon twitter">
                <i className="fab fa-twitter"></i>
            </div>
          </div>
        </div>
     );
}
 
export default Contact;