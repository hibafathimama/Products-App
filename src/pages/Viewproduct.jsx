import { useEffect, useState } from 'react'
import '../styles/login.css'
import { useNavigate, useParams } from "react-router-dom";
import api from '../Api'



function Viewproduct(){

    const navigate = useNavigate();
    const {id} = useParams()
  
    const product = () => {
        navigate("/products");
        
    };
const [viewproduct, setViewproduct] = useState({});
useEffect(() => {
 const getoneproduct = async()=>{
    try{
        const token = localStorage.getItem("token");
        const response = await api.get(`/api/products/${id}`,
            {
                headers: {
                        Authorization: `Bearer ${token}`
                    }

            }
        );
        console.log("VIEW PRODUCT:", response.data);
        console.log("IMAGE:", response.data.data.image);
        setViewproduct(response.data.data);
  
    }catch (error) {
            console.log("VIEW PRODUCT ERROR:", error);
            console.log("SERVER ERROR:", error.response?.data);
        }
   };
   getoneproduct()
}, [id]);



    return(
   <>
<div className='viewproduct'>
<div className="view1" style={{ width: "100%" }}>
    <div className='image-section1'>  
           <img
    src={
        viewproduct.image
            ? `http://localhost:5000/${viewproduct.image.replaceAll("\\", "/")}`
            : ""
    }
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