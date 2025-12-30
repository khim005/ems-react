import UserLayout from "../layouts/UserLayout"
import Dashboard from "./Dashboard"
import NotFound from "../error/NotFound"

export const AdminRouter = [
  { path: "/dashboard", element: <UserLayout />, children: [
      { index: true, element: <Dashboard /> },
      { path: "*", element: <NotFound /> },
    //   { path: "user", element: <UserList />},
    //   { path: "user/:userId", element: <UserEdit />}
    ],
  },
]