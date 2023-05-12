import React, { createContext, useState } from "react";

interface UserContextProps {
  children: React.ReactNode;
}

interface User {
  token: string;
  username: string;
  email: string;
}

export const UserContext = createContext<{
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}>({
  user: {
    token: "",
    username: "",
    email: "",
  },
  setUser: () => {},
});

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    token: "",
    username: "",
    email: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
