import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../lib/hooks/useAuth";
import {  type ReactNode } from "react";

import { FaBold, FaHome, FaUsers } from "react-icons/fa";
import TopBar from "../../components/header/Topbar";
import Footer from "../../components/header/Footer";
import Sidebar from "../../components/header/Sidebar";

 interface IMenuSingleItem{label: string, icon: ReactNode, url: string}

export default function UserLayout() {
  // 
  const {loggedInUser, loading } = useAuth()
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  if (!loggedInUser) {
    return <Navigate to="/" replace />;
  }

  if(Object.keys(!loggedInUser)) {
    let sidebarMenu: Array<IMenuSingleItem> = [];
    if(loggedInUser.role === 'admin') {
      sidebarMenu = [
        { label: "Dashboard", icon: <FaHome />, url: "/admin" },
        { label: "User", icon: <FaUsers />, url: "/admin/users" },
        { label: "Brand", icon: <FaBold />, url: "/admin/brand" },
      ];
    } else if(loggedInUser.role=== 'admin') {
      sidebarMenu = [
        { label: "Dashboard", icon: <FaHome />, url: "/seller" },
        { label: "Brand", icon: <FaBold />, url: "/seller/brand" },
      ];
    } else if(loggedInUser.role === 'admin') {
      sidebarMenu = [
        { label: "Dashboard", icon: <FaHome />, url: "/customer" }
      ];
    }

    return (
      <>
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <Sidebar menu={sidebarMenu} />
          <div className="flex-1 flex flex-col">
            {/* Header */}
          <TopBar />
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
      </>
    );
  } else {
    return <Navigate to={'/'} />
  }
  
}