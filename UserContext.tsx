import { createContext, useContext, useState } from 'react';

type UserData = {
  edad?: number;
  peso?: number;
  estatura?: number;
  objetivo?: string;
  frecuencia?: string;
  Cuerpo?: string;
  kilosMeta?: number;
};

type UserContextType = {
  userData: UserData;
  setUserData: (data: UserData) => void;
};

const UserContext = createContext<UserContextType>({
  userData: {},
  setUserData: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserDataState] = useState<UserData>({});

  const setUserData = (data: UserData) => {
    setUserDataState((prev) => ({ ...prev, ...data }));
  };

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
