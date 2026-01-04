import UserLayout from "../layouts/UserLayout"
import Admin from "./admin"
import NotFound from "../error/NotFound"


export const AdminRouter =  [
  { path: "/admin", element: <UserLayout />, children: [
      { index: true, element: <Admin /> },
      { path: "*", element: <NotFound /> },
    //   { path: "user", element: <UserList />},
    //   { path: "user/:userId", element: <UserEdit />}
    ],
  },
]