import { Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

type Props = {};

const Login = (props: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/add");
    }
  });
  return (
    <div>
      <Header />
      <Typography variant="h1">Login Page</Typography>
    </div>
  );
};

export default Login;
