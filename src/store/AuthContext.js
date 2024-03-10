"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLogin: false,
  });
  const [signUpData, setSignUpData] = useState([
    { email: "tushar@gmail.com", password: "234567" },
  ]);

  useEffect(() => {
    const storedValue = localStorage.getItem("USER") ? true : false;
    setAuth({ isLogin: storedValue });
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth, signUpData, setSignUpData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
