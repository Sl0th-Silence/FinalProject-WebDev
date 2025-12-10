import { Link } from "react-router-dom";

export default function NavBar({ quantity, handleLogOff, currentUser }) {
  console.log("NavBar currentUser:", currentUser);

  return (
    <nav className="NavBar">
      <div className="NavDiv NavUser">
        <h3>
          Hello,{" "}
          {currentUser?.isAdmin === true
            ? " Admin " + currentUser?.username
            : currentUser?.username}{" "}
        </h3>
        <button onClick={() => handleLogOff()}>LogOff</button>
      </div>
      <div className="NavDiv NavTitle" textAlign="center">
        <h2>Groceries App 🍎</h2>

        {/*******************************************************************************/}
        {/*********** NEED TO ALIGN BUTTON TO CENTER BELOW GROCERIES APP TITLE **********/}
        {/*******************************************************************************/}
        {currentUser?.isAdmin === true && (
          <Link to="/add-product">
            <button> Add New Product </button>
          </Link>
        )}
      </div>
      <div className="NavDiv NavCart">
        <img
          src={
            quantity > 0
              ? "src/assets/cart-full.png"
              : "src/assets/cart-empty.png"
          }
        />
      </div>
    </nav>
  );
}
