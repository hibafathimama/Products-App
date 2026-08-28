import { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import './products.css';
import axios from 'axios'
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Context/auth';





function Products() {
    // const products = [
    //     {
    //         id: 1,
    //         name: "Square Veloura Emerald Green Dial Stainless Steel Analog Watch For Women",
    //         price: "₹409.85",
    //         image: watch,
    //         description:
    //             "Upgrade your accessory game with the Square Veloura Emerald Analog Watch for Women, a stunning blend of modern design and timeless elegance."
    //     },
    //     {
    //         id: 2,
    //         name: "Classic Rose Gold Analog Watch For Women",
    //         price: "₹599.99",
    //         image: watch,
    //         description:
    //             "A beautiful rose gold watch designed to add elegance and style to your everyday look."
    //     },
    //     {
    //         id: 3,
    //         name: "Elegant Black Dial Stainless Steel Watch",
    //         price: "₹749.50",
    //         image: watch,
    //         description:
    //             "A stylish black dial watch with a modern stainless steel design, perfect for everyday use."
    //     },
    //     {
    //         id: 4,
    //         name: "Silver Classic Analog Watch For Women",
    //         price: "₹899.00",
    //         image: watch,
    //         description:
    //             "A timeless silver analog watch that combines simplicity, comfort, and elegant design."
    //     },
    //     {
    //         id: 5,
    //         name: "Luxury Blue Dial Fashion Watch",
    //         price: "₹999.85",
    //         image: watch,
    //         description:
    //             "A fashionable blue dial watch with a premium look, perfect for casual and formal occasions."
    //     }
    // ];
    const navigate = useNavigate();
//    const viewproduct = () => {
//         navigate("/viewproduct");
        
//     };
const {user}=useAuth();


    const [products, setProducts] = useState([])
    const [showmodal, setshowmodal] = useState(false)
    // const [addproduct, setaddproduct]=useState([null])
    const [title, setTitle]=useState("")
    const [price, setPrice]=useState("")
    const [cateogary, setCateogary]=useState("")
    const [imageurl ,setImageurl]=useState("")
    const [textarea,setTextarea]=useState("")

   const [showEditModal, setShowEditModal] = useState(false);
const [editId, setEditId] = useState(null);
const [editTitle, setEditTitle] = useState("");
const [editPrice, setEditPrice] = useState("");
const [editCategory, setEditCategory] = useState("");
const [editImage, setEditImage] = useState("");
const [editDescription, setEditDescription] = useState("");

const [showViewModal, setShowViewModal] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
console.log(showViewModal,selectedProduct,displayproduct);


const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleteId, setDeleteId] = useState(null);
const [currentPage, setCurrentPage] = useState(1);


useEffect(()=>{
    if(!user){
        navigate("/login");
    }
})
const handlebutton = () => {
    const product = {
        title: "",
        price: Number(price),
        category: cateogary,
        image: imageurl,
        description: textarea
    };
    axios.post("https://fakestoreapi.com/products", product)
        .then(response => {
          console.log(response)
            setProducts([...products,response.data])
            toast.success("Successful");

                setTitle("");
                setPrice("");
                setCateogary("");
                setImageurl("");
                setTextarea("");



            setshowmodal(false)


            // setProducts(prevProducts => [
            //     ...prevProducts,
            //     response.data
});

         
};

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => setProducts(response.data));

    },[])

//    const addedproduct =() =>{
//    const product = { title: 'New Product', price: 29.99 };
// axios.post('https://fakestoreapi.com/products', product)
//   .then(response => setaddproduct(response.data));

//    };

const deleteproduct =(id)=> {
   
    axios.delete(`https://fakestoreapi.com/products/${id}`)
  .then(response => (
        setProducts( products.filter((product) => product.id !== response.data.id))

  ));

     toast.success("deleted")


}

