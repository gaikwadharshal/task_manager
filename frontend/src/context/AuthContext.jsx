import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ New loading state

  const login = async (credentials) => {
    const { data } = await API.post("/auth/login", credentials);
    setUser(data.user); // ✅ Immediately sets user
  };

  const register = async (userData) => {
    await API.post("/auth/register", userData);
  };

  const logout = async () => {
    await API.post("/auth/logout");
    setUser(null);
  };

  const checkAuth = async () => {
    try {
      const { data } = await API.get("/auth/me");
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false); // ✅ Ensure loading is false whether success or fail
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
