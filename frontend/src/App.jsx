import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import products from "./data/products";
import GroceriesAppContainer from "./Components/GroceriesAppContainer";
import PageNotFound from "./Components/PageNotFound";
import NotAuthorizedPage from "./Components/NotAuthorizedPage";
import CreateUserPage from "./Components/CreatePage";
import LoginPage from "./Components/LoginPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/*<GroceriesAppContainer products={products} /> */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/create-user" element={<CreateUserPage />} />
          <Route path="/not-authorized" element={<NotAuthorizedPage />} />
          <Route path="/main" element={<GroceriesAppContainer />} />
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
