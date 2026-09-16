import '../styles/registration.css'
import api from '../Api';
import {  useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form';
import {yupResolver } from '@hookform/resolvers/yup';
import *as yup from 'yup';


const registrationSchema = yup.object({
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

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  role: yup
    .string()
    .oneOf(["seller", "buyer"], "Select a valid role")
    .required("Role is required"),

  image: yup
    .mixed()
    .required("Profile image is required"),
});
   const RegistrationPage  =()=>{
        //validation
       const{ register,
        handleSubmit,
        formState: { errors }
       }=useForm({resolver:yupResolver(registrationSchema)});

           const navigate =useNavigate();
           const onsubmit = async(data)=>{
            try{
                // Create FormData 
            const formData = new FormData(); 
            formData.append("firstName", data.firstName); 
            formData.append("lastName", data.lastName); 
            formData.append("email", data.email); 
            formData.append("password", data.password); 
            formData.append("role", data.role); 
            // Add image file
             formData.append("image", data.image[0]);
             // send to backend
              await api.post('/api/users/register',formData);

             alert('registration successfull')
             navigate('/'); 
           
            }
            catch(error)
            {
 console.log("REGISTRATION ERROR:", error);
  console.log("STATUS:", error.response?.status);
  console.log("SERVER ERROR:", error.response?.data);
                    alert(error.response?.data?.message || 'registration failed');
            }
        };
    
return (
  <div className="registration-container">

    <div className="registration-box">

      <h2>Create Account</h2>

      <form onSubmit={handleSubmit(onsubmit)}>

        {/* First Name */}
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            {...register("firstName")}
          />
          <p>{errors.firstName?.message}</p>
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            {...register("lastName")}
          />
          <p>{errors.lastName?.message}</p>
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            {...register("email")}
          />
          <p>{errors.email?.message}</p>
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
        </div>

        {/* Role */}
        <div className="form-group">
          <label>Role</label>

          <select {...register("role")}>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>

          <p>{errors.role?.message}</p>
        </div>

        {/* Image */}
        <div className="form-group">
          <label>Profile Image</label>

          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            {...register("image")}
          />

          <p>{errors.image?.message}</p>
        </div>

        {/* Register button */}
        <button type="submit">
          Register
        </button>

      </form>

      <p>
        Already have an account?{" "}
        <span
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          Login
        </span>
      </p>

    </div>

  </div>
);

        
    }
    export default RegistrationPage;