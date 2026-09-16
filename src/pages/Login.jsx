import '../styles/login.css';
// import {useState, useEffect} from 'react';
import {  useNavigate } from "react-router-dom";
import api from '../Api';
import {useForm} from 'react-hook-form';
import {yupResolver } from '@hookform/resolvers/yup';
import *as yup from 'yup';
import { Link } from "react-router-dom";

    const schema = yup.object().shape({
        email:yup.string().required("email is required"),
        password:yup.string().required("password is required").min(8,"password must be atleast 8 characters")
    })

    const LoginPage =()=>{
        //validation
       const{ register,
        handleSubmit,
        formState: { errors }
       }=useForm({resolver:yupResolver(schema)});
    

    const navigate =useNavigate();
    const onsubmit = async(data)=>{
        try{
            await api.post('/api/users/login',data,
            {
                headers:{
                    'Content-Type':'application/json'
                }
            }).then((res)=>{
                alert('Login successfull')
                localStorage.setItem('token',res.data.accestoken)
                localStorage.setItem('user',JSON.stringify(res.data.data))

                navigate('/Products');   
         })
        }catch(error){
    console.log("LOGIN ERROR:", error);
    console.log("SERVER RESPONSE:", error.response?.data);

    alert(error.response?.data?.message || 'Invalid credentials');
}
    }


   return(
    <>

    <div className='login'>
    <div className='login-box'>
        <h3 className='login-head'>Login</h3>

        <form onSubmit={handleSubmit(onsubmit)}>
            <input className='box' type='email'  placeholder='Enter your email'
    
             {...register('email')} 
            />
            <p className="error">{errors.email?.message}</p>

            <input  className='box' type='password' placeholder='Enter the Password'

                {...register('password')}
            />
            <p className='error'>{errors.password?.message}</p>

            <button className='submit' type='submit' >Login</button>
            <p>
            Don't have an account?{" "}
            <Link to="/registration">Register</Link>
            </p>
        </form>

    </div>
    </div>


    </>

    );
}
export default LoginPage;