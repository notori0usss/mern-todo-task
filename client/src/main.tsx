import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Signup from "./pages/Signup";
import App from "./App";
import { LoginProvider } from "./context/LoginContext";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LoginProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </LoginProvider>
  </React.StrictMode>
);
