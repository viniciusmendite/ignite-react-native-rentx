import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect
} from 'react';

import api from '../services/api';
import { database } from '../database';
import { User as ModelUser } from '../database/model/User';

interface IUser {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
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
  const [data, setData] = useState<IUser>({} as IUser);

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<ModelUser>('users');
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as IUser;
        api.defaults.headers.authorization = `Bearer ${userData.token}`;
        setData(userData);
      }
    }

    loadUserData()
  }, []);

  async function signIn({ email, password }: ISignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password
      });

      const { token, user } = response.data;

      api.defaults.headers.authorization = `Bearer ${token}`;

      const userCollection = database.get<ModelUser>('users');

      await database.write(async () => {
        await userCollection.create((newUser) => {
          newUser.user_id = user.id,
            newUser.name = user.name,
            newUser.email = user.email,
            newUser.driver_license = user.driver_license,
            newUser.avatar = user.avatar,
            newUser.token = token
        })
      })

      setData({ ...user, token });
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, user: data }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): IAuthContentData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };