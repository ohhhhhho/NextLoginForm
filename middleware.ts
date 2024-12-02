import { NextRequest, NextResponse } from "next/server"
import getSession from "./lib/session"

interface Routes{
    [key:string]:boolean
}

const publicOnlyUrls:Routes = {
    '/':true,
    '/login':true,
    '/create-account':true,
}
export async function middleware(request:NextRequest){
    const session = await getSession()
    const exist = publicOnlyUrls[request.nextUrl.pathname]
    //로그아웃 상태일때
    if(!session.id){
        //해당 경로 제외 다른데 들어가면
        if(!exist){
            return NextResponse.redirect(new URL('/',request.url))
        }
    }else{
        if (exist) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
}

//특정 url에서만 실행되도록 설정
export const config = {
    //해당 파일 제외 실행
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]
}