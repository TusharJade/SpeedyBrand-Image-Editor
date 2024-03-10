"use client";

import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLogin: false,
  });
  const [signUpData, setSignUpData] = useState([
    { email: "tushar@gmail.com", password: "234567" },
  ]);
  return (
    <AuthContext.Provider value={{ auth, setAuth, signUpData, setSignUpData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
