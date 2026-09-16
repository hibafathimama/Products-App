import '../styles/products.css';
import logo from "../images/blue-logo.webp";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../Context/auth"
import { Link } from "react-router-dom";


function Navbar () {
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

const {logout, user} = useAuth();
console.log(user)


        return (
        <>

        <div className='nav'>
         <div className="logo">
            <img src={logo} alt='not available' />
         </div>
         <div>
         <ul className='menu'>
            <li onClick={viewhome}>Home </li>
            <li onClick={viewabout}>About </li>
            <li onClick={viewcontact}>Contact </li>
            <li>
           
            <Link to="/profile" className='profile'>
            <img src="https://cdn-icons-png.magnific.com/512/10302/10302971.png" alt='not available' />
            </Link>
            </li>
          <li>
    <button
        className='logout'
        onClick={() => {
            if (user) {
                logout();
            } else {
                navigate("/");
            }
        }}
    >
        {user ? "LOGOUT" : "LOGIN"}
    </button>
</li>

         </ul>
         </div>
         </div>
        </>
    )

}

export default Navbar;