const updatproduct =(id)=>{
const updatedproduct = {
        title: editTitle,
        price: Number(editPrice),
        category: editCategory,
        image: editImage,
        description: editDescription
    };
    axios.put(`https://fakestoreapi.com/products/${id}`,updatedproduct )
  .then(response => console.log(response.data));

          setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === id
                    ? { ...product, ...updatedproduct }
                    : product
            )
        );
      setShowEditModal(false);

     toast.success("updated")
    

};



const editproduct = (product) => {
    setEditId(product.id);

    setEditTitle(product.title);
    setEditPrice(product.price);
    setEditCategory(product.category);
    setEditImage(product.image);
    setEditDescription(product.description);

    setShowEditModal(true);
};

const displayproduct=(product)=>{
    setSelectedProduct(product);
    setShowViewModal(true);

}

const productPerPage=8;
const lastProduct=currentPage*productPerPage;

const firstProduct=lastProduct-productPerPage;
const currentProduct=products.slice(
    firstProduct,lastProduct
    
)




    return (

        <>
            <Navbar />
            <h1 className="product-head">ALL PRODUCTS</h1>
            <button className="add-button" onClick={() => setshowmodal(true)}>ADD PRODUCT
            </button>




            {showmodal && (

                <div className="modal-fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">                      
                 <div className="modal-content">
                 <div className="modal-header">
                 <h1 className="modal-title ">ADD PRODUCT</h1>
                                {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                            </div>
                            <div className="modal-body"  >
                                 
                                <div className="mb-3">
                                    <div className='text'>
                                    <label for="exampleFormControlInput1" className="form-label">Title</label>
                                    <input type="email" className="form-control" id="exampleFormControlInput1" 
                                    value={title}
                                    onChange={(e)=>setTitle(e.target.value)}/>
                                </div>
                                </div>

                                 <div className="mb-3">
                                    <div className='text'>
                                    <label for="exampleFormControlInput1" className="form-label">Price</label>
                                    <input type="email" className="form-control" id="exampleFormControlInput1"
                                    value={price}
                                    onChange={(e)=>setPrice(e.target.value)} />
                                </div>
                                </div>

                                 <div className="mb-3">
                                    <div className='text'>
                                    <label for="exampleFormControlInput1" className="form-label">Cateogary</label>
                                    <input type="email" className="form-control" id="exampleFormControlInput1"
                                    value={cateogary}
                                    onChange={(e)=>setCateogary(e.target.value)} />
                                </div>
                                </div>
                                 <div className="mb-3">
                                    <div className='text'>
                                    <label for="exampleFormControlInput1" className="form-label">Image URL</label>
                                    <input type="email" className="form-control" id="exampleFormControlInput1"
                                    value={imageurl}
                                    onChange={(e)=>setImageurl(e.target.value)} />
                                </div>
                                </div>

                                <div className="mb-3">
                                 <div className='text'>
                                    <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                    value={textarea}
                                    onChange={(e)=>setTextarea(e.target.value)}></textarea>
                                </div>
                                </div>



                            </div>
                            <div className="modal-footer">
<button
  type="button"
  className="btn-btn-secondary"
  onClick={() => setshowmodal(false)}>
  Close
</button>                               
 <button type="button" className="btn-btn-primary" onClick={handlebutton}>ADD Product
                                    
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="product-grid">
                {currentProduct.map((product,index) => (
                    <div className="card" key={product.id}>
                        <h5 className="Women-Watch">{product.title}</h5>

                        <img src={product.image} className="card-img-top" alt="not available" />
                        <div className="card-body">
                            <h3 className="price"> ₹{product.price}</h3>
                            <p className="card-text">{product.description} </p>
                            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                            <button className="view"onClick={()=>navigate(`/viewproduct/${product.id}`)} >
                                View Product</button>
                            <div className="buttons">
                                <button className="edit" onClick={()=> editproduct(product)} >Edit</button>
               <button
    className="delete"
    onClick={() => {
        setDeleteId(product.id);
        setShowDeleteModal(true);
    }}
>
    Delete
</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


<nav aria-label="Page navigation">
  <ul className="pagination my-pagination">

    {/* Previous */}
    <li className="page-item">
      <button
        className="page-link"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>
    </li>

    {/* Page 1 */}
    <li className="page-item">
      <button
        className={`page-link ${currentPage === 1 ? "active-button" : ""}`}
        onClick={() => setCurrentPage(1)}
      >
        1
      </button>
    </li>

    {/* Page 2 */}
    <li className="page-item">
      <button
        className={`page-link ${currentPage === 2 ? "active-button" : ""}`}
        onClick={() => setCurrentPage(2)}
      >
        2
      </button>
    </li>

    {/* Page 3 */}
    <li className="page-item">
      <button
        className={`page-link ${currentPage === 3 ? "active-button" : ""}`}
        onClick={() => setCurrentPage(3)}
      >
        3
      </button>
    </li>

    {/* Next */}
    <li className="page-item">
      <button
        className="page-link"
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        &raquo;
      </button>
    </li>

  </ul>
</nav>


            <Footer />


            {showEditModal && (
    <div className="modal-fade">

        <div className="modal-dialog">

            <div className="modal-content">

                <div className="modal-header">
                    <h1 className="modal-title">
                        EDIT PRODUCT
                    </h1>
                </div>

                <div className="modal-body">

                    <div className="mb-3">
                        <label className="form-label">
                            Title
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={editTitle}
                            onChange={(e) =>
                                setEditTitle(e.target.value)
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Price
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            value={editPrice}
                            onChange={(e) =>
                                setEditPrice(e.target.value)
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Category
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={editCategory}
                            onChange={(e) =>
                                setEditCategory(e.target.value)
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Image URL
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={editImage}
                            onChange={(e) =>
                                setEditImage(e.target.value)
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Description
                        </label>

                        <textarea
                            className="form-control"
                            rows="3"
                            value={editDescription}
                            onChange={(e) =>
                                setEditDescription(e.target.value)
                            }
                        />
                    </div>

                </div>

                <div className="modal-footer">

                    <button
                        type="button"
                        className="btn-btn-secondary"
                        onClick={() => setShowEditModal(false)}
                    >
                        CLOSE
                    </button>

                    <button
                        type="button"
                        className="btn-btn-primary"
                onClick={() => updatproduct(editId)}
                    >
                        UPDATE PRODUCT
                    </button>

                </div>

            </div>

        </div>

    </div>
)}

{/* 
{showViewModal && selectedProduct && (
    <div className="modal-fade">

        <div className="modal-dialog">

            <div className="modal-content">

                <div className="modal-header">
                    <h1>PRODUCT DETAILS</h1>
                </div>

                <div className="modal-body">

                    <img
                        src={selectedProduct.image}
                        alt={selectedProduct.title}
                        style={{ width: "200px" }}
                    />

                    <h3>{selectedProduct.title}</h3>

                    <h4>₹{selectedProduct.price}</h4>

                    <p>
                        <strong>Category:</strong>{" "}
                        {selectedProduct.category}
                    </p>

                    <p>
                        {selectedProduct.description}
                    </p>

                </div>

                <div className="modal-footer">

                    <button
                        className="btn btn-secondary"
                        onClick={() => setShowViewModal(false)}
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>

    </div>
)} */}
{showDeleteModal && (
    <div className="delete-modal-overlay">

        <div className="delete-modal">

            <h3>Are you sure?</h3>

            <p>Are you sure you want to delete this product?</p>

            <div className="modal-buttons">

                <button
                    className="no-btn"
                    onClick={() => setShowDeleteModal(false)}
                >
                    No
                </button>

                <button
                    className="yes-btn"
                    onClick={() => {
                        deleteproduct(deleteId);
                        setShowDeleteModal(false);
                    }}
                >
                    Yes
                </button>

            </div>

        </div>

    </div>
)}

        </>
    )
}
export default Products;