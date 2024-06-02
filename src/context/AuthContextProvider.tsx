import AuthContext from "./AuthContext.tsx";
import React from "react";
import { Navigate } from "react-router";
import { useLocation } from "react-router-dom";

type AuthContextProviderType = {
  children: React.ReactNode | React.ReactNode[];
};

const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  const route = useLocation();

  if (!localStorage.getItem('token')) {
    return <Navigate to={`/login?to=${route.pathname}`}/>;
  }

  return (
    <AuthContext.Provider value={{ role: 'admin', authenticated: false }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
