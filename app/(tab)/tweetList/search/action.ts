'use server'
import db from "@/lib/db"

export const getTweetKeyword = async (keyword:string) => {
    const tweet = await db.tweet.findMany({
        where: {
            OR: [
                {
                    description: {
                        contains: keyword,
                    }
                },
                {
                    title: {
                        contains: keyword,
                    }
                }
            ]
        },
        select:{
            title: true,
            id: true,
            created_at: true,
            photo:true
        }
    })
    return tweet
}