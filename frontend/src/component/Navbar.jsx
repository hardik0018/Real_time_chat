import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { logout } = useAuthStore();
  return (
    <div className="sticky w-full bg-black z-40 top-0 h-14 ">
      <button onClick={logout} className="btn btn-warning">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
