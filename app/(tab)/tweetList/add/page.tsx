"use client"
import Button from "@/components/button";
import Input from "@/components/input";
import { useActionState } from "react";
import { uploadTweet } from "./action";



export default function AddTweet(){
    const [state,action] = useActionState(uploadTweet,{fieldErrors:{}})    
    return(
        <div className="mt-16">
        <form action={action} className="p-5 flex flex-row gap-5 justify-center">
          <div className="flex flex-col gap-5">
          <Input name="title" required placeholder="제목" type="text" errors={state?.fieldErrors.title}/>
          <Input
            name="description"
            type="text"
            required
            placeholder="자세한 설명"
          />
          <Button text="작성 완료" />
          </div>
        </form>
      </div>
    )
}