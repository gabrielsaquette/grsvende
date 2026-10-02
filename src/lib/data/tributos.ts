import "server-only";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { tributos } from "@/db/schema";
import { getCurrentUserId } from "@/lib/auth/dal";

export async function getTributos() {
    await getCurrentUserId();
    return db.select().from(tributos).orderBy(asc(tributos.nome));
}