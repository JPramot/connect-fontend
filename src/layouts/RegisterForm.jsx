import React from "react";
import { useState } from "react";
import axios from "axios";

function RegisterForm() {
  const [input, setInput] = useState({
    s_code: "",
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputHandle = (e) => {
    setInput((cur) => ({ ...cur, [e.target.name]: e.target.value }));
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:8000/auth/register",
        input
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Register new student</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={submitHandle}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Student Code</span>
              </label>
              <input
                type="text"
                placeholder="Student code"
                className="input input-bordered"
                required
                name="s_code"
                value={input.s_code}
                onChange={inputHandle}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Firstname</span>
              </label>
              <input
                type="text"
                placeholder="Firstname"
                className="input input-bordered"
                required
                name="firstName"
                value={input.firstName}
                onChange={inputHandle}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">E-mail</span>
              </label>
              <input
                type="email"
                placeholder="E-mail"
                className="input input-bordered"
                // required
                name="email"
                value={input.email}
                onChange={inputHandle}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                required
                name="password"
                value={input.password}
                onChange={inputHandle}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered"
                required
                name="confirmPassword"
                value={input.confirmPassword}
                onChange={inputHandle}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
