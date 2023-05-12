import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface LoginContextProps {
  children: ReactNode;
}

export const LoginContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => {},
});

export const LoginProvider: React.FC<LoginContextProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("SavedToken")) {
      setIsLoggedIn(true);
      console.log(localStorage.getItem("SavedToken"));
    }
  }, []);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};
