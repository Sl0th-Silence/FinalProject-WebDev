/*
Route: ("/create-user")

if the user is new and wants to join, the user will
click on the link on the login page to go to
ROUTE:("/create-user"). this route will load a 
new page that displays the same login component 
with a different title and button message.
Once the user is created, the form will 
display a confirmation message. Also, the user 
must navigate back to the login page on Route("/") 
to log in with the new user. 

**SEE PHOTOS ON B.B.
*/

//Brynn Landry

//Create User Page
import FormComponent from "./FormComponent";
import axios from "axios";
import { useState } from "react";

export default function CreateUserPage() {
  //states
  //form data state
  const [formData, setFormData] = useState({ username: "", password: "" });
  //post response state
  const [postResponse, setPostResponse] = useState("");

  //handlers
  //on change handler to update form data state
  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };
  //on submit handler to post form data to server
  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3000/create-user", {
        ...formData,
      });
      setPostResponse(response.data.message);

      // if postResponse === successful, show <Link to="/">Go To Login</Link>
      // not sure if logic belongs here or elsewhere...
    } catch (error) {
      setPostResponse(error.response.data.message || "No Sir!");
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleRegister();
    setFormData({ username: "", password: "" });
  };

  return (
    <div>
      <h2>Create New User</h2>
      <FormComponent
        formData={formData}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        currentPage="create-user"
        nextPage="login"
        postResponse={postResponse}
      />
    </div>
  );
}
