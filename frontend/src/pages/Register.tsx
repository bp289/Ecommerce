import { Typography, Input, Button, Checkbox } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

type Props = {};

const Register = (props: Props) => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/");
    }
  });

  const SignUp = async () => {
    const details = { name: userName, password, email };
    try {
      const result = await fetch("http://127.0.0.1:8000/api/register", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(details),
      });

      const resultJson = await result.json();
      localStorage.setItem("user-info", JSON.stringify(resultJson));
      navigate("/");
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
          <Typography variant="h1">Register</Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to register.
          </Typography>
        </div>
        <form className="mt-8 mb-2 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Input
              crossOrigin={undefined}
              value={userName}
              type="text"
              label="Username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            ></Input>

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
          <div className="flex">
            <Checkbox crossOrigin={undefined} />
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <Link
                to="/"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </Link>
            </Typography>
          </div>
          <Button className="mt-6" fullWidth onClick={SignUp}>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/" className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </div>
    </>
  );
};

export default Register;
