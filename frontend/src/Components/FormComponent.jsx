import { useNavigate } from "react-router-dom";

//Brynn Landry

export default function FormComponent({
  formData,
  handleOnChange,
  handleOnSubmit,
  nextPage,
  postResponse,
}) {
  const navigate = useNavigate();
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label html="username">UserName:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleOnChange}
        />
        <br />
        <label html="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleOnChange}
        />
        <br />
        <button>
          {subBtn === "Login" ? currentPage === "login" : "Create User"}
        </button>
      </form>
      <p>{postResponse}</p>

      <button onClick={() => navigate(`/${nextPage}`)}>
        {nextPage === "" ? "Go to Login Page" : "Go to Create User Page"}
      </button>
    </div>
  );
}

//need to update nav button to match photos on B.B.
