"use client";
import { useState } from "react";

export default function Sidebar() {
    
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  function toggleSideBar() {
    setIsSidebarOpen((prevState) => !prevState);
  }
  return (
    <aside
      className={`
          bg-white dark:bg-[#1E2939]
          h-screen
          fixed z-1000
          flex flex-col
          transition-all duration-300
          overflow-hidden
          ${isSidebarOpen ? "w-60" : "w-15"}
        `}
    >
      {/* Menu */}
      <img
        src="/menu.svg"
        alt="Menu"
        onClick={toggleSideBar}
        className={`
            menu
            dark:invert
            ${isSidebarOpen ? "pl-4 pt-3 w-13" : "px-4 py-3 w-13 min-w-15"}
          `}
      />

      {/* User Profile */}
      {isSidebarOpen && (
        <div className=" flex flex-col justify-center items-center mx-6 mb-3">
          <img src="/avatar.png" alt="User avatar" className="m-2 w-20" />

          <h1 className="text-black dark:text-white">Jane Doe</h1>

          <p className="text-[#6A7282]">janedoe@gmail.com</p>
        </div>
      )}

      <hr
        className={`
            w-[80%]
            border-t
            border-gray-500
            dark:border-gray-600
            ${isSidebarOpen ? "self-center" : "self-center"}
          `}
      />

      {/* My Tasks */}
      <div className="flex items-center">
        <img
          src="/list-todo.svg"
          alt="Tasks"
          className="dark:invert px-4 py-3 w-13 min-w-15"
        />

        {isSidebarOpen && (
          <h1 className="text-black dark:text-white font-bold">My Tasks</h1>
        )}
      </div>

      {/* Settings */}
      <div className="flex items-center">
        <img
          src="/settings.svg"
          alt="Settings"
          className="dark:invert px-4 py-3 w-13 min-w-15"
        />

        {isSidebarOpen && (
          <h1 className="text-black dark:text-white font-bold">Settings</h1>
        )}
      </div>
    </aside>
  );
}
