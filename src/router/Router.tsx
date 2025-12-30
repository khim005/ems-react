import NotFound from "../pages/error/NotFound";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthRouter } from "../pages/auth/authRouter";
import { AdminRouter } from "../pages/ems/adminRouter";

const router = createBrowserRouter([
  ...AuthRouter,
  { path: "*", element: <NotFound /> },
  ...AdminRouter
]);
export default function AppRouter() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  ); 
}