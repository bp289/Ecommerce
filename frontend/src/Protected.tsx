import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
type Props = {
  children: JSX.Element;
};

const Protected = ({ children }: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
      navigate("/register");
    }
  });

  return children;
};

export default Protected;
