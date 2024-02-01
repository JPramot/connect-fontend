import { useState, createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, serLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        serLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        const result = await axios.get("http://localhost:8000/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(result.data.user);
        setUser(result.data.user);
      } catch (err) {
        console.log(err);
      } finally {
        serLoading(false);
      }
    };
    run();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
export default AuthContext;
