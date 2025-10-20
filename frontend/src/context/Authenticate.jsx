import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    // ✅ First check localStorage for full user data
    const storedData = localStorage.getItem("ChatApp");
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setAuth(parsedData);
        return;
      } catch (err) {
        console.error("Error parsing stored data:", err);
        localStorage.removeItem("ChatApp");
      }
    }

    // ✅ Fallback to JWT decode if no localStorage
    const token = Cookies.get("jwt");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAuth({
          token,
          user: {
            id: decoded.userid,
            userid: decoded.userid
          }
        });
      } catch (err) {
        console.error("Invalid JWT:", err);
        Cookies.remove("jwt");
        setAuth(null);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
