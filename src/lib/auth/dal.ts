import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSession } from "./session";

export const getCurrentUserId = cache(async (): Promise<number> => {
    const session = await getSession();
    if (!session) redirect("/login");
    return session.userId;
});