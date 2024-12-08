import Button from "@/components/button";
import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const getTweet = async() => {
    const tweet = await db.tweet.findMany({
        select:{
            id:true,
            title:true,
            created_at:true,
            likes:true,
            photo:true
        },
        take:1,
        orderBy:{
            created_at:'desc'
        }
    })
    return tweet
}
export default async function TweetListPage(){
    const initialTweet = await getTweet()
    return(
        <>
            <TweetList initialTweet={initialTweet}/>
            <Link
                href="/tweetList/add"
                className="ring-1 ring-neutral-400 rounded-full flex items-center justify-center size-16 fixed bottom-24 right-8 text-white transition-transform hover:scale-110 duration-300"
            >
                <PlusIcon className="size-10" />
            </Link>
        </>
    )
}