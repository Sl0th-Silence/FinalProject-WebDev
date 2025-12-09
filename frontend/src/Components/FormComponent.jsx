import { Link, useNavigate } from "react-router-dom";

//Brynn Landry

export default function FormComponent({
  setFormData,
  formData,
  handleOnChange,
  handleOnSubmit,
  nextPage,
  currentPage,
  postResponse,
}) {
  const navigate = useNavigate();
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="username">UserName:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleOnChange}
        />
        <br />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleOnChange}
        />
        <br />
        <br />
        {/* Added checkbox for Admin */}
        <label htmlFor="isAdmin">
          {currentPage === "login" ? "" : "Admin"}
        </label>
        <input
          type={currentPage === "login" ? "hidden" : "checkbox"}
          name="isAdmin"
          checked={formData.isAdmin}
          onChange={(e) =>
            setFormData({ ...formData, isAdmin: e.target.checked })
          }
        />
        <br />
        <br />
        <button type="submit">
          {/* {subBtn === "Login" ? currentPage === "login" : "Create User"} */}
          {currentPage === "login" ? "login" : "Create User"}
        </button>
      </form>
      <p>{postResponse}</p>
      {/*
      <button onClick={() => navigate(`/${nextPage}`)}>
        {nextPage === "" ? "Go to Login Page" : "Go to Create User Page"}
      </button>
      */}
    </div>
  );
}

//need to update nav button to match photos on B.B.
