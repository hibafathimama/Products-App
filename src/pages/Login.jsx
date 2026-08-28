import './login.css';
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Context/auth';





const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

   useEffect(()=>{
        if(user){
            navigate('/')
        }
   })

    const handlelogin=(e)=>{
            e.preventDefault();
        login(username,password)
    }
    

   return(
    <>

    <div className='login'>
    <div className='login-box'>
        <h3 className='login-head'>Login</h3>

        <form onSubmit={handlelogin}>
            <input className='box' type='text'  placeholder='Enter the Username'
             value={username}
             onChange={(e) => setUsername(e.target.value)}
            />
            <input  className='box' type='password' placeholder='Enter the Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className='submit' type='submit' >Login</button>
        </form>

    </div>
    </div>


    </>

    );
}
export default Login;