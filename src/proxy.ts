import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET!);

async function hasValidSession(request: NextRequest) {
    const token = request.cookies.get("session")?.value;
    if (!token) return false;
    try {
        await jwtVerify(token, encodedKey, { algorithms: ["HS256"] });
        return true;
    } catch {
        return false;
    }
}

export async function proxy(request: NextRequest) {
    const authenticated = await hasValidSession(request);
    const isLoginPage = request.nextUrl.pathname === "/login";

    if (isLoginPage && authenticated) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    if (!isLoginPage && !authenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};