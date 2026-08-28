// import '../pages/products.css';

//  function Footer() {
//     return(
// <>
// <div className='foot' >
// <div className="logo-footer">
//             <img src="" alt='not available' />
// </div>

// <ul className='menu-footer'>
//     <li>Home </li>
//     <li>About Us </li>
//     <li> Contact Us </li>

// </ul>
//          </div>

// </>


//     )
// }

// export default Footer;

import facebook from "../images/facebook.png";
import instagram from "../images/instagram.png";
import linkedin from "../images/linkedin.png";
import twitter from "../images/twitter.png";
import australia from "../images/Australian_Aboriginal_Flag 1.png";
import logo from "../images/blue-logo.webp";


function Footer() {
  return (
    <div className="foot">

      <div className="logo-footer">
        <img src= {logo}alt="Facebook" />
      </div>

      <ul className="menu-footer">
        <li>Home</li>
        <li>About Us</li>
        <li>Contact Us</li>
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