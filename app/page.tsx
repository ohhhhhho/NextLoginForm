"use client"
import Button from "@/components/button";
import Input from "@/components/input";
import { onSubmit } from "./action";
import { useActionState } from "react";

export default function Home() {
  const [state,action] = useActionState(onSubmit,{
    formData: {},
    fieldErrors: {},
    success:false
  })
  return (
    <>
    <div className="w-full h-screen bg-white">
      <div className="flex justify-center items-center flex-col">
        <form action={action} className="flex flex-col *:mt-4">
          <Input name="email" type="email" placeholder="Email" required defaultValue={state?.formData?.email}/>
          <Input name="username" type="text" placeholder="Username" required defaultValue={state?.formData?.username}/>
          <Input name="password" type="password" placeholder="Password" required min={5} errors={state?.fieldErrors.password}/>
          <Button text="Log in"/>
        </form>
        {state.success && <div className="bg-green-600 text-black text-lg rounded-2xl w-96 mt-4 p-4">Welcome Back!</div> }
      </div>
    </div>
    </>
  );
}
