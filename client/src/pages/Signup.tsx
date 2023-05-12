import React, { useCallback, useContext, useEffect, useState } from "react";
import Axios from "axios";
import LoginImg from "../assets/login.jpg";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { UserContext } from "../context/UserContext";

const Signup: React.FC = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sendReq, setSendReq] = useState(0);
  const [variant, setVariant] = useState("login");

  const navigate = useNavigate();
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);
  const submitHandler = (e: any) => {
    e.preventDefault();
    setSendReq(sendReq + 1);
    console.log(username, email, password);
  };

  useEffect(() => {
    if (sendReq) {
      const source = Axios.CancelToken.source();

      async function sendRequest() {
        try {
          let endpoint = "";
          let payload = {};
          if (variant === "login") {
            endpoint = "signin";
            payload = { email, password };
          } else if (variant === "register") {
            endpoint = "signup";
            payload = { username, email, password };
          }
          const response = await Axios.post(
            `http://localhost:5000/users/${endpoint}`,
            payload,
            {
              cancelToken: source.token,
            }
          );
          console.log(response);
          if (response.status === 200) {
            const token = response.data.token;
            if (!localStorage.getItem("SavedToken")) {
              localStorage.setItem("SavedToken", "Bearer " + token);
            }
            setIsLoggedIn(true);
            setUser(response.data.user);
            navigate("/");
          }
        } catch (error) {
          console.log(error);
          setError(true);
        }
      }

      sendRequest();
      return () => {
        source.cancel();
      };
    }
  }, [sendReq]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div className="flex flex-col items-start justify-center w-full space-y-6 p-6 md:py-64 md:px-36 text-white container mx-auto md:max-w-5xl bg-background">
        <h1 className="text-2xl md:text-4xl font-bold text-normal">
          {variant === "login" ? "Log into Your Account" : "Create an Account"}
        </h1>
        <div className={"flex gap-2"}>
          <p className={"text-highlight font-semibold"}>
            {variant !== "login"
              ? "Already Have an Account?"
              : "Don't Have an Account?"}
          </p>
          <button
            className={"text-highlight font-bold underline"}
            onClick={toggleVariant}
          >
            {variant !== "login" ? "LogIn" : "Register"}
          </button>
        </div>

        <form
          onSubmit={submitHandler}
          className="flex flex-col w-full items-center justify-center gap-y-8"
        >
          {variant === "register" && (
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e: any) => setUsername(e.target.value)}
            />
          )}
          <Input
            type="text"
            placeholder="name@email.com"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          {error ? (
            <p className={"text-left text-red-400 font-semibold"}>
              Something went Wrong!
            </p>
          ) : (
            ""
          )}
          <button
            className="px-3 py-3 bg-button w-full rounded-md font-bold text-normal"
            type="submit"
          >
            {variant.toUpperCase()}
          </button>
        </form>
      </div>
      <img
        className={"w-full h-full hidden lg:block"}
        src={LoginImg}
        alt={"Studing"}
      />
    </div>
  );
};
export default Signup;
