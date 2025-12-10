/* 
if credentials are valid, the page will 
automatically navigate to ROUTE("/main"), 
where the main GroceriesApp exists.

if credentials are invalid, the form should display a 
message that the username and password are incorrect. 

if the username does not exist in the database, display message. 

*/
import { Link, useNavigate } from "react-router-dom";
import FormComponent from "./FormComponent";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function LoginPage() {
  // states
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    isAdmin: false,
  });
  const [postResponse, setPostResponse] = useState("");

  // navigate
  const navigate = useNavigate();

  // handlers
  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  /* const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3000/create-user", {
        ...formData,
      });
      setPostResponse(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }; */

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/main", {
        ////////////////// Z-Nov19@2h30m-http.../login NOT:/main ///// testing theory
        ...formData,
      });
      setPostResponse(response.data.message);
      if (response.status === 201) {
        //We also need to set the cookies!
        Cookies.set("jwt-authorize", response.data.token);
        navigate("/main");
      }
    } catch (error) {
      console.log(error);
      setPostResponse(error.response.data.message || "Login Failed");
    }
  };

  /* -- followed along, Z added to HomePage.jsx... not LOGIN... leaving here in case it's needed elsewhere

  const handleOnSubmit = (e) => {
    e.preventDefault(); // don't want the page to refresh

    console.log(formData); // TEST... something not sending...

    handleRegister();
    setFormData({ username: "", password: "" });
  };
  
  */

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleLogin();
    setFormData({ username: "", password: "", isAdmin: false });
  };

  return (
    <div>
      <h1>Groceries App</h1>
      <br />
      <FormComponent
        formData={formData}
        setFormData={setFormData}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        nextPage="create-user"
        // currentPage = Z(Nov 19) 1h21(create-user) & 1h32(loginPage)
        currentPage="login"
        postResponse={postResponse}
      />
      <p>
        Not a member yet?
        <Link to="create-user"> CLICK HERE </Link>
        to join!
      </p>
    </div>
  );
}
