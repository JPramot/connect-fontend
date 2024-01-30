import { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

function Login() {
  const [input, setInput] = useState({
    code: "",
    password: "",
  });
  const { setUser } = useAuth();

  const inputHandle = (e) => {
    setInput((cur) => ({ ...cur, [e.target.name]: e.target.value }));
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const codeFor = input.code.toLocaleLowerCase().startsWith("t")
        ? "t_code"
        : "s_code";
      const data = { [codeFor]: input.code, password: input.password };
      const result = await axios.post("http://localhost:8000/auth/login", data);
      console.log(result.data);
      localStorage.setItem("token", result.data.token);
      const rs1 = await axios.get("http://localhost:8000/auth/me", {
        headers: { Authorization: `Bearer ${result.data.token}` },
      });
      setUser(rs1.data.user);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Login</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={submitHandle}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Code</span>
              </label>
              <input
                type="text"
                placeholder="Code"
                className="input input-bordered"
                required
                name="code"
                value={input.code}
                onChange={inputHandle}
                pattern="^[st]\d{3}$"
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
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
