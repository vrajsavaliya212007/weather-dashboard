import { createContext, useContext, useEffect, useRef, useState } from "react";
import api from "../services/axios";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const initialLoadStarted = useRef(false);

  const loadUser = async () => {
    try {
      setLoading(true);
      const response = await api.get("/auth/me");
      setUser(response.data?.user || null);
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error("Unable to load current user:", error);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      const token = response.data?.token;
      if (token) {
        localStorage.setItem("skycast_token", token);
      }
      setUser(response.data?.user || null);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (data) => {
    try {
      const response = await api.post("/auth/register", data);
      const token = response.data?.token;
      if (token) {
        localStorage.setItem("skycast_token", token);
      }
      setUser(response.data?.user || null);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await api.post("/auth/logout");
      localStorage.removeItem("skycast_token");
      setUser(null);
      return response.data;
    } catch (error) {
      localStorage.removeItem("skycast_token");
      setUser(null);
      throw error;
    }
  };

  const refreshUser = async () => {
    await loadUser();
  };

  useEffect(() => {
    if (initialLoadStarted.current) {
      return;
    }
    initialLoadStarted.current = true;
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        register,
        logout,
        loadUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};

export default AuthContext;
