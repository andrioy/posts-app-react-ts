import { createContext, useEffect, useState, PropsWithChildren } from "react";
import { STORAGE_KEYS } from "../../utils/constants";

export const AppContext = createContext({} as IAppContext);

export interface IAppContext {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: number;
}

const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const savedUserValue =
      window.localStorage.getItem(STORAGE_KEYS.USER) ||
      window.sessionStorage.getItem(STORAGE_KEYS.USER);

    if (savedUserValue) {
      setUser(JSON.parse(savedUserValue));
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
