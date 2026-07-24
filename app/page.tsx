"use client";

import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "next-themes";
import Sidebar from "./sidebar";
import Tasks from "./task"

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskInput, setTaskInput] = useState<string>("");
  
  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    if (!taskInput.trim()) return;
    setTasks((prev) => [...prev, taskInput.trim()]);
    setTaskInput("");
  }

  function filterAll(){
  }

  return (
    <div className="min-h-screen flex bg-[#F3F4F6] dark:bg-[#101828]">
      <Sidebar />

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

        <div>
          {/* Task Input */}
          <form onSubmit={handleAddTask} className="flex gap-4 justify-center">
            <input
              type="text"
              autoFocus
              value={taskInput}
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
              onChange={(e) => {
                setTaskInput(e.target.value);
              }}
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
              cursor-pointer
            "
            >
              Add
            </button>
          </form>

          {/* <div className="flex">
            <button type="button" onClick={filterAll}>All</button>
            <button type="button" onClick={filterActive}>Active</button>
            <button type="button" onClick={filterCompleted}>Completed</button>
            <button type="button" onClick={filterDeleted}>Deleted</button>
          </div> */}

          <div className="mt-4 flex flex-col items-center gap-2">
            {tasks.map((task, index) => (
              <Tasks key={index} content={task} />
            ))}
          </div>
        </div>

        {/*footer*/}
        <div className="self-center mt-auto p-4">
          <span className="text-black dark:text-white">&copy; 2025</span>
        </div>
      </main>
    </div>
  );
}

