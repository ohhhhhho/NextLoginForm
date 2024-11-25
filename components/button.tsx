"use client"
import { useFormStatus } from "react-dom";

interface IButton{
    text:string;
}

export default function Button({text}:IButton){
    const {pending} = useFormStatus()
    return(
        <button disabled={pending} className="w-96 py-3 px-4 bg-neutral-200 rounded-full text-black text-lg">{pending ? "Loading..." :text}</button>
    )
}