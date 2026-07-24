"use client";

import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "next-themes";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();

  function toggleSideBar() {
    setIsSidebarOpen((prevState) => !prevState);
  }

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <div className="min-h-screen flex bg-[#F3F4F6] dark:bg-[#101828]">

      {/* Sidebar */}
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
            ${isSidebarOpen
              ? "pl-4 pt-3 w-13"
              : "px-4 py-3 w-13 min-w-15"
            }
          `}
        />

        {/* User Profile */}
        {isSidebarOpen && (
          <div className=" flex flex-col justify-center items-center mx-6 mb-3">
            <img
              src="/avatar.png"
              alt="User avatar"
              className="m-2 w-20"
            />

            <h1 className="text-black dark:text-white">
              Jane Doe
            </h1>

            <p className="text-[#6A7282]">
              janedoe@gmail.com
            </p>
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
            <h1 className="text-black dark:text-white font-bold">
              My Tasks
            </h1>
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
            <h1 className="text-black dark:text-white font-bold">
              Settings
            </h1>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className="w-full min-h-screen flex flex-col gap-4 ">

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="relative flex self-end items-center justify-center h-8 w-8 mr-1 rounded-full  shadow-md transition-all hover:scale-110 text-black dark:text-white "
          aria-label="Toggle theme"
        >
          <FaSun
            className="
              absolute
              h-6 w-6
              scale-100
              transition-all
              dark:rotate-0 dark:scale-0
            "
          />

          <FaMoon
            className="
              absolute
              h-6 w-6
              scale-0
              transition-all
              dark:rotate-0 dark:scale-100
            "
          />
        </button>

        {/* Heading */}
        <strong className="self-center text-4xl font-sans text-black dark:text-white">
          My Tasks
        </strong>

        {/* Task Input */}
        <div className="flex gap-4 justify-center">
          <input
            type="text"
            autoFocus
            placeholder="Type your task here..."
            className="
              bg-white dark:bg-[#4A5565]
              text-black dark:text-white
              placeholder-[#A9A9A9]
              rounded-2xl
              w-[20%]
              pl-4 pr-2 py-2
              outline-none
            "
          />

          <button
            type="submit"
            className="
              text-white
              bg-black
              dark:bg-[#4A5565]
              dark:text-white
              rounded-2xl
              px-7 py-2
            "
          >
            Add
          </button>
        </div>

        {/* Footer */}
        <div className="self-center mt-auto p-4">
          <span className="text-black dark:text-white">
            &copy; 2025
          </span>
        </div>

      </main>
    </div>
  );
}