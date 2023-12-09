import React from "react";
import Protected from "./Protected";
import Home from "./pages/Home";
import "./App.css";
import Header from "./components/Header";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProduct from "./components/Products/AddProduct";
import UpdateProduct from "./components/Products/UpdateProduct";

const router = createBrowserRouter([{ path: "*", Component: Root }]);
function Root() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signIn*" element={<Login />} />
      <Route path="/register*" element={<Register />} />
      <Route
        path="/update*"
        element={
          <Protected>
            <UpdateProduct />
          </Protected>
          // <UpdateProduct />
        }
      />
      <Route
        path="/add*"
        element={
          <Protected>
            <AddProduct />
          </Protected>
          // <AddProduct />}
        }
      />
    </Routes>
  );
}
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
