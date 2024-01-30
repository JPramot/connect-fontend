import { useState } from "react";
import RegisterForm from "./layouts/RegisterForm";
import Login from "./layouts/Login";
import useAuth from "./hooks/useAuth";
import AppRouter from "./routes/AppRouter";

function App() {
  const { user, setUser } = useAuth();
  const [check, setcheck] = useState(true);
  return (
    <div
      className="min-h-screen flex flex-col gap-3"
      data-theme={check ? "cupcake" : "dark"}
    >
      <AppRouter />
    </div>
  );
}

export default App;
