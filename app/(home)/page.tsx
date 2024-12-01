import Link from "next/link";

export default function Home(){
    return(
        <>
        <div className="h-screen">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-10">
                <h1>Home</h1>
                <div className="flex flex-row justify-center items-center gap-4 *:ring-1 *:ring-neutral-500 *:py-2 *:px-4 *:rounded-full">
                    <Link href={'/create-account'} className="hover:bg-slate-200 hover:text-gray-950 transition hover:ring-white">Create Account</Link>
                    <Link href={'/login'}className="hover:bg-slate-200 hover:text-gray-950 transition hover:ring-white">Login</Link>
                </div>
            </div>
        </div>
        </>
    )
}