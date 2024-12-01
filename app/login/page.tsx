"use client"
import Button from "@/components/button";
import Input from "@/components/input";
import { onSubmit } from "./action";
import { useActionState } from "react";

export default function Login() {
  const [state,action] = useActionState(onSubmit,{
    form: { email: "",  password: "" },
    fieldErrors: {},
    success:false
  })
  return (
    <>
    <div className="w-full h-screen">
      <div className="flex justify-center items-center flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-xl">Login</h2>
        <form action={action} className="flex flex-col *:mt-4">
          <Input name="email" type="email" placeholder="Email" required defaultValue={state?.form?.email} errors={state.fieldErrors.email}/>
          <Input name="password" type="password" placeholder="Password" required min={5} errors={state?.fieldErrors.password}/>
          <Button text="Log in"/>
        </form>
        {state.success && <div className="bg-green-600 text-black text-lg rounded-2xl w-96 mt-4 p-4">Welcome Back!</div> }
      </div>
    </div>
    </>
  );
}
