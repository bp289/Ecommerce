import { Button, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

type Props = {};

const Login = (props: Props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/add");
    }
  });
  const SignIn = async () => {
    const details = { email, password };
    try {
      const result = await fetch("http://127.0.0.1:8000/api/signIn", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(details),
      });

      const resultJson = await result.json();
      localStorage.setItem("user-info", JSON.stringify(resultJson));
      navigate("/add");
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col w-full items-center mt-24">
        <div className="flex-grow [&>*]:mr-8">
          <Typography variant="h1">Sign in</Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Welcome back, Enter your details to sign in.
          </Typography>
        </div>
        <form className="mt-8 mb-2 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Input
              value={email}
              crossOrigin={undefined}
              size="lg"
              label="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <Input
              value={password}
              label="Password"
              crossOrigin={undefined}
              type="password"
              size="lg"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <Button className="mt-6" fullWidth onClick={SignIn}>
            Sign In
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
