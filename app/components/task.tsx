import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

interface TaskProps {
    id: number;
    content: string;
    isChecked: boolean;
    editTask(e: React.ChangeEvent<HTMLInputElement>, id: number): void;
    handleChecked(id: number): void;
    deleteTask(id:number):void;
}

export default function Task({ id, content, isChecked, editTask, handleChecked, deleteTask }: TaskProps) {
    const [edit, setEdit] = useState(false);

    return (
        <div className="text-black bg-white dark:text-white dark:bg-[#1E2939] flex items-center gap-2 rounded-5xl w-full p-3 rounded-2xl">
            <input type="checkbox" checked={isChecked} className="bg-white cursor-pointer" onChange={() => handleChecked(id)} />
            <label className={`wrap-anywhere ${isChecked ? "line-through" : ""}`} >{edit ? (<input type="text" autoFocus value={content} minLength={2} required onBlur={() => setEdit(!edit)} onChange={(e) => editTask(e, id)} />) : content} </label>
            <div className="flex items-center gap-2 ml-auto">
                <MdEdit className="dark:text-white cursor-pointer" onClick={() => { setEdit(!edit) }} />
                <MdDelete className="dark:text-white cursor-pointer" onClick={()=>deleteTask(id)}/>
            </div>
        </div>
    )
}