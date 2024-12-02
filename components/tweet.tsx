import { formatToTimeAgo } from "@/lib/utills";
import Link from "next/link";

interface ListTweetProps{
    tweet: string;
    id: number;
    created_at: Date;
}

export default function Tweet({tweet,id,created_at}:ListTweetProps){
    return(
        <>
            <div>
                <Link href={`/tweetList/${id}`} className="flex flex-col gap-2 mt-6 ring-1 ring-slate-200 bg-white *:text-black px-4 py-2 rounded-2xl w-1/2 mx-auto">
                    <span>{tweet}</span>
                    <span>{formatToTimeAgo(created_at.toString())}</span>
                </Link>
            </div>
        </>
    )
}