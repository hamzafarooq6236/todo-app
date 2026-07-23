"use client";

import type { Viewport } from 'next'
import { useState } from "react";

// export const viewport: Viewport = {
//   themeColor: 'black',
// }

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSideBar() {
    setIsSidebarOpen((prevState) => !prevState);
  }

  return (
    <div className="container flex bg-[#F3F4F6]">
      <aside
        className={`sidebar bg-[#FFFFFF] h-screen flex flex-col transition-all duration-300 overflow-hidden  ${isSidebarOpen ? "w-60" : "w-20"} `}
      >
        <img src="/menu.svg" alt="" onClick={toggleSideBar} className= {`menu ${isSidebarOpen? "pl-4 pt-3 w-13" : "px-4 py-3 w-13 min-w-15"} `} />
        { isSidebarOpen && (<div className="flex flex-col justify-center items-center mx-6 mb-3">
          <img src="/avatar.png" className="m-2 w-20"/>
          <h1 className="text-black self-center">Jane Doe</h1>
          <p className="text-[#6A7282] self-center" >janedoe@gmail.com</p>
        </div>

        )}
        <hr className={`w-[80%] border-t border-gray-500 ${isSidebarOpen? "self-center":""}`} />
        <div className="flex items-center">
        <img src="/list-todo.svg" alt="" className="px-4 py-3 w-13 min-w-15" />
        { isSidebarOpen && (<h1 className="text-black font-bold">My Tasks</h1>)}
        </div>

        <div className="flex items-center">
        <img src="/settings.svg" alt="" className=" px-4 py-3 w-13 min-w-15" />
        { isSidebarOpen && (<h1 className="text-black font-bold">Settings</h1>)}
        </div>

      </aside>

      <main className="w-full flex flex-col gap-4">
        <img
          src="/moon.svg"
          alt=""
          className="self-end p-3 max-w-20 w-13 block"
        />

        <strong className="text-black self-center text-4xl font-sans">
          My Tasks
        </strong>
        <div className="flex gap-4 justify-center">
          <input
            type="text"
            autoFocus
            placeholder="Type your task here.."
            className="bg-[#FFFFFF] placeholder-[#A9A9A9] rounded-2xl w-[20%] pl-4 pr-2 py-2 text-black"
          />
          <button
            type="submit"
            className="h-auto w-auto text-white bg-black rounded-2xl px-7 py-2"
          >
            Add
          </button>
        </div>

        <div className="self-center mt-auto p-4">
          <span className="w-10 text-black">&copy; 2025</span>
        </div>
      </main>
    </div>
  );
}