"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "next-themes";
import Sidebar from "./components/sidebar";
import Tasks from "./components/task"
import { IoSearch } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
// import Task from "./components/task";
import { TiThMenu } from "react-icons/ti";

interface TaskItem {
  id: number,
  task: string,
  isChecked: boolean,
  createdAt: number,
  updatedAt: number,
  deletedAt: number | null,
}

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  function toggleSideBar() {
    setIsSidebarOpen((prevState) => !prevState);
  }

  const [tasks, setTasks] = useState<TaskItem[]>([]);
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    
    function isSafe(obj: unknown): obj is TaskItem {
      if (!obj || typeof obj !== "object") {
        return false;
      }

      const checks = {
        id: 0,
        task: "string",
        isChecked: false,
        createdAt: 0,
        updatedAt: 0,
      };

      for (const key in checks) {
        console.log(key)
        console.log(obj[key as keyof typeof obj])
          console.log( checks[key as keyof typeof checks])
        if (typeof obj[key as keyof typeof obj] !== typeof checks[key as keyof typeof checks]) {
          return false;
        }
      }

      if (
        typeof (obj as TaskItem).deletedAt !== "number" &&
        (obj as TaskItem).deletedAt !== null
      ) {
        return false;
      }

      return true;
    }

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every(isSafe)) {
          setTasks(parsed);
        }
      } catch (error) {
        console.error("Failed to parse tasks from localStorage:", error);
      }
    }
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

  }, [tasks]);

  const [taskInput, setTaskInput] = useState<string>("");
  const [isSearch, setIsSearch] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Active", "Completed", "Deleted"];
  const [searchInput, setSearchInput] = useState("");
  const searchedTasks = tasks.filter((item) => item.deletedAt === null && item.task.toLowerCase().includes(searchInput.toLowerCase()));

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  function handleAddSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!isSearch) {
      if (!taskInput.trim()) return;
      setTasks((prev) => [...prev, { id: Date.now(), task: taskInput.trim(), isChecked: false, createdAt: Date.now(), updatedAt: Date.now(), deletedAt: null }]);
      setTaskInput("");
    }
  }

  function editTask(e: React.ChangeEvent<HTMLInputElement>, id: number) {
    e.preventDefault();
    const newValue = e.target.value;
    setTasks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task: newValue } : item))
    );
  }

  function handleChecked(id: number) {
    const task = tasks.find((item) => item.id === id);
    if (!task) return
    //invert isChecked
    setTasks((prev) => prev.map((item) =>
      item.id === id
        ? { ...item, isChecked: !item.isChecked, updatedAt: Date.now() }
        : item
    ));
  }

  function deleteTask(id: number) {
    if (tasks.find((item) => item.id === id)?.deletedAt !== null) {
      setTasks((prev) => prev.filter((item) => item.id !== id));
    } else {
      setTasks(tasks.map((item) => item.id === id
        ? { ...item, updatedAt: Date.now(), deletedAt: Date.now() }
        : item));
    }

  }

  function restoreTask(id: number) {
    const task = tasks.find(item => item.id === id)?.deletedAt !== null;
    if (!task) { return; }
    setTasks(tasks.map((item) => item.id === id ? { ...item, deletedAt: null } : item));

  }


  function filter(fl: string) {
    let finalTasks = [];
    let temp = [];
    isSearch ? temp = searchedTasks : temp = tasks;
    if (fl === "Deleted") {
      const sorted = temp.toSorted((a, b) => (a.deletedAt !== null && b.deletedAt !== null) ? a.deletedAt - b.deletedAt : 0);
      finalTasks = sorted.filter((item) => item.deletedAt !== null);

    } else if (fl === "Completed") {
      const sorted = temp.toSorted((a, b) => a.updatedAt - b.updatedAt);
      finalTasks = sorted.filter(item => item.isChecked === true && item.deletedAt === null);

    }
    else if (fl === "Active") {
      finalTasks = temp.filter((item) => item.isChecked === false && item.deletedAt === null)

    } else {
      finalTasks = temp.filter((item) => item.deletedAt === null);
    }

    return (!isSearch ? finalTasks.map((t) => (
      <Tasks
        key={t.id}
        id={t.id}
        content={t.task}
        deletedAt={t.deletedAt}
        isChecked={t.isChecked}
        editTask={editTask}
        handleChecked={handleChecked}
        deleteTask={deleteTask}
        restoreTask={restoreTask}
      />
    )) : finalTasks.map((t) => (
      <Tasks
        key={t.id}
        id={t.id}
        content={t.task}
        isChecked={t.isChecked}
        deletedAt={t.deletedAt}
        editTask={editTask}
        handleChecked={handleChecked}
        deleteTask={deleteTask}
        restoreTask={restoreTask}
      />
    )));
  }

  return (
    <div className="min-h-screen flex bg-[#F3F4F6] dark:bg-[#101828]">

      <Sidebar isSidebarOpen={isSidebarOpen} toggleSideBar={toggleSideBar} />

      {/* Main */}
      <main className="w-full min-h-screen flex flex-col gap-4">
        <div className="flex justify-between">
          <button className="text-black p-3" onClick={() => setIsSidebarOpen(true)}><TiThMenu className="" /></button>
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
        </div>
        {/* Heading */}
        <strong className="self-center text-4xl font-sans text-black dark:text-white">
          My Tasks
        </strong>

        <div className="flex flex-col justify-center">
          {/* Task Input */}
          <form onSubmit={handleAddSearch} className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <input
              type="text"
              autoFocus
              value={taskInput}
              placeholder="Type your task here..."
              className={` ${isSearch ? "hidden" : ""}
              bg-white dark:bg-[#4A5565]
              text-black dark:text-white
              placeholder-[#A9A9A9]
              rounded-2xl
              w-[95vw]
              md:w-[20%]
              pl-4 pr-2 py-2
              outline-none
            `}
              onChange={(e) => {
                setTaskInput(e.target.value);
              }}
            />
            <input
              type="text"
              autoFocus
              value={searchInput}
              placeholder="Type your task here..."
              className={` ${isSearch ? "" : "hidden"}
              bg-white dark:bg-[#4A5565]
              text-black dark:text-white
              placeholder-[#A9A9A9]
              rounded-2xl
              w-[95vw]
              md:w-[20%]
              pl-4 pr-2 py-2
              outline-none
            `}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
            <div className="flex gap-2">
              <button type="submit" onClick={() => setIsSearch(false)} className={`flex gap-1 w-25 md:w-25 items-center justify-center transition-all ${isSearch ? "bg-white text-black dark:bg-[#374151] dark:text-gray-300" : "bg-black text-white dark:bg-blue-600 dark:text-white"} rounded-2xl py-2 cursor-pointer `}>
                <IoAdd />
                Add
              </button>
              <button type="button" onClick={() => setIsSearch(true)} className={`flex gap-1 w-25 md:w-25 items-center justify-center transition-all ${isSearch ? "bg-black text-white dark:bg-blue-600 dark:text-white" : "bg-white text-black dark:bg-[#374151] dark:text-gray-300"} rounded-2xl py-2 cursor-pointer `}>
                <IoSearch />
                Search
              </button>
            </div>
          </form>
          {/*show tasks and serach results*/}
          <div className="mt-4 w-[85vw] md:w-[27%] mx-auto ">
            <div className=" flex gap-1 mt-2">
              {filters.map((f, index) => (<button key={index} className={` pr-1 cursor-pointer ${f === activeFilter ? "text-black dark:text-white" : "text-[#6A7282]"} ${f === "Deleted" ? "" : "border-r border-black-200"} `} onClick={() => setActiveFilter(f)}>{f}</button>))}
            </div>

            <div className="mt-4 overflow-y-auto scrollbar-thin h-[35vh] md:h-[50vh] flex flex-col items-center gap-2">
              {filter(activeFilter)}
            </div>

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

