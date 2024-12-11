'use client'
import { createComment } from "@/app/(tab)/tweetList/[id]/action";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useActionState } from "react";

export default function Comment({id}:{id:number}){
    const [state,dispatch] = useActionState(createComment,{ fieldErrors: {},id })
    return(
        <>
        <div>
            <form action={dispatch} className="flex flex-row justify-start items-center gap-4 mt-6">
                <textarea name="textareaComment" className="ring-1 ring-neutral-300 w-5/6 h-20 focus:outline-none resize-none p-2 text-neutral-800 text-sm" placeholder="text"/>
                <button className="w-1/6 flex items-center justify-center shadow-md rounded-lg h-20"><PaperAirplaneIcon className="size-6"/></button>
            </form>
            <span className="text-red-600 text-xs">{state.fieldErrors.textareaComment}</span>
        </div>
        </>
    )
}