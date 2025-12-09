/*
ROUTE: ("/main")

this is the main app route. once the username is authenticated,
the page will display the InventoryCards component. 
Page should show:
-> EDIT, DELETE and ADD NEW PRODUCT buttons if(username === "admin")
Otherwise, these buttons should NOT appear if you are any other user.

You need to add a new navigation bar at the top of the page that
includes a welcome message with:
-> the currently logged-in username
-> a logout button
-> a link to the login page

When the user logs out, the page will navigate to ROUTE("/")
and then return to the login page.

Additionally, the add and edit forms,which used to appear at the top 
of the app will be moved to their respective pages. A new button will 
be added to direct users to ROUTE("/add-product"), and the edit buttons
should navigate to ROUTE("/edit-product"). **SEE SCREENSHOT ON B.B.

*/

import { useState, useEffect } from "react";
import CartContainer from "./CartContainer";
import ProductsContainer from "./ProductsContainer";
import NavBar from "./NavBar";
import axios from "axios";
import ProductForm from "./ProductForm";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function GroceriesAppContainer() {
  //Set navigate
  const navigate = useNavigate();

  /////////// States ///////////
  const [productQuantity, setProductQuantity] = useState();
  const [cartList, setCartList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [postResponse, setPostResponse] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // FINAL STATES //
  // JAY //

  //TODO Check if user is a user or Admin
  //Maybe we could add another section per user?
  //Or maybe its just a naming convention?

  const [currentUser, setCurrentUser] = useState(() => {
    //We need to grab the cookie and decode it
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

  //////////useEffect////////
  //Check user
  useEffect(() => {
    if (!currentUser) {
      navigate("/not-authorized");
    }
  }, []);

  useEffect(() => {
    handleProductsFromDB();
  }, [postResponse]);

  ////////Handlers//////////
  const initialProductQuantity = (prods) =>
    prods.map((prod) => {
      return { id: prod.id, quantity: 0 };
    });

  const handleProductsFromDB = async () => {
    try {
      await axios.get("http://localhost:3000/products").then((result) => {
        setProductList(result.data);
        setProductQuantity(initialProductQuantity(result.data));
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    if (isEditing) {
      e.preventDefault();
      handleUpdateProduct(formData._id);
      setIsEditing(false);
      setFormData({
        productName: "",
        brand: "",
        image: "",
        price: "",
      });
    } else {
      e.preventDefault();
      try {
        await axios
          .post("http://localhost:3000/add-product", formData)
          .then((result) => {
            setPostResponse(result.data);
          });
        setFormData({
          productName: "",
          brand: "",
          image: "",
          price: "",
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleEditProduct = (product) => {
    setFormData({
      productName: product.productName,
      brand: product.brand,
      image: product.image,
      price: product.price,
      _id: product._id,
    });
    setIsEditing(true);
    setPostResponse("");
  };

  const handleUpdateProduct = async (productId) => {
    try {
      await axios
        .patch(`http://localhost:3000/products/${productId}`, formData)
        .then((result) => {
          setPostResponse(result.data);
        });
      setFormData({
        productName: "",
        brand: "",
        image: "",
        price: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  const handleRemoveQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId && product.quantity > 0) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios
        .delete(`http://localhost:3000/products/${productId}`)
        .then((result) => {
          console.log(result);
          setPostResponse(
            `${result.data.productName} deleted\n with id: ${result.data.id}`
          );
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddToCart = (productId) => {
    const product = productList.find((product) => product.id === productId);
    const pQuantity = productQuantity.find(
      (product) => product.id === productId
    );
    const newCartList = [...cartList];
    const productInCart = newCartList.find(
      (product) => product.id === productId
    );
    if (productInCart) {
      productInCart.quantity += pQuantity.quantity;
    } else if (pQuantity.quantity === 0) {
      alert(`Please select quantity for ${product.productName}`);
    } else {
      newCartList.push({ ...product, quantity: pQuantity.quantity });
    }
    setCartList(newCartList);
  };

  const handleRemoveFromCart = (productId) => {
    const newCartList = cartList.filter((product) => product.id !== productId);
    setCartList(newCartList);
  };

  const handleClearCart = () => {
    setCartList([]);
  };

  //LOG OFF
  // JAY

  //Handle log off
  const handleLogOff = () => {
    Cookies.remove("jwt-authorize");
    setCurrentUser(null);
    navigate("/");
  };

  console.log(currentUser);

  /////////Renderer
  return (
    <div>
      <NavBar
        quantity={cartList.length}
        handleLogOff={handleLogOff}
        currentUser={currentUser}
      />
      <div className="GroceriesApp-Container">
        <ProductForm
          handleOnSubmit={handleOnSubmit}
          postResponse={postResponse}
          handleOnChange={handleOnChange}
          formData={formData}
          isEditing={isEditing}
        />
        <ProductsContainer
          currentUser={currentUser} //Send the user to the products for admin powers
          products={productList}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          productQuantity={productQuantity}
          handleEditProduct={handleEditProduct}
          handleDeleteProduct={handleDeleteProduct}
        />
        <CartContainer
          cartList={cartList}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleClearCart={handleClearCart}
        />
      </div>
    </div>
  );
}
