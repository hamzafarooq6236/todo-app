"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSideBar: () => void;
}

export default function Sidebar({ isSidebarOpen, toggleSideBar }: SidebarProps) {

  const pathName = usePathname();
  console.log(pathName);

  
  return (
    <aside className={` bg-white dark:bg-[#1E2939] h-screen fixed z-50 flex flex-col transition-all overflow-hidden ${isSidebarOpen ? "w-[60vw] md:w-[15vw]" : " w-0 md:w-15"} `} >
      {/* Menu */}
      <img src="/menu.svg" alt="Menu" onClick={toggleSideBar} className={` menu dark:invert ${isSidebarOpen ? "hidden pl-4 pt-3 w-13" : "px-4 py-3 w-13 min-w-15"} `} />
      <IoClose className={`text-black ${isSidebarOpen?"ml-2 h-8":"hidden"}`} onClick={toggleSideBar}/>

      {/* User Profile */}
      {isSidebarOpen && (
        <div className=" flex flex-col justify-center items-center mx-6 mb-3">
          <img src="/avatar.png" alt="User avatar" className="m-2 w-20" />

          <h1 className="text-black dark:text-white">Jane Doe</h1>

          <p className="text-[#6A7282]">janedoe@gmail.com</p>
        </div>
      )}

      <hr className={` w-[80%] border-t border-gray-500 dark:border-gray-600 ${isSidebarOpen ? "self-center" : "self-center"} `} />

      {/* My Tasks */}
      <Link href="/">
        <div className={`flex mt-1 items-center ${pathName === "/" ? "bg-[#dee0e3] rounded-2xl" : ""}`}>
          <img
            src="/list-todo.svg"
            alt="Tasks"
            className="dark:invert px-4 py-3 w-13 min-w-15"
          />

          {isSidebarOpen && (
            <h1 className="text-black dark:text-white font-bold">My Tasks</h1>
          )}
        </div>
      </Link>

      {/* Settings */}
      <Link href="/Settings">
        <div className={`flex items-center ${pathName === "/Settings" ? "bg-[#dee0e3] rounded-2xl" : ""}`}>
          <img
            src="/settings.svg"
            alt="Settings"
            className="dark:invert px-4 py-3 w-13 min-w-15"
          />

          {isSidebarOpen && (
            <h1 className="text-black dark:text-white font-bold">Settings</h1>
          )}
        </div>
      </Link>
    </aside>
  );
}
