import TweetList from "@/components/tweet-list";
import db from "@/lib/db";

const getTweet = async() => {
    const tweet = await db.tweet.findMany({
        select:{
            id:true,
            tweet:true,
            created_at:true,
            Like:true
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
        </>
    )
}