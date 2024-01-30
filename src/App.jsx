import { useState } from "react";
import RegisterForm from "./layouts/RegisterForm";
import Login from "./layouts/Login";
import useAuth from "./hooks/useAuth";

function App() {
  const { user, setUser } = useAuth();
  const [check, setcheck] = useState(false);
  return (
    <div
      className="min-h-screen flex flex-col gap-3"
      data-theme={check ? "cupcake" : "dark"}
    >
      <h1 className="text-3xl font-bold underline ">Hello world!</h1>
      <input
        type="checkbox"
        className="toggle"
        checked={check}
        onChange={() => setcheck(!check)}
      />
      <hr />
      {/* <RegisterForm /> */}
      <Login />
    </div>
  );
}

export default App;
