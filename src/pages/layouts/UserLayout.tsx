import { Outlet, Navigate } from "react-router";
import Sidebar from "../../components/header/Sidebar";
import Header from "../../components/header/Header";
import Footer from "../../components/header/Footer";

export default function UserLayout() {
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
          <Header />

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