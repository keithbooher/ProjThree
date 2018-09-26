import React from "react";
import { Link } from "react-router-dom";

const Footer = props => (
  <div className="footer">
    <div className="footerLinks">
      <Link to="/faq">FAQ</Link>
      <Link to="/contactUs">Contact Us</Link>
    </div>
      <h6 className="copyright">Copyright@ Art Gutter</h6>
  </div>
);

export default Footer;
