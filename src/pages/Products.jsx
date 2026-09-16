import {useCallback, useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../styles/products.css';
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Context/auth';
import api from '../Api';
import {useForm} from 'react-hook-form';
import {yupResolver } from '@hookform/resolvers/yup';
import *as yup from 'yup';

const schema =yup.object().shape({
    title:yup.string().required('title is required'),
    price:yup.number().required('price is required ').positive().typeError('price must be positive value'),
    cateogary:yup.string().required('cateogary is required'),
    imageurl:yup.mixed().required("image is required")
    .test("fileExist","please upload file",(value)=>{
        return value &&value.length>0;
    }).test("fileType", "Only jpg, jpeg or png files are allowed", (value) => {
      return (
        value &&
        value.length > 0 &&
        ["image/jpeg", "image/png", "image/jpg"].includes(value[0]?.type)
      );
    }),
    textarea:yup.string().required("it is required").min(10,"must be 10 letters")
})


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
  

    const [products, setProducts] = useState([]);
    const [showmodal, setshowmodal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);

    const limit = 8;
    const skip = (currentPage - 1) * limit;
    const totalPages = Math.ceil(total / limit);

    
const getProducts = useCallback( async () => {
    try {
        const token = localStorage.getItem('token');

        const response = await api.get(
            `/api/products/listallproduct?limit=${limit}&skip=${skip}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("PRODUCTS:", response.data);

        setProducts(response.data.data);
        setTotal(response.data.total);

    } catch (error) {
        console.log("GET PRODUCTS ERROR:", error);
        console.log("SERVER ERROR:", error.response?.data);
    }
}, [skip]);
    useEffect(() => {
    getProducts();
}, [getProducts]);
    const navigate = useNavigate();
    const {user}=useAuth();
    const role = user?.role;

        const{
            register,
            handleSubmit,
            formState:{errors}
        }=useForm({resolver:yupResolver(schema)})

        const onSubmit = async (data) => {
    const token = localStorage.getItem('token');

    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('price', data.price);
    formData.append('cateogary', data.cateogary);
    formData.append('image', data.imageurl[0]);
    formData.append('description', data.textarea);

    try {
        await api.post(
            '/api/products/addproduct',
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        alert("Product added successfully");

        setshowmodal(false);

        // Get the newly added products
        getProducts();

    } catch (error) {
        console.log("ADD PRODUCT ERROR:", error);
        console.log("RESPONSE:", error.response?.data);

        alert(
            error.response?.data?.message ||
            "Product is not added"
        );
    }
};
    


    // const [products, setProducts] = useState([])
    // const [showmodal, setshowmodal] = useState(false)

const [editId, setEditId] = useState(null);
const [editTitle, setEditTitle] = useState("");
const [editPrice, setEditPrice] = useState("");
const [editCategory, setEditCategory] = useState("");
const [editImage, setEditImage] = useState("");
const [editDescription, setEditDescription] = useState("");
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleteId, setDeleteId] = useState(null);



useEffect(()=>{
    if(!user){
        navigate("/products");
    }
})
       

//    const addedproduct =() =>{
//    const product = { title: 'New Product', price: 29.99 };
// axios.post('https://fakestoreapi.com/products', product)
//   .then(response => setaddproduct(response.data));

//    };

const deleteproduct = async (id) => {
    try {
        const token = localStorage.getItem("token");

        console.log("DELETE TOKEN:", token);
        console.log("DELETE ID:", id);

        await api.delete(
            `/api/products/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        toast.success("Product deleted successfully");

        setShowDeleteModal(false);
        setDeleteId(null);

        getProducts();

         } catch (error) {
        console.log("DELETE PRODUCT ERROR:", error);
        console.log("SERVER ERROR:", error.response?.data);

        toast.error(
            error.response?.data?.message ||
            "Delete failed"
        );
    }
};


const updatproduct = async (id) => {
    try {
        const token = localStorage.getItem("token");

        const updatedproduct = {
            title: editTitle,
            price: Number(editPrice),
            cateogary: editCategory,
            description: editDescription
        };

        const response = await api.put(
            `/api/products/${id}`,
            updatedproduct,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log("UPDATED PRODUCT:", response.data);

        toast.success("Product updated successfully");

        setShowEditModal(false);

        getProducts();

    } catch (error) {
        console.log("UPDATE PRODUCT ERROR:", error);
        console.log("SERVER ERROR:", error.response?.data);

        toast.error(
            error.response?.data?.message ||
            "Update failed"
        );
    }
};


const editproduct = (product) => {
    setEditId(product._id);

    setEditTitle(product.title);
    setEditPrice(product.price);
    setEditCategory(product.cateogary);
    setEditImage(product.image);
    setEditDescription(product.description);

    setShowEditModal(true);
};





    return (

        <>
            <Navbar />
            <h1 className="product-head">ALL PRODUCTS</h1>
            {role === "seller" &&(
            <button className="add-button" onClick={() => setshowmodal(true)}>ADD PRODUCT
            </button>
            )}
            



{showmodal && (
  <div
    className="modal-fade"
    id="exampleModal"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">

        <div className="modal-header">
          <h1 className="modal-title">
            ADD PRODUCT
          </h1>
        </div>

        <div className="modal-body">

          <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >

            {/* Title */}
            <div className="mb-3">
              <div className="text">
                <label htmlFor="title" className="form-label">
                  Title
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="title"
                  {...register("title")}
                />

                <p className="error">
                  {errors.title?.message}
                </p>
              </div>
            </div>


            {/* Price */}
            <div className="mb-3">
              <div className="text">
                <label htmlFor="price" className="form-label">
                  Price
                </label>

                <input
                  type="number"
                  className="form-control"
                  id="price"
                  {...register("price")}
                />

                <p className="error">
                  {errors.price?.message}
                </p>
              </div>
            </div>


            {/* Category */}
            <div className="mb-3">
              <div className="text">
                <label htmlFor="cateogary" className="form-label">
                  Cateogary
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="cateogary"
                  {...register("cateogary")}
                />

                <p className="error">
                  {errors.cateogary?.message}
                </p>
              </div>
            </div>


            {/* Image */}
            <div className="mb-3">
              <div className="text">
                <label htmlFor="imageurl" className="form-label">
                  Image
                </label>

                <input
                  type="file"
                  className="form-control"
                  id="imageurl"
                  accept="image/jpeg,image/png,image/jpg"
                  {...register("imageurl")}
                />

                <p className="error">
                  {errors.imageurl?.message}
                </p>
              </div>
            </div>


            {/* Description */}
            <div className="mb-3">
              <div className="text">
                <label htmlFor="textarea" className="form-label">
                  Description
                </label>

                <textarea
                  className="form-control"
                  id="textarea"
                  rows="3"
                  {...register("textarea")}
                ></textarea>

                <p className="error">
                  {errors.textarea?.message}
                </p>
              </div>
            </div>


            {/* Footer */}
            <div className="modal-footer">

              <button
                type="button"
                className="btn-btn-secondary"
                onClick={() => setshowmodal(false)}
              >
                Close
              </button>

              <button
                type="submit"
                className="btn-btn-primary"
              >
                ADD Product
              </button>

            </div>

          </form>

        </div>

      </div>
    </div>
  </div>
)}

     <div className="product-grid">
    {products.map((product) => (
        <div className="card" key={product._id}>

            <h5 className="Women-Watch">
                {product.title}
            </h5>

            <img
    src={
        product.image
            ? `${process.env.REACT_APP_BACKEND_URL}/${product.image.replaceAll("\\", "/")}`
            : ""
    }
    className="card-img-top"
    alt={product.title}
/>

            <div className="card-body">
                <h3 className="price">
                    ₹{product.price}
                </h3>

                <p className="card-text">
                    {product.description}
                </p>

                <button
                    className="view"
                    onClick={() =>
                        navigate(`/viewproduct/${product._id}`)
                    }
                >
                    View Product
                </button>

                <div className="buttons">
                    {role ==="seller" &&
                    <button
                        className="edit"
                        onClick={() => editproduct(product)}
                    >
                        Edit
                    </button>
                    }
                    
                    {role ==="seller" &&
                     <button
                            className="delete"
                            onClick={() => {
                            setDeleteId(product._id);
                            setShowDeleteModal(true);
                        }}
                    >
                        Delete
                    </button>
                    }
                   
                </div>
            </div>
        </div>
    ))}
</div>

{/* Pagination */}
<div className="pagination pb-5">

    <button
        className="btn me-2"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(prev => prev - 1)}
    >
        Prev
    </button>

    <span>
        <strong>
            Page {currentPage} of {totalPages}
        </strong>
    </span>

    <button
        className="btn ms-2"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(prev => prev + 1)}
    >
        Next
    </button>

</div>


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