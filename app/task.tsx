import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

interface t{
    content:string,
}

export default function Task({content}:t){
    const [edit,setEdit] = useState(false)

    return(
        <div className="text-black bg-white dark:text-white dark:bg-[#1E2939] flex items-center gap-2 rounded-5xl w-[26%] p-3 rounded-2xl">
            <input type="checkbox" className="bg-white" />
            <p className="wrap-anywhere">{edit ? (<input type="text" value={content} />):content } </p>
            <div className="flex items-center gap-2 ml-auto">
                <MdEdit className="dark:text-white" onClick={()=>{setEdit(!edit)}}/>
                <MdDelete className="dark:text-white"/>
            </div>
        </div>
    )
}