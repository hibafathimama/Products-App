import { useEffect, useState } from 'react'

import './login.css';

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";



function Viewproduct(){

    const navigate = useNavigate();
    const {id} = useParams()
  
    const product = () => {
        navigate("/");
        
    };
const [viewproduct,setViewproduct]=useState("")

useEffect(()=>{
    axios.get(`https://fakestoreapi.com/products/${id}`)
  .then(response => setViewproduct(response.data));
},[id]);




    return(
   <>
<div className='viewproduct'>
<div className="view1" style={{ width: "100%" }}>
    <div className='image-section1'>  
              <img
        src={viewproduct.image}
        alt={viewproduct.title}
      />

</div>
  <div className="card-body1">
    <h1 className="card-title">{viewproduct.title}
</h1>
    <h3 className='price1'>₹{viewproduct.price}</h3>
    <h5 className='Category'>{viewproduct.category}</h5>
    <p className="card-text1">{viewproduct.description}</p>
    <button className='go-button'onClick={product}>GO BACK</button>
  </div>
</div>
</div>



</>
    )


}
export default Viewproduct;