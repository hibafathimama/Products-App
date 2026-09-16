
import facebook from "../images/facebook.png";
import instagram from "../images/instagram.png";
import linkedin from "../images/linkedin.png";
import twitter from "../images/twitter.png";
import { useNavigate } from "react-router-dom";


import logo from "../images/blue-logo.webp";


function Footer() {
  const navigate = useNavigate();
const viewabout=()=>{
    navigate("/about")
}

const viewhome=()=>{
    navigate("/")
}
const viewcontact=()=>{
    navigate("/contact")
}

  return (
    <div className="foot">

      <div className="logo-footer">
        <img src= {logo}alt="Facebook" />
      </div>

      <ul className="menu-footer">
        <li onClick={viewhome}>Home</li>
        <li onClick={viewabout}>About Us </li>
        <li onClick={viewcontact}>Contact Us</li>
      </ul>

      <div className="social-icons">
        <img src={facebook} alt="Facebook" />
        <img src={instagram} alt="Instagram" />
        <img src={linkedin} alt="LinkedIn" />
        <img src={twitter} alt="Twitter" />
      </div>

      <p className="parag-footer">© 2025 MyApp. All Rights Reserved.</p>

    </div>
  );
}

export default Footer;