import { useState, createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
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
      }
    };
    run();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
export default AuthContext;
