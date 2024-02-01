import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
// import { useState, useEffect } from "react";

const guestNav = [
  { to: "/", text: "Log in" },
  { to: "/register", text: "Register" },
];

const teacherNav = [
  { to: "/", text: "Home (T)" },
  { to: "/new", text: "New Homework" },
];

const studentNav = [
  { to: "/", text: "Home (S)" },
  { to: "/profile", text: "Profile" },
];

export default function Header() {
  const { user, logout } = useAuth();
  // const navgate = useNavigate();

  const finalNav = !user?.role
    ? guestNav
    : user?.role === "teacher"
    ? teacherNav
    : studentNav;

  const logoutHandle = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        {/* <Link to="/login">Super Homewore</Link> */}
        <p className="btn btn-ghost text-xl">Hi, {user?.firstName}</p>
        <input
          type="checkbox"
          value="cupcake"
          className="toggle theme-controller"
        />
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {finalNav.map((el, id) => (
            <li key={id}>
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
          {user?.role ? (
            <li>
              <Link to="#" onClick={logoutHandle}>
                Log out
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
