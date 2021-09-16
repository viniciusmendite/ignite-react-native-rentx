import React, {
  createContext,
  useState,
  useContext,
  ReactNode
} from 'react';

import api from '../services/api';

interface IUser {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
}

interface IAuthState {
  token: string;
  user: IUser;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContentData {
  user: IUser;
  signIn: (credentials: ISignInCredentials) => Promise<void>;
}

interface IAuthProvider {
  children: ReactNode;
}

const AuthContext = createContext({} as IAuthContentData);

function AuthProvider({ children }: IAuthProvider) {
  const [data, setData] = useState<IAuthState>({} as IAuthState);

  async function signIn({ email, password }: ISignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password
      });

      const { token, user } = response.data;

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, user });
    } catch (error) {
      console.log('erro no login')
      // throw new Error(error)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, user: data.user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): IAuthContentData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };