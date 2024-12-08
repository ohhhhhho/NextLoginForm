import { formatToTimeAgo } from "@/lib/utills";
import Image from "next/image";
import Link from "next/link";

interface ListTweetProps{
    title: string;
    id: number;
    created_at: Date;
    photo:string
}

export default function Tweet({title,id,created_at,photo}:ListTweetProps){
    return(
        <>
            <div>
                <Link href={`/tweetList/${id}`} className="flex flex-row justify-between items-center gap-2 mt-6 ring-1 ring-slate-200 bg-white *:text-black px-4 py-2 rounded-2xl w-1/2 mx-auto">
                    <div className="flex flex-col gap-2">
                    <span>{title}</span>
                    <span>{formatToTimeAgo(created_at.toString())}</span>
                    </div>
                    <span className="size-20 relative">
                        <Image className="object-cover" src={`${photo}`} fill alt={`${title}`}></Image>
                    </span>
                </Link>
            </div>
        </>
    )
}