import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

type Props = {};

const NavList = (): JSX.Element => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user-info")
    ? JSON.parse(localStorage.getItem("user-info")!)
    : undefined;

  function signOut() {
    localStorage.removeItem("user-info");
    navigate("/signIn");
  }
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 [&>&>*]:text-red">
      {user ? (
        <>
          <Typography variant="h6" className="mr-4 cursor-pointer py-1.5">
            Hello, {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
          </Typography>

          <Typography as="li" variant="small" color="blue-gray">
            <Link
              to="/"
              className="flex items-center hover:text-blue-500 transition-colors "
            >
              Product Listing
            </Link>
          </Typography>
          <Typography as="li" variant="small" color="blue-gray">
            <Link
              to="/add"
              className="flex items-center hover:text-blue-500 transition-colors "
            >
              Add Items
            </Link>
          </Typography>
          <Typography as="li" variant="small" color="blue-gray">
            <Link
              to="/update"
              className="flex items-center hover:text-blue-500 transition-colors "
            >
              Update Items
            </Link>
          </Typography>
          <Menu>
            <MenuHandler>
              <Button>Account</Button>
            </MenuHandler>
            <MenuList>
              <MenuItem onClick={signOut}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </>
      ) : (
        <>
          <Button
            variant="gradient"
            size="sm"
            className="hidden lg:inline-block"
          >
            <Link to="/signIn">Sign in</Link>
          </Button>
          <Button variant="gradient" size="sm">
            <Link to="/register">Register</Link>
          </Button>
        </>
      )}
    </ul>
  );
};

const Header = (props: Props) => {
  return (
    <Navbar fullWidth={true} className="mx-auto px-6 py-3">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
          Home
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
