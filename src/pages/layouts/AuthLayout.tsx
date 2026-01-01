import {  Outlet } from "react-router";
import LeftSidePanel from "../../components/auth/LeftSidePanel";
import type { IPageData } from "../../lib/types/GlobalTypes";
import { useState } from "react";

export default function AuthLayout() {
  const [pageData, setPageData] = useState<IPageData>({
    title: "",
    message:"",
    button: {
      url: "/register",
      text: "Register"
    }
  });
  return (
    <>
      <div className="flex w-full h-screen">
        <LeftSidePanel pageData ={pageData}/>
         {/* RIGHT SECTION */}
        <div className="w-full md:w-2/3 bg-gray-100">
          <div className="min-h-screen flex items-center justify-center px-10">
            <Outlet   context={{
                setPageData
              }}/>
          </div>
        </div>
      </div>
    </>
  );
}