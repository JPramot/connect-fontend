import { useState } from "react";

import useAuth from "./hooks/useAuth";
import AppRouter from "./routes/AppRouter";

function App() {
  const { loading } = useAuth();
  const [check, setcheck] = useState(true);

  if (loading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }
  return (
    <div
      className="min-h-screen flex flex-col gap-3"
      // data-theme={check ? "cupcake" : "dark"}
    >
      <AppRouter />
    </div>
  );
}

export default App;
