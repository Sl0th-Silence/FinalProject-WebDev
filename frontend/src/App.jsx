import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
// import products from "./data/products"; <-- this was when products data was stored locally...
import GroceriesAppContainer from "./Components/GroceriesAppContainer";
import PageNotFound from "./Components/PageNotFound";
import NotAuthorizedPage from "./Components/NotAuthorizedPage";
import CreateUserPage from "./Components/CreatePage";
import LoginPage from "./Components/LoginPage";
import ProductFormPage from "./Components/ProductFormPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/add-product" element={<ProductFormPage />} />
          <Route path="/edit-product/:id" element={<ProductFormPage />} />
          {/* PATHS above this LINE - only accessible when logged in as isAdmin===true */}
          <Route path="/main" element={<GroceriesAppContainer />} />
          {/* ALL PATHS above this LINE - only accesible when logged in */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/create-user" element={<CreateUserPage />} />
          <Route path="/not-authorized" element={<NotAuthorizedPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

// SECRET PAGES, only logged in admin
// USERNAME === "admin":
// "/add-product" -> ProductFormPage.jsx
// "/edit-product" -> ProductFormPage.jsx
// ----> FilterForm.jsx
