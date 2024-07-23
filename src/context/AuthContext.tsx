import { createContext } from 'react';

type AuthContextType = {
  authenticated: boolean,
  role?: string;
};

const AuthContext = createContext<AuthContextType>({
  authenticated: false,
});

export default AuthContext;
