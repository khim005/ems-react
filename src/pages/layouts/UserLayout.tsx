import { Outlet, Navigate } from "react-router";
import Sidebar from "../../components/header/Sidebar";
import Footer from "../../components/header/Footer";
import { useAuth } from "../../lib/hooks/useAuth";
import { FaUser } from "react-icons/fa6";

export default function UserLayout() {
  const {loggedInUser} = useAuth();
  const token = localStorage.getItem("token");
  //No Token => redirect to login page
  if (!token) {
    return <Navigate to="http://localhost:5173" />
  }
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Header */}
        <div className="flex-1 flex flex-col">
          <header className="bg-white shadow h-16 flex items-center px-6 justify-between">
            <div className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </div>
            <div className="flex gap-3 items-center">
              <span className="size-8 bg-gray-800 flex items-center justify-center rounded-full">
                <FaUser className="size-5 text-white" />
              </span>{" "}
              {loggedInUser?.name}
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {/* Render nested route content: */}
            <div className="mt-4">
              <Outlet />
            </div>
          </main>
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </>);
}