import {
  useAuth
} from "../context/AuthContext";

const Navbar = () => {
  const {
    user,
    logout
  } = useAuth();

  return (
    <nav className="navbar">
      <h2>CodeCamp</h2>

      <div>
        <span>
          {user?.name}
        </span>

        <button
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;