import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const encodedKey = new TextEncoder().encode(process.env.SESSION_SECRET!);
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 dias

export async function createSession(userId: number) {
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
    const token = await new SignJWT({ userId })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expiresAt)
        .sign(encodedKey);

    (await cookies()).set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: expiresAt,
    });
}

export async function getSession(): Promise<{ userId: number } | null> {
    const token = (await cookies()).get("session")?.value;
    if (!token) return null;
    try {
        const { payload } = await jwtVerify(token, encodedKey, { algorithms: ["HS256"] });
        return { userId: payload.userId as number };
    } catch {
        return null; // token ausente, expirado ou adulterado
    }
}

export async function deleteSession() {
    (await cookies()).delete("session");
}