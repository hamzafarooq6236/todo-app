"use client";

import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "next-themes";
import Sidebar from "./components/sidebar";
import Tasks from "./components/task"
import { IoSearch } from "react-icons/io5";

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
  
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [taskInput, setTaskInput] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Active", "Completed", "Deleted"];

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    if (!taskInput.trim()) return;
    setTasks((prev) => [...prev, { id: Date.now(), task: taskInput.trim(), isChecked: false, createdAt: Date.now(), updatedAt: Date.now(), deletedAt: null }]);
    setTaskInput("");
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

  function restoreTask(id:number){
    const task = tasks.find(item=>item.id===id)?.deletedAt!==null;
    if(!task){return;} 
    setTasks(tasks.map((item)=>item.id? { ...item, deletedAt: null }: item));
  
  }


  function filter(fl: string) {
    let finalTasks=[];
    if (fl === "Deleted") {
      finalTasks = tasks.filter((item) => item.deletedAt !== null);

    } else if (fl === "Completed") {
      const sorted = tasks.toSorted((a, b) => a.updatedAt - b.updatedAt);
      finalTasks = sorted.filter(item => item.isChecked === true && item.deletedAt===null);

    }
    else if (fl === "Active") {
      finalTasks = tasks.filter((item) => item.isChecked === false && item.deletedAt===null)
    
    } else {
      finalTasks = tasks.filter((item) => item.deletedAt === null);
    }

    return ( finalTasks.map((t) => (
        <Tasks
          key={t.id}
          id={t.id}
          content={t.task}
          isChecked={t.isChecked}
          editTask={editTask}
          handleChecked={handleChecked}
          deleteTask={deleteTask}
          restoreTask={restoreTask}
        />
      )));
  }

  return (
    <div className="min-h-screen flex bg-[#F3F4F6] dark:bg-[#101828]">
      <Sidebar />

      {/* Main */}
      <main className="w-full min-h-screen flex flex-col gap-4">

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

            <button type="submit" className=" text-white bg-black dark:bg-[#4A5565] dark:text-white rounded-2xl px-7 py-2 cursor-pointer ">
              Add
            </button>
            <button type="submit" className=" text-white bg-black dark:bg-[#4A5565] dark:text-white rounded-2xl px-7 py-2 cursor-pointer ">
              <IoSearch/>
              Search
            </button>
          </form>

          {/* filters and tasks list*/}
          <div className="mt-4 w-[27%] mx-auto">
            <div className=" flex gap-1 mt-2">
              {filters.map((f, index) => (<button key={index} className={` pr-1 cursor-pointer ${f === activeFilter ? "text-black" : "text-[#6A7282]"} ${f === "Deleted" ? "" : "border-r border-black-200"} `} onClick={() => setActiveFilter(f)}>{f}</button>))}
            </div>

            <div className="mt-4 overflow-y-auto scrollbar-thin h-[50vh] flex flex-col items-center gap-2">
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

