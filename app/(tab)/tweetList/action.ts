"use server"
import db from "@/lib/db";

export async function getMoreTweet(page:number) {
    const tweet = await db.tweet.findMany({
        select:{
            id:true,
            tweet:true,
            created_at:true,
            Like:true
        },
        skip:page * 1,
        take:1,
        orderBy:{
            created_at:'desc'
        }
    })
    return tweet
}