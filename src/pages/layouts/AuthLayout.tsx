import { NavLink, Outlet } from "react-router";
import logo from "../../assets/images/LOG.png"

export default function AuthLayout() {
  return (
    <>
      <div className="flex w-full h-screen">
        <div className="hidden md:block md:w-1/3 bg-teal-800">
          <div className="flex flex-col w-full h-full items-center justify-between py-12">
             {/* Logo + Brand */}
            <div className="flex flex-col items-center gap-4 mt-20">
              <img src={logo} alt="logo" className="w-48 object-contain rounded-full" />
              <h1 className="text-3xl font-bold text-white">
                EMS-MAGNUS
              </h1>
              <p className="text-sm italic text-yellow-200">
                Work Smarter, Manage Better
              </p>
              <h2>Login</h2>
              <div className="block mt-6 underline hover:text-yellow-200 transition">
              <NavLink to={'/register'}>
                Register
              </NavLink>
            </div>
            </div>

            
          </div>
        </div>

         {/* RIGHT SECTION */}
        <div className="w-full md:w-2/3 bg-gray-100">
          <div className="min-h-screen flex items-center justify-center px-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}