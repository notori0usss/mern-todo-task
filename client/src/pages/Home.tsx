import React, { useContext, useEffect } from "react";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Wrapper from "../components/layout/Wrapper";
import Greet from "../components/Greet";
import Notes from "../components/Notes";

const Home: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth");
    }
  }, []);
  const logoutHandler = () => {
    setIsLoggedIn(false);
    navigate("/auth");
  };
  return (
    <>
      <Navbar />
      <Wrapper>
        <Greet />
        <Notes />
      </Wrapper>
    </>
  );
};
export default Home;
