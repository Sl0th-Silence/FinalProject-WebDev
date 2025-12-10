/*

ROUTE:("/add-product"):
This route will display the InventoryForm/ProductForm component. 

The inputs should be empty to add information 
about a new product to be added.
There will be a button to add a new product and a link
to return to ROUTE("/main"). Once a new product is added, 
a confirmation message is displayed.

-----------------------------------------------------------
ROUTE:("/edit-product")
This route will display the InventoryForm/ProductForm component.

The inputs should be filled out with the product information
that needs to be edited. 

Also, this form will include a save-to-inventory button with
the product name and a back-to-main-page link. 

**SEE BlackBoard for photos...

*/

// This page is used for both adding and editing products
// Only accessible to admin users (private route)

//Ridhi Bhandula

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function ProductFormPage() {
  const navigate = useNavigate();

  // Get the current user from the JWT cookie
  const [currentUser] = useState(() => {
    const jwtToken = Cookies.get("jwt-authorize");
    if (!jwtToken) {
      return "";
    }
    try {
      const jwtDecodedToken = jwtDecode(jwtToken);
      return {
        username: jwtDecodedToken.username,
        isAdmin: jwtDecodedToken.isAdmin,
      };
    } catch {
      return "";
    }
  });

  // Redirect to not-authorized page if user is not admin
  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) {
      //if (!currentUser || currentUser.username !== "admin") {
      navigate("/not-authorized");
    }
  }, [currentUser, navigate]);

  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });

  const [postResponse, setPostResponse] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Reset form
  const handleResetForm = () => {
    setFormData({
      productName: "",
      brand: "",
      image: "",
      price: "",
    });
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Load product data to edit
  const handleOnEdit = async (id) => {
    try {
      const result = await axios.get(`http://localhost:3000/products/${id}`);

      setFormData({
        productName: result.data.productName,
        brand: result.data.brand,
        image: result.data.image,
        price: result.data.price,
        _id: result.data._id,
      });

      setIsEditing(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Update product
  const handleOnUpdate = async (id) => {
    try {
      const result = await axios.patch(
        //////////////////////////////////////////////////
        /////////////////////////////////////////////////
        ////// problem is: I don't know how to shuffle over ${id}
        `http://localhost:3000/products/${id}`,
        formData
      );

      setPostResponse(result.data.message || "Product updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await handleOnUpdate(formData._id);
        handleResetForm();
        setIsEditing(false);
      } else {
        const result = await axios.post(
          "http://localhost:3000/add-product",
          formData
        );
        setPostResponse(result.data.message || "Product added!");
        handleResetForm();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <ProductForm
        handleOnSubmit={handleOnSubmit}
        postResponse={postResponse}
        handleOnChange={handleOnChange}
        formData={formData}
        isEditing={isEditing}
        handleOnEdit={handleOnEdit}
      />
      <Link to="/main">Go to Home Page</Link>
    </div>
  );
}
