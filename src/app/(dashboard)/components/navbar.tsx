"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeCookie } from "@/utils/configCookie";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [userRole, setUserRole] = useState<string | undefined>("");
  const router = useRouter();
  const onLogout = async () => {
    removeCookie();
    router.push("/login");
  };

  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("role_access="));
    const roleAccess = cookies?.split("=")[1];
    setUserRole(roleAccess ?? roleAccess);
  }, []);

  

  return (
    <header className="lg:px-16 px-2 bg-white flex flex-wrap items-center py-[25px] shadow-lg  w-full">
      <div className="flex flex-1 items-center space-x-4">
        {userRole === "teacher" && (
           <Link href="/assignments" className="text-sm font-bold text-black">
           Assigments
         </Link>
        )}
         {userRole === "student" && (
           <Link href="/grades" className="text-sm font-bold text-black">
           Grades
         </Link>
        )}
      
      </div>

      <div className="w-[200px]">
        <div className="group relative cursor-pointer py-2">
          <div className="flex items-center ">
            <button className="menu-hover my-2 text-base font-medium text-black lg:mx-4">
              Welcome  {userRole}
            </button>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </div>

          <div className="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
            <button
              className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
