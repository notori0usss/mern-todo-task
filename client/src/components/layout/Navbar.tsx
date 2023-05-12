import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();
  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("SavedToken");
    navigate("/auth");
  };
  return (
    <div className={"bg-background"}>
      <nav className={"max-w-7xl  px-3 py-2  flex justify-between mx-auto"}>
        <h1 className={"text-highlight text-3xl font-bold"}>iNote</h1>
        <button
          onClick={logoutHandler}
          className="px-3 py-3 bg-button rounded-md font-bold text-normal"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};
export default Navbar;
