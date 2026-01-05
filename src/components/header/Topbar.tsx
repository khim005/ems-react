import { useAuth } from "../../lib/hooks/useAuth";

export default function TopBar() {
  const { loggedInUser, loading, logout } = useAuth();
  if (loading) return null;
  return (
    <header className="bg-white shadow h-16 flex items-center px-6 justify-between">
      <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>

      {/* Profile Hover Menu */}
      <div className="relative group">
        {/* Trigger */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="/images/profile.jpg" // replace with user image
            alt="profile"
            className="w-9 h-9 rounded-full border-2 border-white"
          />
          <span className="text-white font-medium">
            {loggedInUser?.fullName || "User"}
          </span>
        </div>
        {/* Dropdown */}
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg
                        opacity-0 invisible group-hover:opacity-100 group-hover:visible
                        transition-all duration-200 z-50">
          <div className="px-5 py-4 border-b">
            <p className="text-sm text-gray-500">Welcome</p>
            <p className="font-semibold text-gray-800">
              {loggedInUser?.email}
            </p>
          </div>
          <div className="py-2">
            <button
              onClick={logout}
              className="w-full text-left px-5 py-2 text-red-600 hover:bg-gray-100">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
