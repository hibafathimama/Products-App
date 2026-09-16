import '../styles/profile.css';
import { useEffect } from "react";
import api from '../Api';
import {  useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form';
import {yupResolver } from '@hookform/resolvers/yup';
import *as yup from 'yup';

const profileSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required"),

  lastName: yup
    .string()
    .required("Last name is required"),

  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

});
   const ProfilePage  =()=>{
        //validation
       const{ register,
        handleSubmit,
        reset,
        formState: { errors }
       }=useForm({resolver:yupResolver(profileSchema)});

       //get user
       useEffect(()=>{
        const getuser = async()=>{
            try{
                const token = localStorage.getItem('token')
                const response = await api.get('/api/users/getoneuser',
                    {
                        headers: {
                         Authorization: `Bearer ${token}`,
                        },
                    });
                    // Get user from response
                    const user = response.data.data;
                    // Put user data into form
                    reset({
                        firstName:user.firstName,
                        lastName:user.lastName,
                        email:user.email
                    });     
            }
            catch(error){
                    console.log("GET USER ERROR:", error);
            }
        };
        getuser();
       },[reset]);

       // update user
       const onsubmit = async(data)=>{
        try{
          const  token = localStorage.getItem('token');
          const response = await api.put('/api/users/updateuser',data,
            {
                headers: { Authorization: `Bearer ${token}`, },
            },
          )
        
                  alert("Profile updated successfully");
                //   Put updated data into the form 
                  reset({ firstName: response.data.data.firstName,
                     lastName: response.data.data.lastName,
                      email: response.data.data.email, });

       }catch (error) { 
        console.log("UPDATE USER ERROR:", error);
         if (error.response) { console.log("SERVER ERROR:", error.response.data); 
            alert( error.response.data.message || "Profile update failed" ); } } };

    
    
return (
  <div className="profile-container">

    <div className="profile-card">

      <h2>My Profile</h2>

      <form onSubmit={handleSubmit(onsubmit)}>

        {/* First Name */}
        <label>First Name</label>
        <input
          type="text"
          {...register("firstName")}
        />

        {/* Last Name */}
        <label>Last Name</label>
        <input
          type="text"
          {...register("lastName")}
        />

        {/* Email */}
        <label>Email</label>
        <input
          type="email"
          {...register("email")}
        />

        <button type="submit">
          Update Profile
        </button>

      </form>

    </div>

  </div>
);
   }


  export default ProfilePage;
