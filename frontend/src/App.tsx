import Protected from "./Protected";
import "./App.css";

import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";

import ProductList from "./pages/ProductList";
import { Home } from "./pages/Home";

const router = createBrowserRouter([{ path: "*", Component: Root }]);
function Root() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/userListing"
        element={
          <Protected>
            <ProductList />
          </Protected>
        }
      />
      <Route path="/signIn*" element={<Login />} />
      <Route path="/register*" element={<Register />} />
      <Route
        path="/update/:id"
        element={
          <Protected>
            <UpdateProduct />
          </Protected>
        }
      />
      <Route
        path="/add*"
        element={
          <Protected>
            <AddProduct />
          </Protected>
        }
      />
    </Routes>
  );
}
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
