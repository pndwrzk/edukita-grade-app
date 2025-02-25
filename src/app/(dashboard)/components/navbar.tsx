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
    const roleAccess = document.cookie
      .split("; ")
      .find((row) => row.startsWith("role_access="))
      ?.split("=")[1];
    setUserRole(roleAccess ?? "");
  }, []);

  return (
    <header className="lg:px-16 px-4 bg-gradient-to-r from-[#4F59F6] to-[#6A75F8] flex items-center py-4 shadow-xl w-full z-50 rounded-b-2xl">
      <div className="flex flex-1 items-center space-x-6">
        {userRole === "teacher" && (
          <Link
            href="/assignments"
            className="text-lg font-semibold text-white hover:text-gray-200 transition"
          >
             Assignments
          </Link>
        )}
        {userRole === "student" && (
          <Link
            href="/grades"
            className="text-sm font-semibold text-white hover:text-gray-200 transition"
          >
             Grades
          </Link>
        )}
      </div>

      <div className="relative">
        <div className="group relative cursor-pointer py-2">
          <button
            className="flex items-center text-base font-medium text-white hover:shadow-md px-4 py-2 rounded-lg transition"
            aria-label="User menu"
          >
            Welcome, {userRole}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>

          <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all">
            <button
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
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
