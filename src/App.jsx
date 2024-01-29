import { useState } from "react";
import RegisterForm from "./layouts/RegisterForm";

function App() {
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
        onClick={() => setcheck(!check)}
      />
      <hr />
      <RegisterForm />
    </div>
  );
}

export default App;
