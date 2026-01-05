import NotFound from "../pages/error/NotFound";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthRouter } from "../pages/auth/authRouter";
import { AdminRouter } from "../pages/ems/adminRouter";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const router = createBrowserRouter([
  ...AuthRouter,
  { path: "*", element: <NotFound /> },
  ...AdminRouter
]);
export default function AppRouter() {
  // const {getLoggedInUserProfile} = useAuth() 
  const [loading, setLoading] = useState<boolean>(true);

  const userPersist = async () => {
    try {
      const token = Cookies.get("_at");
      if (token) {
        // await getLoggedInUserProfile();
      }
    } catch  {
      //
  }  finally {
    setLoading(false);
  }
  };

  useEffect(() => {
    userPersist();
  }, []);

  return (
    <>
      {loading ? "Loading..." : <RouterProvider router={router} />}
    </>
  ); 
}