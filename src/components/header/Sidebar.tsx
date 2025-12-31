import { NavLink } from "react-router";
import { useState } from "react";
import { FaAnglesLeft, FaAnglesRight, FaChartBar, FaFile, FaUsers, FaGear } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";



export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={`bg-teal-900 text-white flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-56"} min-h-screen`}>
      <div className="flex items-center justify-between px-4 h-16 border-b border-teal-800">
        <span className={`font-extrabold tracking-wider text-lg ${collapsed && "hidden"}`}>EMS MAGNUS</span>
        <button
          className="ml-auto p-1 rounded hover:bg-teal-700 transition"
          onClick={() => setCollapsed((c: boolean) => !c)}
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <span>{collapsed ? <FaAnglesRight /> : <FaAnglesLeft />}</span>
        </button>
      </div>
      <nav className="flex-1 mt-4 flex flex-col gap-2">
          <>
        <SidebarLink to="/dashboard" collapsed={collapsed} icon={<FaHome />} label="Dashboard" />
        <SidebarLink to="/admin/user" collapsed={collapsed} icon={<FaUsers />} label="Users" />
        <SidebarLink to="/admin/analytics" collapsed={collapsed} icon={<FaChartBar />} label="Analytics" />
        <SidebarLink to="/admin/reports" collapsed={collapsed} icon={<FaFile />} label="Reports" />
        <SidebarLink to="/admin/settings" collapsed={collapsed} icon={<FaGear />} label="Settings" />
          </>
      </nav>
    </div>
  );
}
// SidebarLink component (uses NavLink)
type SidebarLinkProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
};

function SidebarLink({ to, icon, label, collapsed }: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }: any) =>
        `flex items-center gap-3 px-4 py-2 rounded transition hover:bg-teal-700 font-medium ${isActive ? 'bg-teal-800' : ''} ${collapsed && "justify-center"}`
      }
      title={label}
    >
      <span className="text-xl">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}
