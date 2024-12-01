"use client"
import Button from "@/components/button";
import Input from "@/components/input";
import { createAccount } from "./action";
import { useActionState } from "react";

export default function CreateAccount() {
  const [state,dispatch] = useActionState(createAccount,{
    form: { email: "", username: "", password: "" ,password_confirm:""},
    fieldErrors: {},
    success:false
  })
  return (
    <>
    <div className="w-full h-scree">
      <div className="flex justify-center items-center flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-xl">Create Account</h2>
        <form action={dispatch} className="flex flex-col *:mt-4">
          <Input name="email" type="email" placeholder="Email" required defaultValue={state?.form?.email} errors={state.fieldErrors.email}/>
          <Input name="username" type="text" placeholder="Username" required defaultValue={state?.form?.username} errors={state?.fieldErrors.username}/>
          <Input name="password" type="password" placeholder="Password" required min={5} errors={state?.fieldErrors.password}/>
          <Input name="password_confirm" type="password" placeholder="Password Confirm" required min={5} errors={state?.fieldErrors.password_confirm}/>
          <Button text="Create Account"/>
        </form>
      </div>
    </div>
    </>
  );
}
