import { FaUser } from "react-icons/fa6";
// import { useNavigate } from "react-router";
import { useAuth } from "../../lib/hooks/useAuth";

export default function Header() {
  const { loggedInUser } = useAuth();

  // const navigate = useNavigate();
  // const handleLogout = () => {
  //   localStorage.clear();
  //   // localStorage.removeItem("token");
  //   navigate("http://localhost:5173", { replace: true });
  // };

  return (
    <header className="bg-white shadow h-16 flex items-center px-6 justify-between">
      <div className="text-2xl font-bold text-gray-800">Dashboard</div>
      <div className="flex gap-3 items-center">
              <span className="size-8 bg-gray-800 flex items-center justify-center rounded-full">
                <FaUser className="size-5 text-white" />
              </span>{" "}
              {loggedInUser?.name}
            </div>
      {/* <div>
        <button
          onClick={handleLogout}
          className="bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 rounded transition cursor-pointer">Logout</button>
      </div> */}
    </header>
  );
}
