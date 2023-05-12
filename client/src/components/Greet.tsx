import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Greet = () => {
  const { user } = useContext(UserContext);
  return (
    <h1 className={"text-xl font-semibold my-8"}>
      Welcome Back <span className={"text-highlight"}>{user.username}!</span>
    </h1>
  );
};
export default Greet;
